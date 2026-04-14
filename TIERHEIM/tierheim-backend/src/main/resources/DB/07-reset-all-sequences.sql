-- appointment_types
SELECT setval(pg_get_serial_sequence('appointment_types','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM appointment_types), 0), 1), true);

-- appointment_categories
SELECT setval(pg_get_serial_sequence('appointment_categories','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM appointment_categories), 0), 1), true);

-- appointments (oder appointments)
SELECT setval(pg_get_serial_sequence('appointments','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM appointments), 0), 1), true);

-- finder
SELECT setval(pg_get_serial_sequence('finder','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM finder), 0), 1), true);

-- locations
SELECT setval(pg_get_serial_sequence('locations','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM locations), 0), 1), true);

-- message_entity
SELECT setval(pg_get_serial_sequence('message_entity','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM message_entity), 0), 1), true);

-- pet_breeds
SELECT setval(pg_get_serial_sequence('pet_breeds','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM pet_breeds), 0), 1), true);

-- pet_colors
SELECT setval(pg_get_serial_sequence('pet_colors','id'),
              COALESCE((SELECT MAX(id) FROM pet_colors), 0) + 1,
              false);

-- pet_foods
SELECT setval(pg_get_serial_sequence('pet_foods','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM pet_foods), 0), 1), true);

-- pet_medications
SELECT setval(pg_get_serial_sequence('pet_medications','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM pet_medications), 0), 1), true);

-- pet_species
SELECT setval(pg_get_serial_sequence('pet_species','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM pet_species), 0), 1), true);

-- pets
SELECT setval(pg_get_serial_sequence('pets','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM pets), 0), 1), true);

-- sections
SELECT setval(pg_get_serial_sequence('sections','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM sections), 0), 1), true);

-- units
SELECT setval(pg_get_serial_sequence('units','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM units), 0), 1), true);

-- placement_status
SELECT setval(pg_get_serial_sequence('placement_status','id'),
              GREATEST(COALESCE((SELECT MAX(id) FROM placement_status), 0), 1), true);
