package solutions.sideklick.services;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import jakarta.inject.Singleton;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import solutions.sideklick.entities.PetSpeciesEntity;
import solutions.sideklick.generic.clients.com.openai.OpenaiApiClient;
import solutions.sideklick.generic.clients.com.openai.completions.dtos.out.OpenaiApiCompletionsOutDto;
import solutions.sideklick.generic.clients.com.openai.completions.dtos.in.OpenApiRequest;
import solutions.sideklick.generic.types.chat.MessageType;
import solutions.sideklick.generic.types.chat.ResponseFormat;
import solutions.sideklick.repository.BreedRepository;
import solutions.sideklick.repository.ColorRepository;
import solutions.sideklick.repository.FinderRepository;
import solutions.sideklick.repository.PetSpeciesRepository;

import io.micronaut.serde.ObjectMapper;
import jakarta.inject.Inject;
import solutions.sideklick.dtos.AiMatchResultDto;
import solutions.sideklick.repository.*;

import java.util.ArrayList;
import java.util.List;

import static solutions.sideklick.generic.constants.PetAiMatchingConstants.*;

@Singleton
@RequiredArgsConstructor
public class PetAiMatchingService {

    private final OpenaiApiClient openAiApiClient;

    private final PetSpeciesRepository speciesRepo;
    private final BreedRepository breedRepo;
    private final ColorRepository colorRepo;
    private final FinderRepository finderRepo;

    private final ObjectMapper objectMapper;

    private final Logger log = LoggerFactory.getLogger(PetAiMatchingService.class);

    public AiMatchResultDto matchOut(String category, String userInput) {
        List<String> candidates = loadCandidates(category);
        String json = match(category, userInput, candidates);
        json = sanitize(json);
        try {
            return objectMapper.readValue(json, AiMatchResultDto.class);
        } catch (Exception e) {
            throw new RuntimeException("AI returned invalid JSOn for " + category + ": " + json, e);
        }
    }

    private List<String> loadCandidates(String category) {
        return switch (category) {
            case "species" -> speciesRepo.findAll().stream().map(x -> x.getId() + "|" + x.getName()).toList();
            case "breed" -> breedRepo.findAll().stream().map(x -> x.getId() + "|" + x.getName()).toList();
            case "color" -> colorRepo.findAll().stream().map(x -> x.getId() + "|" + x.getName()).toList();
            case "finder" -> finderRepo.findAllOrderByName().stream()
                    .map(f -> f.getId() + "|" + ((f.getFirstName() == null ? "" : f.getFirstName().trim())
                            + " " + (f.getLastName() == null ? "" : f.getLastName().trim())).trim())
                    .toList();
            default -> throw new IllegalArgumentException("Unsupported category: " + category);
        };
    }

    public String match(String category, String userInput, List<String> candidates) {
        try {
            String prompt = buildUserPrompt(category, userInput, candidates);
            OpenApiRequest body = buildRequest(prompt);
            HttpResponse<OpenaiApiCompletionsOutDto> res = openAiApiClient.completions(body);

            if (res == null) {
                throw new RuntimeException("OpenAI response is null");
            }
            if (res.getStatus() != HttpStatus.OK || res.body() == null) {
                String status = String.valueOf(res.getStatus());
                String errBody = res.getBody(String.class).orElse(null);
                log.error("OpenAI unexpected status {}: {}", status, errBody);
                throw new RuntimeException("OpenAI status: " + status);
            }

            String content = getJson(res.body());
            if (content == null || content.isBlank()) {
                throw new RuntimeException("Empty content from OpenAI");
            }
            return content;
        } catch (HttpClientResponseException e) {
            String err = (e.getResponse() != null)
                    ? e.getResponse().getBody(String.class).orElse(e.getMessage())
                    : e.getMessage();
            log.error("OpenAI error {}: {}", e.getStatus(), err, e);
            throw new RuntimeException("AI matching failed: " + e.getStatus() + " " + err);
        } catch (Exception e) {
            log.error("AI matching failed: {}", e.getMessage(), e);
            throw new RuntimeException("AI matching failed: " + e.getMessage());
        }
    }

    private String buildUserPrompt(String category, String userInput, List<String> candidates) {

        StringBuilder sb = new StringBuilder();
        for (String c : candidates) {
            sb.append("- ").append(c).append("\n");
        }

        return String.format(USER_PROMPT_TEMPLATE, category, userInput, sb);
    }

    private OpenApiRequest buildRequest(final String userPrompt) {
        List<MessageType> messages = new ArrayList<>();

        MessageType systemMessage = new MessageType();
        systemMessage.setRole("system");
        systemMessage.setContent(SYSTEM_PROMPT);

        MessageType userMsg = new MessageType();
        userMsg.setRole("user");
        userMsg.setContent(userPrompt);

        messages.add(systemMessage);
        messages.add(userMsg);

        ResponseFormat responseFormat = ResponseFormat.builder().type("json_schema").jsonSchema(JSON_SCHEMA).build();

        return OpenApiRequest.builder()
                .model(MODEL)
                .temperature(TEMPERATURE)
                .messages(messages)
                .responseFormat(responseFormat)
                .build();

    }

    private String getJson(OpenaiApiCompletionsOutDto dto) {
        return dto.getChoices().getFirst().getMessage().getContent();
    }

    private String sanitize(String s) {
        if (s == null) return null;
        s = s.trim();
        if (s.startsWith("```")) {
            s = s.replaceAll("^```[a-zA-Z]*\\s*", "").replaceAll("\\s*```$", "").trim();
        }
        return s.replace("\"null\"", "null");
    }

    public static String normalizeName(String s) {
        if (s == null) return null;
        s = s.trim().replaceAll("\\s+", " ");
        if (s.isEmpty()) return s;
        return s.substring(0,1).toUpperCase() + s.substring(1);
    }
}
