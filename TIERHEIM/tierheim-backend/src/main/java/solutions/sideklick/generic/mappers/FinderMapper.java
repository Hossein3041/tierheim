package solutions.sideklick.generic.mappers;

import io.micronaut.core.util.StringUtils;
import solutions.sideklick.dtos.PetCreateBody;
import solutions.sideklick.entities.FinderEntity;

public class FinderMapper {

    public static final FinderEntity mapFromPetCreateBodyToFinder(PetCreateBody petCreateBody) {
        FinderEntity finder = new FinderEntity();
        finder.setPhone(petCreateBody.getFinderPhone());

        String fullName = petCreateBody.getFinderName();
        if (StringUtils.hasText(fullName)) {
            String[] parts = fullName.trim().split("\\s+", 2);
            finder.setFirstName(parts[0]);

            if (parts.length > 1) {
                finder.setLastName(parts[1]);
            }
        }

        // TODO Has to be filled detailedly after specification
        return finder;
    }
}
