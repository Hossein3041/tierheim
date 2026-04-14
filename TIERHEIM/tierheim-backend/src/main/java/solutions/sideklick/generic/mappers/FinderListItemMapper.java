package solutions.sideklick.generic.mappers;

import solutions.sideklick.dtos.FinderListItemDto;
import solutions.sideklick.entities.FinderEntity;

public class FinderListItemMapper {

    public static FinderListItemDto toDto(final FinderEntity finder) {
        return new FinderListItemDto(
                finder.getId(),
                joinNames(finder.getFirstName(), finder.getLastName()),
                finder.getPhone(),
                formatAddress(finder.getStreet(), finder.getHouseNumber(), finder.getZipCode(), finder.getCity())
        );
    }

    private static String joinNames(String first, String last) {
        if(first == null && last == null) return "";
        if(first == null) return last;
        if(last == null) return first;
        return first + " " + last;
    }

    private static String formatAddress(String street, Integer number, Integer zip, String city) {
        StringBuilder sb = new StringBuilder();
        if(street != null) sb.append(street);
        if(number != null) sb.append(" ").append(number);
        if ((zip != null || city != null) && !sb.isEmpty()) sb.append(", ");
        if(zip != null) sb.append(zip);
        if(city != null) sb.append(" ").append(city);
        return sb.toString().trim();
    }
}
