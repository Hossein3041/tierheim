package solutions.sideklick.generic.constants;

import solutions.sideklick.generic.types.chat.MarkdownExtractionSchema;

public class PetAiMatchingConstants {

    public static final Double TEMPERATURE = 0.2;

    public static String MODEL = "gpt-4o-mini";  // oder "gpt-4o", "o4-mini"


    public static final String SYSTEM_PROMPT =
            "Du bist ein strenger Normalisierer von Tierdaten. "
            + "Deine einzige Aufgabe: Eingaben robust einem existierenden Eintrag aus der Kandidatenliste zuzuordnen. "
            + "Es gibt feste Zielkategorien (z.B. Spezies: Hund, Katze, Pferd, Vogel, Kleintier, Terrarientier, Unbekannt). "
            + "Erfinde niemals neue Kategorien oder Namen. "
            + "Antworte ausschließlich als JSON, das dem Schema entspricht.";

    public static final String USER_PROMPT_TEMPLATE =
            "Kategorie: %s\n"
                    + "Eingabe: \"%s\"\n\n"
                    + "Kandidaten (Format: id|name):\n%s\n"
                    + "Anweisungen:\n"
                    + "- Wähle *ausschließlich* aus den Kandidaten (id|name). Erfinde nichts.\n"
                    + "- Vergleiche case-insensitive, trimme Whitespaces; ignoriere Mehrfach-Leerzeichen.\n"
                    + "- Berücksichtige Umlaute/Akzente (ä↔ae, ö↔oe, ü↔ue, ß↔ss) und leichte Tippfehler.\n"
                    + "- Kategorie-spezifisch:\n"
                    + "  • species: mappe allgemeine Begriffe semantisch auf die Oberkategorien Hund, Katze, Pferd, Vogel, Kleintier, Terrarientier (z. B. Nager/Kaninchen → Kleintier; Huhn/Ente/Gans → Vogel; Schildkröte/Schlange → Terrarientier).\n"
                    + "  • breed: gleiche Synonyme/Schreibvarianten ab (Franz. Bulldogge ≈ Französische Bulldogge). Bei Unsicherheit → null.\n"
                    + "  • color: gleiche typische Farbvarianten ab (Weiss≈Weiß, schwarzweiß≈schwarz-weiß). Bei Unsicherheit → null.\n"
                    + "  • finder: Name kann 'Vorname Nachname' oder 'Nachname, Vorname' sein; gleiche robust ab (Umlaute/Bindestriche/Mehrfach-Leerzeichen).\n"
                    + "- Liefere den **besten** eindeutigen Kandidaten. Ist es **nicht eindeutig**, gib {\"id\": null, \"name\": null} zurück.\n"
                    + "- Gib ausschließlich das JSON laut Schema aus.\n";



    public static final MarkdownExtractionSchema JSON_SCHEMA =
            MarkdownExtractionSchema.builder()
                    .name("normalize_pet_taxonomy")
                    .schema(
                            MarkdownExtractionSchema.Schema.builder()
                                    .type("object")
                                    .additionalProperties(false)
                                    .required(new String[] {"id","name"})
                                    .properties(
                                            MarkdownExtractionSchema.SchemaProperties.builder()
                                                    .id(MarkdownExtractionSchema.Property.builder()
                                                            .type(new String[] {"string","null"})
                                                            .description("ID des gematchten Eintrags; null, wenn keiner passt.")
                                                            .build())
                                                    .name(MarkdownExtractionSchema.Property.builder()
                                                            .type(new String[] {"string","null"})
                                                            .description("Exakter Name des gematchten Eintrags; null, wenn keiner passt.")
                                                            .build())
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();
}