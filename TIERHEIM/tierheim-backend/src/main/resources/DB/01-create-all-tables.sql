-- =============================================================================
-- Schema: Tierheim - alle Tabellen (ohne Testdaten)
-- Voraussetzung: Rolle "local_user" existiert
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Locations
-- ---------------------------------------------------------------------------
create table locations (
                           id bigint not null primary key,
                           name varchar(255),
                           short_name varchar(255)
);
alter table locations owner to local_user;

-- ---------------------------------------------------------------------------
-- Sections
-- ---------------------------------------------------------------------------
create table sections (
                          id bigint not null primary key,
                          name varchar(255),
                          short_name varchar(255),
                          max_pets integer,
                          location_id bigint constraint fkh1cgipy8gux1p48omjujfpwto references locations
);

alter table sections owner to local_user;

-- ---------------------------------------------------------------------------
-- Units
-- ---------------------------------------------------------------------------
create table units (
                       id bigint not null primary key,
                       name varchar(255),
                       is_default boolean,
                       section_id bigint constraint fkiikdd43se756itcrv6gf1468b references sections
);

alter table units owner to local_user;

-- ---------------------------------------------------------------------------
-- Finder
-- ---------------------------------------------------------------------------
create table finder (
                        id bigserial primary key,
                        city varchar(255),
                        first_name varchar(255),
                        house_number integer,
                        last_name varchar(255),
                        mail varchar(255),
                        phone varchar(255),
                        street varchar(255),
                        zip_code integer
);

alter table finder owner to local_user;

-- ---------------------------------------------------------------------------
-- Pet lookup tables: Breeds, Colors, Species, Foods, Medications
-- ---------------------------------------------------------------------------
create table pet_breeds (
                            id bigint not null primary key,
                            name varchar(255)
);

alter table pet_breeds owner to local_user;

create table pet_colors (
                            id bigint not null primary key,
                            name varchar(255)
);

alter table pet_colors owner to local_user;

create table pet_species (
                             id bigint not null primary key,
                             name varchar(255),
                             order_number bigint
);

alter table pet_species owner to local_user;

create table pet_foods (
                           id bigserial primary key,
                           name varchar(255)
);

alter table pet_foods owner to local_user;

create table pet_medications (
                                 id bigserial primary key,
                                 name varchar(255)
);

alter table pet_medications owner to local_user;

-- ---------------------------------------------------------------------------
-- Placement Status
-- ---------------------------------------------------------------------------
create table placement_status (
                                  id bigint primary key,
                                  name varchar(255) not null unique,
                                  display_name varchar(255),
                                  order_number integer,
                                  active boolean not null default false,
                                  order_name integer
);

alter table placement_status owner to local_user;

-- ---------------------------------------------------------------------------
-- Appointment Types & Categories
-- (IDs als bigint, weil ihr feste IDs (1..n) verwendet)
-- ---------------------------------------------------------------------------
create table appointment_types (
                                   id bigint not null primary key,
                                   name varchar(255),
                                   order_number int not null default 999
);

alter table appointment_types owner to local_user;

create table appointment_categories (
                                        id bigint not null primary key,
                                        name varchar(255),
                                        order_number int not null default 999
);

alter table appointment_categories owner to local_user;

-- ---------------------------------------------------------------------------
-- Pets
-- ---------------------------------------------------------------------------
create table pets (
                      id bigserial primary key,
                      birthdate date,
                      chip_number varchar(255),
                      date_found date,
                      found_location varchar(255),
                      image varchar(255),
                      is_active boolean,
                      is_castrated boolean,
                      is_extra_invoice boolean,
                      is_registered boolean,
                      name varchar(255),
                      placement_status_id bigint constraint fk_pets_placement_status references placement_status(id),
                      sex varchar(255) constraint pets_sex_check
                          check (
                              (sex)::text = ANY (
                          (ARRAY [
                          'MALE'::character varying,
                          'FEMALE'::character varying,
                          'UNKNOWN'::character varying
                          ])::text[]
                          )
),
    special_notes varchar(255),
    intake_reason varchar(32)
        constraint pets_intake_reason_check
            check (
              intake_reason IS NULL
              OR (intake_reason)::text = ANY (
                    (ARRAY [
                        'FOUND'::character varying,
                        'BOARDING'::character varying,
                        'SURRENDER'::character varying,
                        'VET_OFFICE'::character varying,
                        'CONFISCATION'::character varying,
                        'ANIMALDEAD'::character varying
                    ])::text[]
              )
            ),
    breed_id bigint constraint fk8nlm2yfd7yy6grbxbdxo755wk references pet_breeds,
    color_id bigint constraint fkg63ki9gvbw26f4t6qd9t676g1 references pet_colors,
    finder_id bigint constraint fkbp0hfyfm3c7s36yuq1bxet7ke references finder,
    species_id bigint constraint fkmelchk4fyrbtiwgbdfjcyn885 references pet_species,
    unit_id bigint constraint fkko9ynad2i5yy97gu51d06wpg references units
);

alter table pets owner to local_user;

-- sinnvolle Indizies für Pets
create index if not exists idx_pets_intake_reason on pets (intake_reason);
create index if not exists idx_pets_placement_status_id on pets (placement_status_id);

-- ---------------------------------------------------------------------------
-- Appointments
-- (checked + checked_at Änderungen integriert)
-- ---------------------------------------------------------------------------
create table appointments (
                              id bigint primary key,
                              date date,
                              notes varchar(255),
                              time time(6),
                              pet_id bigint constraint fkjikml77ob0pmdw9xpab075ihm references pets,
                              type_id bigint constraint fkcfix9umwgl2tk0p3uwoms39sqd references appointment_types,
                              category_id bigint references appointment_categories,
                              checked boolean not null default false,
                              checked_at timestamp with time zone,
                              checked_by varchar(255)
);

alter table appointments owner to local_user;

-- ---------------------------------------------------------------------------
-- Pet-Food Links
-- ---------------------------------------------------------------------------
create table pet_food_links (
                                pet_id bigint not null constraint fko4wyesvhbms5vwujua178ljr6 references pets,
                                food_id bigint not null constraint fkhvf7idqpk4q7bwlql3ras1md9 references pet_foods
);

alter table pet_food_links owner to local_user;

-- ---------------------------------------------------------------------------
-- Pet-Medication Links
-- ---------------------------------------------------------------------------
create table pet_medication_links (
                                      pet_id bigint not null constraint fkd29vq28lsvm8hr8xbm5uj1uu9 references pets,
                                      medication_id bigint not null constraint fkkc7y5jsyavtowy22mtxxxtfbq references pet_medications
);

alter table pet_medication_links owner to local_user;

-- ---------------------------------------------------------------------------
-- Message Entity
-- ---------------------------------------------------------------------------
create table message_entity (
                                id bigint not null primary key,
                                message varchar(255)
);

alter table message_entity owner to local_user;
