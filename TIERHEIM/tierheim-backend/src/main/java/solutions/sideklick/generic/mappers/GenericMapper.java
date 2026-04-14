package solutions.sideklick.generic.mappers;

import io.micronaut.context.annotation.Mapper;
import java.util.ArrayList;
import java.util.List;

/**
 * The {@code GenericMapper} interface defines a generic mapping mechanism
 * between a source object
 * (SOURCE) and a target object (TARGET). This interface is useful in
 * applications where consistent
 * conversion patterns between different Objects are required. It leverages
 * Micronaut's
 * {@code @Mapper} annotation to indicate that the methods are suitable for
 * mapping tasks.
 *
 * @param <SOURCE> the type of the source object
 * @param <TARGET> the type of the target object
 * @author Ole Nordhusen
 * @version 2.1.0
 * @since 0.1.0
 */
public interface GenericMapper<SOURCE, TARGET> {

  /**
   * Converts a TARGET to a model object.
   *
   * @param TARGET the TARGET instance to be converted to a source object
   * @return the SOURCE object derived from the TARGET
   * @since 0.1.0
   */
  @Mapper
  SOURCE mapToSource(TARGET TARGET);

  /**
   * Converts a SOURCE object to a TARGET.
   *
   * @param SOURCE the SOURCE object to be converted to a TARGET
   * @return the TARGET that represents the SOURCE object
   * @since 0.1.0
   */
  @Mapper
  TARGET mapToTarget(SOURCE SOURCE);

  default List<SOURCE> mapToSources(final List<TARGET> TARGETS) {
    List<SOURCE> SOURCES = new ArrayList<>();
    for (TARGET TARGET : TARGETS) {
      SOURCES.add(mapToSource(TARGET));
    }
    return SOURCES;
  }

  default List<TARGET> mapToTargets(final List<SOURCE> SOURCES) {
    List<TARGET> TARGETS = new ArrayList<>();
    for (SOURCE SOURCE : SOURCES) {
      TARGETS.add(mapToTarget(SOURCE));
    }
    return TARGETS;
  }
}
