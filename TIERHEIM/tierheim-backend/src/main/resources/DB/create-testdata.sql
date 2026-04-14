-- ======================================================
-- LOCATIONS (feste IDs)
-- ======================================================
INSERT INTO locations (id, name, short_name) VALUES
                                                 (1, 'Katzenhaus',           'KH'),
                                                 (2, 'Krankenstation Katze', 'KSK'),
                                                 (3, 'Hundehaus',            'HH'),
                                                 (4, 'Krankenstation Hund',  'KSH'),
                                                 (5, 'Außenbereich',         'AB'),
                                                 (6, 'Wartebereich',         'WB'),
                                                 (7, 'Tote Tiere', 'TT')
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name;

-- ======================================================
-- SECTIONS (feste IDs)  |  short_name = NUR Abschnitts-Kürzel
-- ======================================================
-- KH – Katzenhaus
INSERT INTO sections (id, name, short_name, max_pets, location_id) VALUES
                                                                       (1,  'Raum 1 - Nager',                 'N1',  5, (1)),
                                                                       (2,  'Raum 2',                         'R2',  5, (1)),
                                                                       (3,  'Raum 3',                         'R3',  5, (1)),
                                                                       (4,  'Raum 4',                         'R4',  5, (1)),
                                                                       (5,  'Raum 5',                         'R5',  5, (1)),
                                                                       (6,  'Raum 6 Gruppenraum FIV/FELV',    'R6',  5, (1)),
                                                                       (7,  'Vogelraum Quarantäne Neuzugang', 'VQN', 36,   (1)),
                                                                       (8,  'Nagerküche',                      'NK',  8,    (1)),
                                                                       (9,  'Quarantäne Abgabe',               'QA',  11,   (1)),
                                                                       (10, 'Quarantäne Fund',                 'QF',  11,   (1)),
                                                                       (11, 'Kinderzimmer',                    'KIZ', 10,   (1))
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name,
                               max_pets=EXCLUDED.max_pets, location_id=EXCLUDED.location_id;

-- KSK – Krankenstation Katze
INSERT INTO sections (id, name, short_name, max_pets, location_id) VALUES
                                                                       (12, 'Raum 1',     'R1', 6, (2)),
                                                                       (13, 'Raum 2',     'R2', 6, (2)),
                                                                       (14, 'Reptilien',  'REP',4, (2))
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name,
                               max_pets=EXCLUDED.max_pets, location_id=EXCLUDED.location_id;

-- HH – Hundehaus
INSERT INTO sections (id, name, short_name, max_pets, location_id) VALUES
                                                                       (15, 'Zwinger Links',  'ZL', 13, (3)),
                                                                       (16, 'Zwinger Rechts', 'ZR', 13, (3))
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name,
                               max_pets=EXCLUDED.max_pets, location_id=EXCLUDED.location_id;

-- KSH – Krankenstation Hund
INSERT INTO sections (id, name, short_name, max_pets, location_id) VALUES
                                                                       (17, 'Raum 1', 'R1', 5, (4)),
                                                                       (18, 'Raum 2', 'R2', 5, (4))
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name,
                               max_pets=EXCLUDED.max_pets, location_id=EXCLUDED.location_id;

-- AB – Außenbereich
INSERT INTO sections (id, name, short_name, max_pets, location_id) VALUES
                                                                       (19, 'Weidezwinger',                  'WZ',   20, (5)),
                                                                       (20, 'Maxizwinger',                   'MZ',   12, (5)),
                                                                       (21, 'Bundeswehrzwinger',             'BWZ',  6,  (5)),
                                                                       (22, 'Containergruppenraum 1',        'CG1',  4,  (5)),
                                                                       (23, 'Containergruppenraum 2',        'CG2',  4,  (5)),
                                                                       (24, 'Container Tollwut Hund',        'CTH',  9,  (5)),
                                                                       (25, 'Große Voliere Ziervögel/Nager', 'GV',   40, (5)),
                                                                       (26, 'Zwinger Vögel Links',           'ZVL',  5,  (5)),
                                                                       (27, 'Zwinger Vögel Rechts',          'ZVR',  5,  (5)),
                                                                       (28, 'Hühnerhaus 1',                  'HH1',  4,  (5)),
                                                                       (29, 'Hühnerhaus 2',                  'HH2',  4,  (5)),
                                                                       (30, 'Ferranti-Haus',                 'FH',   3,  (5)),
                                                                       (31, 'Bundeswehrzwinger/Stall 1',     'BWS1', 5,  (5)),
                                                                       (32, 'Bundeswehrzwinger/Stall 2',     'BWS2', 5,  (5)),
                                                                       (33, 'Stall Huf und Klauentiere',     'SHK',  25, (5)),
                                                                       (34, 'Gehege Schildkröte/Ente',       'GSE',  10, (5)),
                                                                       (35, 'Nagarium 1',                    'N1',   10, (5)),
                                                                       (36, 'Nagarium 2',                    'N2',   10, (5))
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name,
                               max_pets=EXCLUDED.max_pets, location_id=EXCLUDED.location_id;

-- WB – Wartebereich
INSERT INTO sections (id, name, short_name, max_pets, location_id) VALUES
                                                                       (37, 'Wartezimmer',                       'WZ',   9999, (6)),
                                                                       (38, 'Polizeibox Hund',                   'PBH',  2,    (6)),
                                                                       (39, 'Polizeibox Katze & Kleintiere',     'PBKK', 3,    (6)),
                                                                       (40, 'Raum TT',                            'TT',   5,    (6)),
                                                                       (41, 'Kühlelement TT',                     'KTT',  5,    (6)),
                                                                       (42, 'Tierarzt Behandlungsraum intensiv',  'TI',   2,    (6))
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name,
                               max_pets=EXCLUDED.max_pets, location_id=EXCLUDED.location_id;

INSERT INTO sections (id, name, short_name, max_pets, location_id) VALUES
                                                                       (43, 'Tote Tiere', 'TT', 9999, (7))
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, short_name=EXCLUDED.short_name,
                               max_pets=EXCLUDED.max_pets, location_id=EXCLUDED.location_id;

-- ======================================================
-- UNITS (feste IDs)
-- ======================================================

-- KH: Raum 1 – Nager (Einheiten inkl. Box 1–4)
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (1,  'Nagerparadies',              FALSE, 1),
                                                         (2,  'Box 1',                      FALSE, 1),
                                                         (3,  'Box 2',                      FALSE, 1),
                                                         (4,  'Box 3',                      FALSE, 1),
                                                         (5,  'Box 4',                      FALSE, 1),
                                                         (6,  'Zimmervoliere Eichhörnchen', FALSE, 1),
                                                         (7,  'Glaskasten Mäuse',           FALSE, 1),
                                                         (8,  'Terrarium Ratten/Mäuse',     FALSE, 1),
                                                         (9,  'Zimmervoliere Hamster',      FALSE, 1)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- KH: Räume 2–6 + Kinderzimmer → Default
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (10, 'Standard', TRUE, 2),
                                                         (11, 'Standard', TRUE, 3),
                                                         (12, 'Standard', TRUE, 4),
                                                         (13, 'Standard', TRUE, 5),
                                                         (14, 'Standard', TRUE, 6),
                                                         (52, 'Standard', TRUE, 11)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- KH: Vogelraum Quarantäne Neuzugang – Zimmervoliere 1–7
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (15, 'Zimmervoliere 1', FALSE, 7),
                                                         (16, 'Zimmervoliere 2', FALSE, 7),
                                                         (17, 'Zimmervoliere 3', FALSE, 7),
                                                         (18, 'Zimmervoliere 4', FALSE, 7),
                                                         (19, 'Zimmervoliere 5', FALSE, 7),
                                                         (20, 'Zimmervoliere 6', FALSE, 7),
                                                         (21, 'Zimmervoliere 7', FALSE, 7)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- KH: Nagerküche – 4 Normal + 4 Erweiterung
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (22, 'Normal 1',      FALSE, 8),
                                                         (23, 'Normal 2',      FALSE, 8),
                                                         (24, 'Normal 3',      FALSE, 8),
                                                         (25, 'Normal 4',      FALSE, 8),
                                                         (26, 'Erweiterung 1', FALSE, 8),
                                                         (27, 'Erweiterung 2', FALSE, 8),
                                                         (28, 'Erweiterung 3', FALSE, 8),
                                                         (29, 'Erweiterung 4', FALSE, 8)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- KH: Quarantäne Abgabe – 11 Boxen
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (30, 'Box 1',  FALSE, 9),
                                                         (31, 'Box 2',  FALSE, 9),
                                                         (32, 'Box 3',  FALSE, 9),
                                                         (33, 'Box 4',  FALSE, 9),
                                                         (34, 'Box 5',  FALSE, 9),
                                                         (35, 'Box 6',  FALSE, 9),
                                                         (36, 'Box 7',  FALSE, 9),
                                                         (37, 'Box 8',  FALSE, 9),
                                                         (38, 'Box 9',  FALSE, 9),
                                                         (39, 'Box 10', FALSE, 9),
                                                         (40, 'Box 11', FALSE, 9)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- KH: Quarantäne Fund – 11 Boxen
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (41, 'Box 1',  FALSE, 10),
                                                         (42, 'Box 2',  FALSE, 10),
                                                         (43, 'Box 3',  FALSE, 10),
                                                         (44, 'Box 4',  FALSE, 10),
                                                         (45, 'Box 5',  FALSE, 10),
                                                         (46, 'Box 6',  FALSE, 10),
                                                         (47, 'Box 7',  FALSE, 10),
                                                         (48, 'Box 8',  FALSE, 10),
                                                         (49, 'Box 9',  FALSE, 10),
                                                         (50, 'Box 10', FALSE, 10),
                                                         (51, 'Box 11', FALSE, 10)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- KSK: Räume – je 6 einzelne Zwinger
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (53, 'Zwinger 1', FALSE, 12),
                                                         (54, 'Zwinger 2', FALSE, 12),
                                                         (55, 'Zwinger 3', FALSE, 12),
                                                         (56, 'Zwinger 4', FALSE, 12),
                                                         (57, 'Zwinger 5', FALSE, 12),
                                                         (58, 'Zwinger 6', FALSE, 12),
                                                         (59, 'Zwinger 1', FALSE, 13),
                                                         (60, 'Zwinger 2', FALSE, 13),
                                                         (61, 'Zwinger 3', FALSE, 13),
                                                         (62, 'Zwinger 4', FALSE, 13),
                                                         (63, 'Zwinger 5', FALSE, 13),
                                                         (64, 'Zwinger 6', FALSE, 13),
                                                         (65, 'Standard',  TRUE,  14)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- HH: Zwinger Links / Rechts
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (66, 'L1 normal',      FALSE, 15),
                                                         (67, 'L2 normal',      FALSE, 15),
                                                         (68, 'L3 normal',      FALSE, 15),
                                                         (69, 'L4 normal',      FALSE, 15),
                                                         (70, 'L5 normal',      FALSE, 15),
                                                         (71, 'L6 normal',      FALSE, 15),
                                                         (72, 'L7 normal',      FALSE, 15),
                                                         (73, 'L8 Quarantäne',  FALSE, 15),
                                                         (74, 'L9',             FALSE, 15),
                                                         (75, 'L10',            FALSE, 15),
                                                         (76, 'L11',            FALSE, 15),
                                                         (77, 'L12',            FALSE, 15),
                                                         (78, 'L13',            FALSE, 15),
                                                         (79, 'R1 normal',      FALSE, 16),
                                                         (80, 'R2 normal',      FALSE, 16),
                                                         (81, 'R3 normal',      FALSE, 16),
                                                         (82, 'R4 normal',      FALSE, 16),
                                                         (83, 'R5 normal',      FALSE, 16),
                                                         (84, 'R6 normal',      FALSE, 16),
                                                         (85, 'R7 normal',      FALSE, 16),
                                                         (86, 'R8 Quarantäne',  FALSE, 16),
                                                         (87, 'R9',             FALSE, 16),
                                                         (88, 'R10',            FALSE, 16),
                                                         (89, 'R11',            FALSE, 16),
                                                         (90, 'R12',            FALSE, 16),
                                                         (91, 'R13',            FALSE, 16)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- KSH: Räume – je 5 einzelne Zwinger
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (92,  'Zwinger 1', FALSE, 17),
                                                         (93,  'Zwinger 2', FALSE, 17),
                                                         (94,  'Zwinger 3', FALSE, 17),
                                                         (95,  'Zwinger 4', FALSE, 17),
                                                         (96,  'Zwinger 5', FALSE, 17),
                                                         (97,  'Zwinger 1', FALSE, 18),
                                                         (98,  'Zwinger 2', FALSE, 18),
                                                         (99,  'Zwinger 3', FALSE, 18),
                                                         (100, 'Zwinger 4', FALSE, 18),
                                                         (101, 'Zwinger 5', FALSE, 18)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- AB: Defaults
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (102, 'Standard', TRUE, 22),
                                                         (103, 'Standard', TRUE, 23),
                                                         (104, 'Standard', TRUE, 26),
                                                         (105, 'Standard', TRUE, 27),
                                                         (106, 'Standard', TRUE, 28),
                                                         (107, 'Standard', TRUE, 29),
                                                         (108, 'Standard', TRUE, 30),
                                                         (109, 'Standard', TRUE, 31),
                                                         (110, 'Standard', TRUE, 32),
                                                         (111, 'Standard', TRUE, 34),
                                                         (112, 'Standard', TRUE, 35),
                                                         (113, 'Standard', TRUE, 36)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- AB: Weidezwinger / Maxi / Bundeswehrzwinger
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (114, 'Zwinger 1',  FALSE, 19),
                                                         (115, 'Zwinger 2',  FALSE, 19),
                                                         (116, 'Zwinger 3',  FALSE, 19),
                                                         (117, 'Zwinger 4',  FALSE, 19),
                                                         (118, 'Zwinger 5',  FALSE, 19),
                                                         (119, 'Zwinger 6',  FALSE, 19),
                                                         (120, 'Zwinger 7',  FALSE, 19),
                                                         (121, 'Zwinger 8',  FALSE, 19),
                                                         (122, 'Zwinger 9',  FALSE, 19),
                                                         (123, 'Zwinger 10', FALSE, 19),
                                                         (124, 'Zwinger 1',  FALSE, 20),
                                                         (125, 'Zwinger 2',  FALSE, 20),
                                                         (126, 'Zwinger 3',  FALSE, 20),
                                                         (127, 'Zwinger 4',  FALSE, 20),
                                                         (128, 'Zwinger 5',  FALSE, 20),
                                                         (129, 'Zwinger 6',  FALSE, 20),
                                                         (130, 'Zwinger 1',  FALSE, 21),
                                                         (131, 'Zwinger 2',  FALSE, 21),
                                                         (132, 'Zwinger 3',  FALSE, 21)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- AB: Container Tollwut Hund – 3 Laufboxen
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (133, 'Laufbox 1', FALSE, 24),
                                                         (134, 'Laufbox 2', FALSE, 24),
                                                         (135, 'Laufbox 3', FALSE, 24)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- AB: Große Voliere – 4 Abschnitte
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (136, 'Abschnitt 1', FALSE, 25),
                                                         (137, 'Abschnitt 2', FALSE, 25),
                                                         (138, 'Abschnitt 3', FALSE, 25),
                                                         (139, 'Abschnitt 4', FALSE, 25)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- AB: Stall Huf & Klauentiere – 5 Abschnitte
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (140, 'Abschnitt 1', FALSE, 33),
                                                         (141, 'Abschnitt 2', FALSE, 33),
                                                         (142, 'Abschnitt 3', FALSE, 33),
                                                         (143, 'Abschnitt 4', FALSE, 33),
                                                         (144, 'Abschnitt 5', FALSE, 33)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- WB: Defaults
INSERT INTO units (id, name, is_default, section_id) VALUES
                                                         (145, 'Wartezimmer', TRUE, 37),
                                                         (146, 'Standard', TRUE, 38),
                                                         (147, 'Standard', TRUE, 39),
                                                         (148, 'Standard', TRUE, 40),
                                                         (149, 'Standard', TRUE, 41),
                                                         (150, 'Standard', TRUE, 42)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, is_default=EXCLUDED.is_default, section_id=EXCLUDED.section_id;

-- Tote Tiere:
INSERT INTO units (id, name, is_default, section_id)
VALUES (200, 'Tote Tiere', TRUE, 43)
ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name,
        is_default = EXCLUDED.is_default,
        section_id = EXCLUDED.section_id;




INSERT INTO pet_species (id, name, order_number)
VALUES
    (1, 'Hund', 1),
    (3, 'Katze', 2),
    (5, 'Kleintier', 3),
    (4, 'Vogel', 4),
    (6, 'Terrarientier', 5),
    (2, 'Pferd', 6);

INSERT INTO pet_breeds (id, name)
VALUES (1, 'Weißer Schäferhund'),
       (2, 'Bulldogge'),
       (3, 'Französische Bulldogge'),
       (4, 'Europäisch Kurzhaar'),
       (5, 'Mischling (Hund)'),
       (6, 'Schäferhund × Labrador (Mischling)'),
       (7, 'Deutscher Schäferhund'),
       (8, 'Rottweiler'),
       (9, 'Staffordshire Bullterrier'),
       (10, 'Shih Tzu'),
       (11, 'Cavalier King Charles Spaniel'),
       (12, 'Cavalier King Charles × Toypudel (Mischling)'),
       (13, 'Herdenschutzhund'),
       (14, 'Wachtel'),
       (15, 'Huhn'),
       (16, 'Schildsittich'),
       (17, 'Gelbwangensittich'),
       (18, 'Deutscher Riese (Kaninchen)'),
       (19, 'Blauer Wiener (Kaninchen)'),
       (20, 'Labrador Retriever'),
       (21, 'Chihuahua'),
       (22, 'Podenco (Mischling)'),
       (23, 'Britisch Kurzhaar'),
       (24, 'Scottish Fold'),
       (25, 'Pitbull'),
       (26, 'Kangal'),
       (27, 'Boxer'),
       (28, 'Old English Bulldogge'),
       (29, 'Jack Russell Terrier'),
       (30, 'Cane Corso'),
       (31, 'Malinois'),
       (32, 'Ragdoll'),
       (33, 'Nymphensittich'),
       (34, 'Halsbandsittich'),
       (35, 'Seidenhuhn'),
       (36, 'Widder (Kaninchen)'),
       (37, 'Löwenkopf (Kaninchen)'),
       (38, 'Zwergkaninchen'),
       (39, 'Appenzeller × Labrador (Mischling)'),
       (40, 'Aussiedoodle (Mischling)'),
       (41, 'Beagle'),
       (42, 'Bolognese'),
       (43, 'Glatthaar-Meerschweinchen'),
       (44, 'Golden Retriever'),
       (45, 'Hauskaninchen'),
       (46, 'Hauskatze'),
       (47, 'Jagdterrier'),
       (48, 'Malinois × Schweizer Sennenhund (Mischling)'),
       (49, 'Malteser (Mischling)'),
       (50, 'Meerschweinchen'),
       (51, 'Mini Lop'),
       (52, 'Mops'),
       (53, 'Perser (Mischling)'),
       (54, 'Pitbull Terrier'),
       (55, 'Ratonero Bodeguero Andaluz'),
       (56, 'Schäferhund (Mischling)'),
       (57, 'Yorkshire-Pudel (Mischling)'),
       (58, 'Ziegensittich'),
       (59, 'Kanarienvogel'),
       (60, 'Maine Coon'),
       (61, 'Wellensittich'),
       (62, 'Bullterrier'),
       (63, 'Pinscher'),
       (64, 'Amstaff'),
       (65, 'Kaninchen'),
       (66, 'Kangal Mix'),
       (67, 'Ratonero Bodeguero Andaluz');

INSERT INTO pet_colors(id, name)
VALUES (1, 'Weiß'),
       (2, 'Braun'),
       (3, 'Schwarz'),
       (4, 'Schwarz-weiß'),
       (5, 'Braun-weiß'),
       (6, 'Tricolor'),
       (7, 'Getigert'),
       (8, 'Brauntiger (mit Weiß)'),
       (9, 'Rottiger'),
       (10, 'Schwarz-braun'),
       (11, 'Schwarz-braun-grau'),
       (12, 'Rot'),
       (13, 'Rotbraun'),
       (14, 'Hellbraun'),
       (15, 'Beige-weiß'),
       (16, 'Gelb-braun'),
       (17, 'Blau-grau'),
       (18, 'Grün-gelb'),
       (19, 'Schildpatt'),
       (20, 'Blond'),
       (21, 'Beige'),
       (22, 'Grau'),
       (23, 'Creme'),
       (24, 'Gestromt'),
       (25, 'Silbertiger'),
       (26, 'Weiß-grau'),
       (27, 'Schoko-braun'),
       (28, 'Orange'),
       (29, 'Rot-weiß'),
       (30, 'Schwarz-weiß-grau'),
       (31, 'Schwarz gestromt'),
       (32, 'Braun-meliert'),
       (33, 'Braun-orange'),
       (34, 'Beige-grau'),
       (35, 'Beige-braun'),
       (36, 'Blau'),
       (37, 'Blau-weiß'),
       (38, 'Grün'),
       (39, 'Getigert mit Weiß'),
       (40, 'Brauntiger'),
       (41, 'Gestromt Merle'),
       (42, 'weiß-orange-schwarz'),
       (43, 'braun mit hellen Stellen'),
       (44, 'weiß mit schwarzem Abzeichen'),
       (45, 'grautiger mit weiß'),
       (46, 'Grautiger'),
       (47, 'Gelb'),
       (48, 'Blau');

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Apollo',
        '276098106057998',
        '2024-11-11',
        FALSE,
        'MALE',
        1,
        1,
        1);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Bella',
        NULL,
        '2024-11-11',
        FALSE,
        'FEMALE',
        1,
        2,
        5);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Bubi',
        NULL,
        '2024-11-11',
        FALSE,
        'MALE',
        2,
        NULL,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Rambo',
        '276098140047504',
        '2024-11-11',
        FALSE,
        'MALE',
        3,
        4,
        4);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Franz',
        '276098140047463',
        '2024-11-11',
        FALSE,
        'MALE',
        3,
        4,
        8);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Garfield',
        '276098140047458',
        '2024-11-11',
        FALSE,
        'MALE',
        3,
        4,
        9);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Locco',
        '642093400269415',
        '2024-11-11',
        TRUE,
        'MALE',
        1,
        13,
        6);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Toni',
        NULL,
        '2024-11-11',
        FALSE,
        'MALE',
        3,
        4,
        4);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Leo',
        '276098001088346',
        '2024-11-11',
        FALSE,
        'MALE',
        1,
        6,
        3);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Milo',
        '276099200433833',
        '2024-11-11',
        TRUE,
        'MALE',
        1,
        3,
        10);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Mona',
        NULL,
        '2024-11-11',
        FALSE,
        'FEMALE',
        3,
        4,
        7);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Skiddels',
        '276098140047275',
        '2024-11-11',
        TRUE,
        'MALE',
        3,
        4,
        4);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 1',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 2',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 3',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 4',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 5',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 6',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Sina',
        '276099200279757',
        '2024-11-11',
        TRUE,
        'FEMALE',
        1,
        3,
        4);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 7',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr.8',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 9',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 10',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Wachtel Nr. 11',
        NULL,
        '2024-11-11',
        TRUE,
        'UNKNOWN',
        4,
        14,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Paula-Heidi',
        '276098108900550',
        '2024-11-11',
        TRUE,
        'FEMALE',
        1,
        9,
        6);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Amarillo',
        NULL,
        '2024-11-11',
        TRUE,
        'MALE',
        4,
        16,
        18);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Rojo',
        NULL,
        '2024-11-11',
        TRUE,
        'MALE',
        4,
        17,
        12);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Blümchen',
        '900233003679131',
        '2024-11-18',
        TRUE,
        'UNKNOWN',
        1,
        5,
        16);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Amelie',
        '642090001838341',
        '2025-01-21',
        TRUE,
        'FEMALE',
        1,
        5,
        14);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Herzilein',
        '642090001838374',
        '2025-01-21',
        FALSE,
        'FEMALE',
        1,
        5,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Emil',
        '642090001572312',
        '2025-01-21',
        TRUE,
        'MALE',
        1,
        5,
        14);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Leni',
        '64209000705709',
        '2025-01-21',
        TRUE,
        'FEMALE',
        1,
        5,
        12);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Joschi',
        '276096800199915',
        '2025-01-31',
        FALSE,
        'MALE',
        1,
        8,
        10);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Margot',
        NULL,
        '2025-02-04',
        FALSE,
        'FEMALE',
        4,
        15,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Magda',
        NULL,
        '2025-02-04',
        FALSE,
        'FEMALE',
        4,
        15,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Magarete',
        NULL,
        '2025-02-04',
        FALSE,
        'FEMALE',
        4,
        15,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Alegro',
        '642090001572116',
        '2025-02-17',
        TRUE,
        'MALE',
        1,
        5,
        15);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Betty',
        '642098201623079',
        '2025-02-17',
        TRUE,
        'FEMALE',
        1,
        5,
        6);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Gwendolyn',
        '642099010061682',
        '2025-02-17',
        TRUE,
        'FEMALE',
        1,
        5,
        11);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Timmy',
        '642090001702791',
        '2025-02-17',
        TRUE,
        'MALE',
        1,
        5,
        13);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Bandit',
        '941000014554648',
        '2025-02-17',
        TRUE,
        'MALE',
        1,
        5,
        14);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Alana',
        NULL,
        '2025-03-14',
        FALSE,
        'FEMALE',
        1,
        11,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Ursular',
        NULL,
        '2025-03-14',
        FALSE,
        'FEMALE',
        1,
        12,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Melody',
        NULL,
        '2025-03-14',
        FALSE,
        'FEMALE',
        1,
        12,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Sebastian',
        NULL,
        '2025-03-14',
        FALSE,
        'MALE',
        1,
        12,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Dala',
        NULL,
        '2025-03-17',
        TRUE,
        'FEMALE',
        1,
        11,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Dori',
        NULL,
        '2025-03-17',
        TRUE,
        'FEMALE',
        1,
        12,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Kahn',
        NULL,
        '2025-03-17',
        TRUE,
        'MALE',
        1,
        12,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Bruce',
        NULL,
        '2025-03-17',
        TRUE,
        'MALE',
        1,
        12,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Nemo',
        NULL,
        '2025-03-17',
        TRUE,
        'MALE',
        1,
        12,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Si',
        NULL,
        '2025-04-04',
        TRUE,
        'FEMALE',
        1,
        4,
        19);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (FALSE,
        'Am',
        NULL,
        '2025-04-04',
        TRUE,
        'FEMALE',
        1,
        4,
        19);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Sissi',
        NULL,
        '2025-07-28',
        TRUE,
        'FEMALE',
        1,
        7,
        1);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Jenna',
        NULL,
        '2025-07-28',
        TRUE,
        'FEMALE',
        1,
        7,
        1);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Idefix',
        '276099200789741',
        '2025-09-01',
        FALSE,
        'MALE',
        5,
        18,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Jasko',
        '276099200789742',
        '2025-09-01',
        FALSE,
        'MALE',
        5,
        19,
        17);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Gürkchen',
        '276099200789745',
        '2025-09-01',
        FALSE,
        'MALE',
        5,
        18,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Aik',
        '276099200789743',
        '2025-09-01',
        FALSE,
        'MALE',
        5,
        19,
        17);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Beethoven',
        '276099200789744',
        '2025-09-01',
        FALSE,
        'MALE',
        5,
        18,
        2);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Cody',
        '276099200789746',
        '2025-09-01',
        FALSE,
        'MALE',
        5,
        19,
        17);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Duplo',
        NULL,
        '2025-09-01',
        FALSE,
        'UNKNOWN',
        5,
        18,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Einstein',
        NULL,
        '2025-09-01',
        FALSE,
        'UNKNOWN',
        5,
        18,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Flavius',
        NULL,
        '2025-09-01',
        FALSE,
        'UNKNOWN',
        5,
        18,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Hektor',
        NULL,
        '2025-09-01',
        FALSE,
        'UNKNOWN',
        5,
        19,
        NULL);
INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id)
VALUES (TRUE,
        'Shih Tzu',
        '276099200789599',
        '2025-09-18',
        FALSE,
        'MALE',
        1,
        10,
        NULL);

INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ede',
             '276093400550936',
             '2024-11-11',
             TRUE,
             'MALE',
             1,
             20,
             20
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bella',
             NULL,
             '2024-12-02',
             FALSE,
             'FEMALE',
             1,
             20,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Sally',
             NULL,
             '2024-12-04',
             FALSE,
             'FEMALE',
             1,
             21,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Luna',
             NULL,
             '2025-01-13',
             FALSE,
             'FEMALE',
             1,
             22,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Coco',
             NULL,
             '2025-04-02',
             FALSE,
             'FEMALE',
             1,
             5,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Puppy',
             NULL,
             '2025-06-11',
             FALSE,
             'FEMALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Morphy',
             NULL,
             '2025-06-11',
             FALSE,
             'MALE',
             3,
             4,
             8
         );

INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Fred',
             '276098140047057',
             '2024-11-11',
             FALSE,
             'MALE',
             3,
             4,
             12
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Fienchen / Saphira',
             NULL,
             '2024-10-15',
             FALSE,
             'FEMALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Augustin',
             '276098140047287',
             '2024-07-28',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lucy-Lou',
             '276098140044181',
             '2024-10-24',
             FALSE,
             'FEMALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Else',
             '276098140044161',
             '2024-05-06',
             FALSE,
             'FEMALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'George',
             '2760981140044694',
             '2024-11-11',
             FALSE,
             'MALE',
             3,
             4,
             12
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Frankie',
             '276098140044191',
             '2024-10-09',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tom',
             '276098140044180',
             '2024-10-17',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Harry',
             NULL,
             '2024-09-04',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Heidi',
             '276098140047274',
             '2024-06-02',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bolle',
             NULL,
             '2024-11-11',
             TRUE,
             'MALE',
             1,
             NULL,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Hörby',
             '276098140048933',
             '2024-10-16',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Julietta',
             '276098140047273',
             '2024-07-17',
             FALSE,
             'FEMALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Martha',
             '276098140047048',
             '2024-11-11',
             FALSE,
             'FEMALE',
             3,
             NULL,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Irma',
             '276098108900388',
             '2024-06-25',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Bandit',
             '276098140047087',
             '2024-11-11',
             FALSE,
             'MALE',
             1,
             25,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Marianne',
             '276098140047060',
             '2024-11-11',
             FALSE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Karima',
             '276098140048917',
             '2024-06-25',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Big Ducky',
             '276098140047434',
             '2024-01-12',
             TRUE,
             'MALE',
             1,
             27,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Johnny',
             NULL,
             '2024-10-01',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Chicco',
             '276098108882932',
             '2024-05-18',
             FALSE,
             'MALE',
             1,
             26,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lene',
             '276098108900543',
             '2024-06-25',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ludwig',
             '276098140044160',
             '2024-05-06',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Daisy- Temari',
             '276098108438404',
             '2024-06-23',
             TRUE,
             'FEMALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Robb',
             '276098140047333',
             '2024-05-06',
             FALSE,
             'MALE',
             3,
             NULL,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Matteo',
             '276098140047439',
             '2024-09-05',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Peaches',
             '276098140048801',
             '2024-10-27',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Stripe',
             NULL,
             '2024-10-08',
             FALSE,
             'MALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Carol',
             '276098140048844',
             '2024-09-20',
             FALSE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Gismo',
             '642090001577884',
             '2024-04-11',
             TRUE,
             'MALE',
             1,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Judith',
             '276098140044190',
             '2024-09-20',
             FALSE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Maggie',
             '276098140044183',
             '2024-09-20',
             FALSE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Carl',
             '276098140048853',
             '2024-09-20',
             FALSE,
             'MALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Daryl',
             '276098140047064',
             '2024-09-20',
             FALSE,
             'MALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Glenn',
             '276098140044200',
             '2024-09-20',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Rookie',
             '276098108900505',
             '2024-09-12',
             TRUE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Rick',
             '276098140048857',
             '2024-09-20',
             FALSE,
             'MALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Merle',
             '276098140044220',
             '2024-09-20',
             FALSE,
             'MALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Rio',
             '276098108900473',
             '2024-11-11',
             TRUE,
             'MALE',
             1,
             25,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Joko',
             NULL,
             '2024-08-29',
             TRUE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Minosch',
             NULL,
             '2024-09-26',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Klaas',
             NULL,
             '2024-08-29',
             TRUE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ricardo',
             '981020017450846',
             '2024-07-17',
             FALSE,
             'MALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Frau Schmidt',
             '276098140047416',
             '2024-11-11',
             FALSE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Herr Schröder',
             '276098140047453',
             '2024-09-10',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Parker',
             NULL,
             '2024-11-05',
             FALSE,
             'UNKNOWN',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Susi',
             NULL,
             '2024-09-10',
             FALSE,
             'FEMALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Jackson',
             NULL,
             '2023-09-14',
             FALSE,
             'MALE',
             4,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Zombie',
             '276095611755105',
             '2024-06-22',
             TRUE,
             'MALE',
             1,
             5,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Jayla',
             '276098104488283',
             '2022-07-27',
             FALSE,
             'FEMALE',
             1,
             NULL,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kurt',
             NULL,
             '2024-07-01',
             FALSE,
             'MALE',
             1,
             26,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Meghan',
             NULL,
             '2024-09-04',
             FALSE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Cookie',
             NULL,
             '2024-09-14',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lise',
             NULL,
             '2023-12-15',
             FALSE,
             'FEMALE',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Okulus',
             NULL,
             '2024-10-04',
             FALSE,
             'MALE',
             3,
             23,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lotte',
             NULL,
             '2023-12-15',
             FALSE,
             'FEMALE',
             4,
             NULL,
             10
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Caruso',
             NULL,
             '2024-04-11',
             FALSE,
             'MALE',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bockbock',
             NULL,
             '2024-10-27',
             FALSE,
             'FEMALE',
             4,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Peanut',
             '276098140047154',
             '2024-06-27',
             TRUE,
             'FEMALE',
             1,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Zorro',
             NULL,
             '2024-10-23',
             FALSE,
             'MALE',
             3,
             23,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Duncan',
             NULL,
             '2024-10-26',
             FALSE,
             'MALE',
             3,
             NULL,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Li Si',
             NULL,
             '2024-08-19',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Yennefer',
             '276098140047518',
             '2024-10-19',
             FALSE,
             'FEMALE',
             5,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Geralt',
             '276098140047408',
             '2024-10-02',
             FALSE,
             'MALE',
             5,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Twitschi',
             NULL,
             '2024-09-02',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Donny',
             NULL,
             '2024-10-24',
             FALSE,
             'MALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Wade',
             '276098140044224',
             '2024-09-30',
             FALSE,
             'MALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Elmo',
             '276098140048848',
             '2024-08-12',
             FALSE,
             'MALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Memmel',
             NULL,
             '2024-09-03',
             FALSE,
             'FEMALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Gwen',
             '276098140047076',
             '2024-09-30',
             FALSE,
             'FEMALE',
             5,
             NULL,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Aphrodite',
             NULL,
             '2024-05-08',
             FALSE,
             'UNKNOWN',
             4,
             59,
             42
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Blitz',
             '276098140047059',
             '2024-02-24',
             FALSE,
             'FEMALE',
             5,
             NULL,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Barret',
             '276098140047441',
             '2024-02-24',
             FALSE,
             'MALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Aerith',
             '276098140047477',
             '2024-02-24',
             FALSE,
             'FEMALE',
             5,
             NULL,
             14
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Artemis',
             NULL,
             '2024-05-08',
             TRUE,
             'UNKNOWN',
             4,
             59,
             43
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Red',
             '276098140047430',
             '2024-02-24',
             FALSE,
             'MALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Gandalf',
             NULL,
             '2024-11-11',
             FALSE,
             'MALE',
             4,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Zeus',
             NULL,
             '2024-05-08',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Artur',
             NULL,
             '2024-11-01',
             FALSE,
             'MALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Anna',
             NULL,
             '2024-03-27',
             TRUE,
             'FEMALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Elsa',
             NULL,
             '2024-03-27',
             TRUE,
             'FEMALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Olaf',
             NULL,
             '2024-03-27',
             TRUE,
             'MALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Hans',
             NULL,
             '2024-03-27',
             TRUE,
             'MALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Sven',
             NULL,
             '2024-03-27',
             TRUE,
             'MALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Feige',
             NULL,
             '2024-11-11',
             FALSE,
             'MALE',
             4,
             NULL,
             10
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Baloo',
             '642093400151188',
             '2024-11-11',
             TRUE,
             'MALE',
             1,
             25,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Triss',
             NULL,
             '2024-11-12',
             FALSE,
             'FEMALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lysator',
             NULL,
             '2024-11-11',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Luna',
             NULL,
             '2024-11-05',
             TRUE,
             'FEMALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Milka',
             '276098140047344',
             '2024-09-23',
             TRUE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Blümchen',
             '900233003679131',
             '2024-06-18',
             TRUE,
             'FEMALE',
             1,
             5,
             16
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Benjamin',
             '900233003702813',
             '2024-06-18',
             TRUE,
             'MALE',
             1,
             5,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bodo',
             NULL,
             '2024-11-15',
             FALSE,
             'MALE',
             3,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Meggy',
             '941000021166173',
             '2024-11-18',
             TRUE,
             'FEMALE',
             1,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Frl. Meyer',
             '276098140047047',
             '2024-11-19',
             FALSE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lysator',
             NULL,
             '2024-11-11',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lucy',
             NULL,
             '2024-11-20',
             FALSE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Voxy',
             NULL,
             '2024-11-20',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lois',
             '642099000708140',
             '2024-11-21',
             FALSE,
             'FEMALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Amy',
             '642099000716687',
             '2024-11-18',
             TRUE,
             'FEMALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Luzie',
             '642099000435026',
             '2024-11-18',
             FALSE,
             'FEMALE',
             1,
             5,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Soraya',
             '642099000464793',
             '2024-11-18',
             TRUE,
             'FEMALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Jenna',
             '642099000585977',
             '2024-11-18',
             TRUE,
             'FEMALE',
             1,
             5,
             15
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ken',
             '642098201053506',
             '2024-11-18',
             TRUE,
             'MALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Valerie',
             '642090001677129',
             '2024-11-18',
             TRUE,
             'FEMALE',
             1,
             5,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Doro',
             '642090001702800',
             '2024-11-18',
             TRUE,
             'MALE',
             1,
             5,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Paul',
             '276093400425883',
             '2024-11-18',
             TRUE,
             'MALE',
             1,
             5,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Èdentè',
             '642090001945603',
             '2024-11-25',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tilda',
             NULL,
             '2024-11-26',
             FALSE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bonny',
             NULL,
             '2024-11-23',
             FALSE,
             'FEMALE',
             1,
             5,
             10
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Wilma',
             NULL,
             '2024-11-29',
             TRUE,
             'FEMALE',
             3,
             NULL,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Molly',
             NULL,
             '2024-11-29',
             TRUE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Budy',
             NULL,
             '2024-11-29',
             TRUE,
             'MALE',
             3,
             NULL,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Boo',
             NULL,
             '2024-12-02',
             FALSE,
             'FEMALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Sully',
             NULL,
             '2024-12-02',
             FALSE,
             'MALE',
             3,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Mike',
             NULL,
             '2024-12-02',
             FALSE,
             'FEMALE',
             3,
             NULL,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tabasco',
             NULL,
             '2024-12-04',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Myra',
             NULL,
             '2024-12-05',
             FALSE,
             'FEMALE',
             3,
             NULL,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Anouk',
             '276098800381052',
             '2024-12-08',
             FALSE,
             'FEMALE',
             1,
             22,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Pongo',
             NULL,
             '2024-12-13',
             FALSE,
             'MALE',
             5,
             NULL,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Mathilda',
             NULL,
             '2024-12-16',
             FALSE,
             'FEMALE',
             3,
             NULL,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Molly',
             NULL,
             '2024-12-12',
             FALSE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bunki',
             NULL,
             '2024-12-13',
             FALSE,
             'FEMALE',
             3,
             NULL,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Phönix',
             NULL,
             '2024-12-16',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Maui',
             NULL,
             '2024-12-17',
             FALSE,
             'MALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tarzan',
             NULL,
             '2024-12-19',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Wednesday',
             NULL,
             '2024-12-27',
             TRUE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Malte-Mohli',
             '276098800184407',
             '2024-01-01',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Luna',
             NULL,
             '2024-06-15',
             TRUE,
             'FEMALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Anomy (Mia)',
             NULL,
             '2025-01-05',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Sinchen',
             NULL,
             '2025-01-10',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Wicky',
             NULL,
             '2024-12-24',
             FALSE,
             'FEMALE',
             1,
             NULL,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Grogu',
             NULL,
             '2025-01-14',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Yoda',
             NULL,
             '2025-01-14',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Leia',
             NULL,
             '2025-01-16',
             FALSE,
             'FEMALE',
             3,
             NULL,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Sinchen',
             NULL,
             '2025-01-10',
             FALSE,
             'FEMALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Anton',
             NULL,
             '2025-01-04',
             FALSE,
             'MALE',
             1,
             66,
             20
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kicki',
             NULL,
             '2025-01-20',
             FALSE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Molly-Walter',
             NULL,
             '2025-01-23',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Joris',
             'nicht vorhanden',
             '2025-02-12',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Carla',
             NULL,
             '2025-02-13',
             FALSE,
             'FEMALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Mirmir',
             '276099200606331',
             '2025-02-16',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lulu',
             NULL,
             '2025-02-26',
             FALSE,
             'MALE',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Wendy',
             NULL,
             '2025-02-26',
             FALSE,
             'FEMALE',
             1,
             5,
             10
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Blümchen',
             NULL,
             '2025-03-04',
             FALSE,
             'FEMALE',
             3,
             NULL,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Spoony',
             NULL,
             '2025-03-09',
             FALSE,
             'MALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dackelbert',
             NULL,
             '2025-03-11',
             FALSE,
             'MALE',
             1,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Karla',
             NULL,
             '2025-03-16',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Beyas',
             NULL,
             '2025-03-13',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Günther',
             NULL,
             '2025-03-18',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Roberto',
             NULL,
             '2024-07-11',
             FALSE,
             'MALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Molina',
             '24desatout6.0008',
             '2025-03-21',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Molino',
             '24 DE SATOUT 6.0002',
             '2025-03-21',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Sunny',
             NULL,
             '2023-03-20',
             FALSE,
             'FEMALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lenny',
             NULL,
             '2025-03-25',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kim',
             NULL,
             '2025-03-25',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lenny (Demon)',
             NULL,
             '2025-04-01',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Hoppla',
             NULL,
             '2025-04-01',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ups',
             NULL,
             '2025-03-28',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Thanos',
             '9530A24820822',
             '2025-03-26',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Optimus Prime',
             NULL,
             '2025-04-01',
             FALSE,
             'MALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Hawkeye',
             'BMH3.02025014',
             '2025-03-30',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Fluffy',
             NULL,
             '2025-03-29',
             TRUE,
             'FEMALE',
             3,
             4,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Coconut',
             NULL,
             '2025-03-29',
             TRUE,
             'FEMALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Rübe',
             NULL,
             '2025-03-30',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Atschi',
             '990000005578007',
             '2025-03-22',
             TRUE,
             'MALE',
             1,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Siegfried',
             NULL,
             '2025-03-22',
             TRUE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Roy',
             NULL,
             '2025-03-22',
             TRUE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Rumy',
             NULL,
             '2024-04-08',
             FALSE,
             'FEMALE',
             3,
             NULL,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Juno',
             NULL,
             '2025-04-10',
             FALSE,
             'FEMALE',
             3,
             NULL,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Soki',
             NULL,
             '2025-04-09',
             FALSE,
             'MALE',
             3,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Zola',
             NULL,
             '2025-04-09',
             FALSE,
             'FEMALE',
             3,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Blum',
             NULL,
             '2025-04-09',
             FALSE,
             'FEMALE',
             3,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Damon',
             NULL,
             '2025-04-09',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Alaric',
             NULL,
             '2025-04-09',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Jeremy',
             NULL,
             '2025-04-09',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Elijah',
             NULL,
             '2025-04-09',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Boris',
             NULL,
             '2025-04-12',
             FALSE,
             'MALE',
             3,
             4,
             9
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Cartman',
             NULL,
             '2025-04-09',
             TRUE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Bonnie',
             NULL,
             '2025-04-15',
             TRUE,
             'FEMALE',
             3,
             4,
             39
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ilsa',
             NULL,
             '2025-04-16',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Mike',
             NULL,
             '2025-04-20',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Momo',
             NULL,
             '2025-04-16',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Wakanda',
             NULL,
             '2025-04-23',
             FALSE,
             'FEMALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Hans-Georg',
             '276093400601591',
             '2022-08-08',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Schildegard',
             NULL,
             '2025-04-28',
             FALSE,
             'FEMALE',
             6,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Ranzberta',
             NULL,
             '2025-04-29',
             FALSE,
             'FEMALE',
             3,
             4,
             9
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Fire',
             NULL,
             '2025-04-24',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Flynn',
             NULL,
             '2025-04-30',
             FALSE,
             'MALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Heinz',
             NULL,
             '2025-05-01',
             FALSE,
             'MALE',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Chester',
             NULL,
             '2025-05-03',
             FALSE,
             'MALE',
             3,
             46,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tian',
             NULL,
             '2025-04-24',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lucy',
             '276098140044017',
             '2025-05-09',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Marius',
             '276098140044004',
             '2025-05-09',
             FALSE,
             'MALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Peggy',
             NULL,
             '2025-05-09',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dimka',
             NULL,
             '2025-05-09',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Fuego',
             NULL,
             '2025-04-24',
             FALSE,
             'MALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Fuorco',
             NULL,
             '2025-04-24',
             FALSE,
             'MALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Feu',
             NULL,
             '2025-04-24',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Vatra',
             NULL,
             '2025-04-24',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Al Katzone',
             NULL,
             '2025-05-13',
             TRUE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Bummsi',
             NULL,
             '2025-05-01',
             FALSE,
             'FEMALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Azuro',
             NULL,
             '2025-05-14',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Sumi',
             NULL,
             '2025-05-21',
             TRUE,
             'FEMALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Lincoln',
             NULL,
             '2025-05-19',
             FALSE,
             'MALE',
             3,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Baron',
             NULL,
             '2025-05-11',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tante Fanny',
             NULL,
             '2025-05-25',
             FALSE,
             'FEMALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Julian',
             NULL,
             '2025-05-25',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Georg',
             NULL,
             '2025-05-25',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dick',
             NULL,
             '2025-05-25',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Anne',
             NULL,
             '2025-05-25',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kenai',
             NULL,
             '2025-05-24',
             FALSE,
             'MALE',
             3,
             23,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Timmy',
             NULL,
             '2025-05-26',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Khloe',
             NULL,
             '2025-05-26',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bruce',
             NULL,
             '2025-05-30',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Robert',
             NULL,
             '2025-05-30',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Rob',
             NULL,
             '2025-05-30',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kris',
             NULL,
             '2025-05-30',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kylie',
             NULL,
             '2025-05-30',
             FALSE,
             'FEMALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Käthe',
             NULL,
             '2025-05-29',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Prof. Poggy',
             NULL,
             '2025-05-29',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Magnus-Maximus',
             NULL,
             '2025-05-29',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Karina',
             NULL,
             '2025-05-29',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Karlchen',
             NULL,
             '2025-05-29',
             FALSE,
             'MALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Raupi',
             NULL,
             '2025-05-29',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Hummi',
             NULL,
             '2025-05-28',
             FALSE,
             'FEMALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kasimir',
             NULL,
             '2025-05-29',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Cosmo',
             NULL,
             '2025-06-03',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Wanda',
             NULL,
             '2025-06-03',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Poof',
             NULL,
             '2025-06-03',
             FALSE,
             'MALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Josy',
             NULL,
             '2025-05-31',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tweedy',
             NULL,
             '2025-06-03',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Quentin',
             NULL,
             '2025-06-01',
             FALSE,
             'MALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Linus',
             NULL,
             '2025-06-09',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Zecke',
             NULL,
             '2025-06-07',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Berna',
             NULL,
             '2025-06-11',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Seth',
             NULL,
             '2025-03-03',
             FALSE,
             'MALE',
             5,
             36,
             26
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Nessaja',
             NULL,
             '2025-06-16',
             FALSE,
             'FEMALE',
             6,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kollegah',
             NULL,
             '2025-06-20',
             FALSE,
             'MALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Jürgen',
             NULL,
             '2025-06-20',
             TRUE,
             'MALE',
             1,
             29,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Morty',
             NULL,
             '2025-06-22',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Hubert',
             NULL,
             '2025-06-08',
             FALSE,
             'MALE',
             3,
             4,
             9
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Paul',
             NULL,
             '2025-06-06',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Pia',
             NULL,
             '2025-06-06',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Petra',
             NULL,
             '2025-06-25',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dina',
             NULL,
             '2025-06-25',
             FALSE,
             'FEMALE',
             3,
             4,
             5
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dafne',
             NULL,
             '2025-06-25',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Danjo',
             NULL,
             '2025-06-25',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Kassiopeia',
             NULL,
             '2025-06-26',
             FALSE,
             'FEMALE',
             6,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Brigitte',
             NULL,
             '2025-07-04',
             TRUE,
             'FEMALE',
             1,
             5,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Rosalinde',
             '2760908140044052',
             '2025-07-04',
             TRUE,
             'FEMALE',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Luna',
             NULL,
             '2025-07-07',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Lenna',
             NULL,
             '2025-06-30',
             FALSE,
             'FEMALE',
             3,
             60,
             19
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Agnes',
             NULL,
             '2025-07-09',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Muna',
             NULL,
             '2025-07-14',
             TRUE,
             'FEMALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kreacher',
             NULL,
             '2025-07-11',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Galaxy',
             NULL,
             '2025-07-16',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ulysses',
             NULL,
             '2025-07-16',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Artus',
             '276094502002431',
             '2025-07-11',
             TRUE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Bonny',
             NULL,
             '2025-07-11',
             TRUE,
             'FEMALE',
             1,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tiffy',
             NULL,
             '2025-07-16',
             FALSE,
             'FEMALE',
             1,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Odette',
             NULL,
             '2025-07-18',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Otto',
             NULL,
             '2025-07-18',
             FALSE,
             'MALE',
             3,
             4,
             24
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Olivia',
             NULL,
             '2025-07-18',
             FALSE,
             'FEMALE',
             3,
             4,
             44
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Olaf',
             NULL,
             '2025-07-18',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Hildegart',
             NULL,
             '2025-07-02',
             FALSE,
             'FEMALE',
             3,
             24,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Donti',
             NULL,
             '2025-07-02',
             FALSE,
             'MALE',
             3,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Steffi',
             NULL,
             '2025-07-16',
             FALSE,
             'FEMALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Tonks',
             NULL,
             '2025-07-19',
             FALSE,
             'FEMALE',
             4,
             34,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Malia',
             NULL,
             '2025-07-19',
             FALSE,
             'FEMALE',
             3,
             24,
             36
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Schiggy',
             NULL,
             '2025-07-16',
             FALSE,
             'UNKNOWN',
             6,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Turtok',
             NULL,
             '2025-07-21',
             FALSE,
             'UNKNOWN',
             6,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Mitsubishi',
             NULL,
             '2025-07-22',
             FALSE,
             'FEMALE',
             3,
             4,
             29
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Carisma',
             NULL,
             '2025-07-22',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Neele',
             NULL,
             '2025-07-24',
             FALSE,
             'FEMALE',
             5,
             65,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Naomi',
             NULL,
             '2025-07-24',
             FALSE,
             'FEMALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Eddy',
             NULL,
             '2025-07-28',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Fence',
             NULL,
             '2025-07-28',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Langen',
             NULL,
             '2025-07-25',
             FALSE,
             'MALE',
             3,
             4,
             39
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Obsidian',
             NULL,
             '2025-07-27',
             FALSE,
             'MALE',
             3,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Clementine',
             NULL,
             '2025-07-25',
             FALSE,
             'FEMALE',
             3,
             4,
             9
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Baghira',
             '61609901075',
             '2025-07-28',
             FALSE,
             'FEMALE',
             1,
             NULL,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Nero',
             NULL,
             '2025-07-28',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Bruno',
             '276099200790033',
             '2025-07-01',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dinah',
             NULL,
             '2025-08-01',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Butschi',
             NULL,
             '2025-08-03',
             FALSE,
             'MALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dobby',
             '276098109102181',
             '2025-08-04',
             FALSE,
             'MALE',
             1,
             NULL,
             10
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Charlotte',
             NULL,
             '2025-08-02',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Dobby',
             '276097202667379',
             '2025-08-05',
             TRUE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Clara',
             NULL,
             '2025-08-05',
             FALSE,
             'FEMALE',
             3,
             NULL,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ella',
             NULL,
             '2025-08-04',
             FALSE,
             'FEMALE',
             5,
             NULL,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Mama Wild',
             NULL,
             '2025-08-02',
             FALSE,
             'FEMALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Luzifer',
             NULL,
             '2025-08-02',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Cheetah',
             NULL,
             '2025-08-02',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Puusje',
             NULL,
             '2025-08-02',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Knut',
             NULL,
             '2025-08-02',
             FALSE,
             'UNKNOWN',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Forest',
             NULL,
             '2025-08-07',
             TRUE,
             'MALE',
             4,
             61,
             18
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Celeste',
             NULL,
             '2025-08-07',
             TRUE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Krümel',
             NULL,
             '2025-08-06',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Lucy',
             NULL,
             '2025-08-07',
             FALSE,
             'FEMALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Thelma',
             NULL,
             '2025-08-06',
             FALSE,
             'UNKNOWN',
             3,
             4,
             45
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Naomi',
             NULL,
             '2025-08-08',
             FALSE,
             'FEMALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Maddie',
             NULL,
             '2025-08-08',
             FALSE,
             'UNKNOWN',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Malou',
             NULL,
             '2025-08-08',
             FALSE,
             'UNKNOWN',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Milano',
             NULL,
             '2025-08-08',
             FALSE,
             'MALE',
             3,
             4,
             46
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Wednesday',
             NULL,
             '2025-08-08',
             TRUE,
             'MALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Enid',
             NULL,
             '2025-08-08',
             TRUE,
             'FEMALE',
             4,
             33,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Pia',
             NULL,
             '2025-08-08',
             FALSE,
             'FEMALE',
             1,
             NULL,
             10
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Jutti',
             NULL,
             '2025-08-11',
             FALSE,
             'UNKNOWN',
             3,
             4,
             8
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Elisabeth',
             NULL,
             '2025-08-13',
             FALSE,
             'FEMALE',
             5,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Chance',
             NULL,
             '2025-08-14',
             FALSE,
             'MALE',
             3,
             4,
             9
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Jimmy',
             NULL,
             '2025-08-07',
             FALSE,
             'MALE',
             3,
             4,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Sultan',
             NULL,
             '2025-08-18',
             FALSE,
             'MALE',
             3,
             24,
             21
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Jolanda',
             NULL,
             '2025-08-17',
             FALSE,
             'FEMALE',
             1,
             29,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Stella',
             '992000000122813',
             '2025-08-17',
             FALSE,
             'FEMALE',
             1,
             64,
             22
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Schnitzel',
             NULL,
             '2025-08-02',
             FALSE,
             'MALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Lyra',
             'keine',
             '2025-08-18',
             FALSE,
             'FEMALE',
             3,
             4,
             26
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Sybille',
             NULL,
             '2025-08-18',
             FALSE,
             'FEMALE',
             1,
             9,
             37
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Jack',
             NULL,
             '2025-08-20',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Streusel',
             '276099200554388',
             '2025-08-22',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Kuchen',
             '276099200554390',
             '2025-08-22',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Lieselotte',
             NULL,
             '2025-08-22',
             TRUE,
             'FEMALE',
             1,
             63,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Max',
             NULL,
             '2025-08-26',
             FALSE,
             'MALE',
             3,
             4,
             9
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Mirella',
             NULL,
             '2025-08-26',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Choco',
             '2760992004325',
             '2025-08-23',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Melina',
             NULL,
             '2025-08-26',
             FALSE,
             'FEMALE',
             3,
             4,
             39
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Bernd',
             NULL,
             '2025-08-27',
             FALSE,
             'MALE',
             1,
             62,
             2
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Florentina',
             NULL,
             '2025-08-29',
             FALSE,
             'FEMALE',
             3,
             4,
             46
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Ernst Hoffmann',
             NULL,
             '2925-09-03',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Nyx',
             NULL,
             '2025-09-03',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Heca',
             NULL,
             '2025-09-03',
             FALSE,
             'FEMALE',
             3,
             4,
             3
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Nox',
             NULL,
             '2025-09-03',
             FALSE,
             'MALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Huckleberry',
             NULL,
             '2025-09-12',
             FALSE,
             'MALE',
             3,
             4,
             4
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Grampi',
             NULL,
             '2025-09-20',
             FALSE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Coco',
             NULL,
             '2025-09-19',
             FALSE,
             'FEMALE',
             3,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Schoko',
             NULL,
             '2025-09-21',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Ellen',
             NULL,
             '2025-09-20',
             FALSE,
             'FEMALE',
             5,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Niran',
             NULL,
             '2025-09-22',
             FALSE,
             'MALE',
             3,
             NULL,
             1
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Daisy',
             NULL,
             '2025-09-21',
             FALSE,
             'FEMALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Minnie',
             NULL,
             '2025-09-21',
             FALSE,
             'FEMALE',
             3,
             4,
             6
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Pluto',
             NULL,
             '2025-09-21',
             FALSE,
             'MALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             FALSE,
             'Goofy',
             NULL,
             '2025-09-21',
             FALSE,
             'MALE',
             3,
             4,
             7
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Amazonas',
             NULL,
             '2025-09-25',
             FALSE,
             'UNKNOWN',
             4,
             58,
             38
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id
) VALUES (
             TRUE,
             'Kiwi',
             NULL,
             '2025-09-22',
             FALSE,
             'UNKNOWN',
             4,
             59,
             47
         );

INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Balou',
             '992000000100013',
             '2024-11-11',
             FALSE,
             'MALE',
             1,
             NULL,
             4,
             NULL,
             TRUE,
             'Neigt zu übersprungshandlung'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Kalisi',
             '276098108900208',
             '2024-11-11',
             FALSE,
             'FEMALE',
             3,
             4,
             2,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Carlos',
             '941000015685354',
             '2024-11-11',
             FALSE,
             'MALE',
             1,
             47,
             10,
             NULL,
             TRUE,
             'Bissig'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Payton',
             '276098140047176',
             '2024-11-11',
             FALSE,
             'FEMALE',
             3,
             4,
             4,
             NULL,
             TRUE,
             'Sprachschwierigkeiten mit Abgabeperson'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Django',
             '276098108410306',
             '2024-11-11',
             FALSE,
             'MALE',
             1,
             5,
             2,
             NULL,
             TRUE,
             'Keine'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Herr Schneider',
             '276094502230593',
             '2024-11-11',
             TRUE,
             'MALE',
             1,
             9,
             22,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Hunter',
             '276093400844623',
             '2024-11-11',
             TRUE,
             'MALE',
             1,
             28,
             6,
             NULL,
             TRUE,
             'Hat gebissen'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Erna',
             NULL,
             '2024-11-11',
             FALSE,
             'FEMALE',
             4,
             NULL,
             22,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Brita',
             NULL,
             '2024-11-11',
             FALSE,
             'FEMALE',
             4,
             NULL,
             2,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Greta',
             NULL,
             '2024-11-11',
             FALSE,
             'FEMALE',
             4,
             NULL,
             10,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Brunhilde',
             NULL,
             '2024-11-11',
             FALSE,
             'FEMALE',
             4,
             NULL,
             2,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Edeltraut',
             NULL,
             '2024-11-11',
             FALSE,
             'FEMALE',
             4,
             NULL,
             2,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Plötze',
             NULL,
             '2024-11-11',
             FALSE,
             'FEMALE',
             5,
             NULL,
             2,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Pinoccio',
             NULL,
             '2024-11-11',
             FALSE,
             'MALE',
             4,
             35,
             2,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Biene',
             NULL,
             '2024-11-25',
             FALSE,
             'FEMALE',
             1,
             NULL,
             NULL,
             NULL,
             FALSE,
             'Kennen nix, scheu'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Maja',
             NULL,
             '2024-11-25',
             FALSE,
             'FEMALE',
             1,
             NULL,
             NULL,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Fritzchen',
             NULL,
             '2024-11-25',
             FALSE,
             'MALE',
             1,
             5,
             21,
             NULL,
             FALSE,
             'WIrd auch Kröte genannt'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Rambo',
             NULL,
             '2024-11-25',
             FALSE,
             'MALE',
             1,
             NULL,
             7,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Pancake',
             '276098108409980',
             '2024-12-02',
             FALSE,
             'MALE',
             3,
             NULL,
             8,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Nuri',
             '276090010862158',
             '2024-12-09',
             FALSE,
             'MALE',
             1,
             NULL,
             2,
             '2023-08-20',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Lucas',
             NULL,
             '2024-12-11',
             FALSE,
             'MALE',
             1,
             NULL,
             4,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Sunny',
             NULL,
             '2024-12-16',
             FALSE,
             'FEMALE',
             3,
             4,
             19,
             '2023-05-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Alfie',
             '276095611795167',
             '2025-01-13',
             FALSE,
             'MALE',
             3,
             23,
             NULL,
             '2023-06-03',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Anomy (Mia)',
             NULL,
             '2025-01-13',
             FALSE,
             'FEMALE',
             3,
             4,
             19,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Skadi',
             NULL,
             '2025-01-24',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Tieger',
             NULL,
             '2025-01-24',
             FALSE,
             'MALE',
             3,
             4,
             7,
             '2024-04-05',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Krümel',
             NULL,
             '2025-01-31',
             FALSE,
             'MALE',
             3,
             NULL,
             11,
             '2023-06-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Patcha',
             '276098140048792',
             '2025-01-31',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL,
             '2024-07-05',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Alf',
             '276094100286665',
             '2025-02-12',
             FALSE,
             'MALE',
             1,
             3,
             NULL,
             '2022-02-21',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Mocca',
             NULL,
             '2025-02-12',
             FALSE,
             'FEMALE',
             5,
             NULL,
             27,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Petra',
             '900108000903206',
             '2025-02-17',
             FALSE,
             'FEMALE',
             1,
             NULL,
             1,
             '2013-05-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Lena',
             '981020000910713',
             '2025-02-17',
             FALSE,
             'FEMALE',
             1,
             3,
             24,
             '2019-10-10',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Jacky',
             NULL,
             '2025-02-21',
             FALSE,
             'MALE',
             3,
             4,
             NULL,
             '2023-08-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Susi',
             NULL,
             '2025-02-25',
             FALSE,
             'FEMALE',
             3,
             4,
             4,
             NULL,
             NULL,
             'Keine Schmusekatze möchte nur Dosenöffner haben'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Jafar',
             NULL,
             '2025-02-28',
             FALSE,
             'MALE',
             5,
             NULL,
             3,
             '2019-09-28',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Frollo',
             NULL,
             '2025-02-28',
             FALSE,
             'MALE',
             5,
             NULL,
             10,
             '2019-09-04',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Hades',
             NULL,
             '2025-02-28',
             FALSE,
             'MALE',
             5,
             NULL,
             4,
             '2019-09-04',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Gaston',
             NULL,
             '2025-02-28',
             FALSE,
             'MALE',
             5,
             NULL,
             21,
             '2019-05-03',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Miki',
             NULL,
             '2025-03-05',
             FALSE,
             'FEMALE',
             3,
             NULL,
             4,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Minka',
             NULL,
             '2025-03-05',
             FALSE,
             'FEMALE',
             3,
             NULL,
             4,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Haru',
             '276099200564192',
             '2025-03-05',
             FALSE,
             'MALE',
             3,
             4,
             3,
             '2024-02-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Loki',
             '276099200564179',
             '2025-03-05',
             FALSE,
             'MALE',
             3,
             4,
             2,
             '2024-03-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Balou',
             NULL,
             '2025-03-10',
             FALSE,
             'MALE',
             3,
             4,
             8,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Frida',
             NULL,
             '2025-03-12',
             FALSE,
             'MALE',
             3,
             4,
             4,
             '2019-01-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Maluna',
             '276098140047446',
             '2025-03-14',
             FALSE,
             'FEMALE',
             3,
             4,
             11,
             '2024-07-07',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Ariel',
             NULL,
             '2025-03-14',
             TRUE,
             'FEMALE',
             1,
             11,
             2,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Caesar',
             '276098510496952',
             '2025-03-17',
             FALSE,
             'MALE',
             1,
             5,
             NULL,
             '2024-06-08',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Puma',
             '985170000086996',
             '2025-04-01',
             FALSE,
             'FEMALE',
             3,
             4,
             3,
             '2010-02-10',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Neele',
             '981189900133353',
             '2025-04-08',
             FALSE,
             'FEMALE',
             1,
             7,
             10,
             '2024-05-21',
             FALSE,
             'sehr aktiv, ist aus Sportzucht, beim alleine lassen geht sie an Wände usw.'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Schyra',
             '900182000103304',
             '2025-04-10',
             FALSE,
             'FEMALE',
             1,
             5,
             10,
             '2012-05-12',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Kuzco',
             '276098140047502',
             '2025-04-14',
             FALSE,
             'MALE',
             3,
             NULL,
             8,
             '2024-07-05',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Tipo',
             '276098140049001',
             '2025-04-14',
             FALSE,
             'MALE',
             3,
             NULL,
             NULL,
             '2024-07-05',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Sarabi',
             NULL,
             '2025-04-14',
             FALSE,
             'FEMALE',
             3,
             4,
             19,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Eshe',
             NULL,
             '2025-04-14',
             FALSE,
             'FEMALE',
             3,
             4,
             19,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Chigaru',
             NULL,
             '2025-04-14',
             FALSE,
             'MALE',
             3,
             4,
             3,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Obasi',
             NULL,
             '2025-04-14',
             FALSE,
             'MALE',
             3,
             4,
             3,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Prinzi',
             NULL,
             '2025-04-14',
             FALSE,
             'MALE',
             3,
             4,
             23,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Josie',
             '276094501124325',
             '2025-04-17',
             FALSE,
             'FEMALE',
             3,
             4,
             19,
             NULL,
             TRUE,
             'Schwester von Mellie'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Mellie',
             '276094501118241',
             '2025-04-17',
             FALSE,
             'FEMALE',
             3,
             4,
             19,
             NULL,
             TRUE,
             'Schwester von Josie'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Arabella',
             '276098140049761',
             '2025-04-23',
             FALSE,
             'FEMALE',
             3,
             4,
             3,
             '2018-01-01',
             TRUE,
             'RCP'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Ash',
             NULL,
             '2025-04-25',
             FALSE,
             'MALE',
             5,
             NULL,
             26,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Wuffel',
             '276096800120302',
             '2025-05-02',
             FALSE,
             'MALE',
             1,
             NULL,
             20,
             '2022-05-18',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Max',
             '642090001832680',
             '2025-05-08',
             FALSE,
             'MALE',
             1,
             5,
             20,
             '2019-03-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Schokoletta',
             '276097202871909',
             '2025-05-08',
             FALSE,
             'FEMALE',
             3,
             NULL,
             6,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Conner',
             '276098108654817',
             '2025-05-08',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL,
             '2022-10-24',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Olja',
             '276095611121716',
             '2025-05-12',
             FALSE,
             'FEMALE',
             1,
             3,
             NULL,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Minni',
             '945000000854793',
             '2025-05-21',
             FALSE,
             'FEMALE',
             1,
             NULL,
             5,
             '2008-04-25',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Lucia',
             NULL,
             '2025-05-23',
             FALSE,
             'FEMALE',
             3,
             4,
             48,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Maria',
             NULL,
             '2025-05-23',
             FALSE,
             'FEMALE',
             3,
             4,
             4,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Nala',
             '953000010075924',
             '2025-05-28',
             FALSE,
             'FEMALE',
             1,
             NULL,
             3,
             '2014-01-04',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Mina',
             '276098800135630',
             '2025-05-28',
             FALSE,
             'FEMALE',
             1,
             5,
             5,
             '2018-09-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Pünktchen',
             NULL,
             '2025-05-28',
             FALSE,
             'MALE',
             3,
             4,
             4,
             '2013-01-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Garry',
             NULL,
             '2025-06-04',
             FALSE,
             'MALE',
             5,
             38,
             26,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Fräulein Flauschig',
             NULL,
             '2025-06-04',
             FALSE,
             'FEMALE',
             5,
             37,
             4,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Rocky',
             NULL,
             '2025-06-04',
             FALSE,
             'MALE',
             5,
             38,
             1,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Bonnie',
             '276098108626673',
             '2025-06-13',
             FALSE,
             'FEMALE',
             1,
             5,
             2,
             '2022-07-12',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Toni',
             '276096800044074',
             '2025-06-18',
             FALSE,
             'MALE',
             1,
             5,
             10,
             '2022-07-06',
             FALSE,
             'bei bekannten Personen alles gut'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Oscar',
             '276097202581362',
             '2025-06-19',
             FALSE,
             'MALE',
             1,
             21,
             20,
             '2017-01-30',
             TRUE,
             'beißt bei hektischen Bewegungen und wenn man sein Zimmer betritt in dem er schläft'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Ates',
             '276099200091001',
             '2025-06-19',
             FALSE,
             'FEMALE',
             1,
             8,
             10,
             '2021-04-16',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Chayenne',
             '276095610382840',
             '2025-06-24',
             FALSE,
             'FEMALE',
             1,
             8,
             10,
             '2019-01-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Zeus',
             NULL,
             '2025-06-25',
             FALSE,
             'MALE',
             4,
             NULL,
             NULL,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Rex',
             '6160939023938',
             '2025-07-14',
             FALSE,
             'MALE',
             1,
             56,
             10,
             '2024-02-17',
             TRUE,
             'Menschenscheu'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Rumy',
             '276099200789861',
             '2025-07-14',
             FALSE,
             'FEMALE',
             3,
             NULL,
             6,
             '2023-01-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Amigo',
             '990000011408911',
             '2025-07-18',
             FALSE,
             'MALE',
             1,
             5,
             21,
             '2023-01-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Ivan',
             NULL,
             '2025-07-24',
             FALSE,
             'MALE',
             5,
             NULL,
             3,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Maracuja',
             NULL,
             '2025-07-25',
             FALSE,
             'FEMALE',
             5,
             NULL,
             NULL,
             NULL,
             NULL,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Benny',
             '276093400121365',
             '2025-07-28',
             FALSE,
             'MALE',
             1,
             49,
             1,
             '2011-10-02',
             TRUE,
             'beißt immer häufiger,'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Conner',
             '276098108654817',
             '2025-07-28',
             FALSE,
             'MALE',
             1,
             NULL,
             NULL,
             '2022-10-22',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Rowena',
             NULL,
             '2025-07-28',
             FALSE,
             'FEMALE',
             4,
             NULL,
             NULL,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Salazar',
             NULL,
             '2025-07-28',
             FALSE,
             'MALE',
             4,
             NULL,
             NULL,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Piri',
             NULL,
             '2025-08-04',
             FALSE,
             'MALE',
             1,
             67,
             4,
             '2022-01-01',
             FALSE,
             'Beißt beim Anfassen'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Mathea',
             '250268502224129',
             '2025-08-21',
             FALSE,
             'FEMALE',
             1,
             25,
             21,
             '2025-01-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Nash',
             '250269611174362',
             '2025-08-21',
             FALSE,
             'MALE',
             1,
             25,
             21,
             '2025-08-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Butchy',
             NULL,
             '2025-08-22',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             18,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Sissy',
             NULL,
             '2025-08-22',
             FALSE,
             'UNKNOWN',
             4,
             NULL,
             NULL,
             NULL,
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Mini',
             NULL,
             '2025-08-27',
             FALSE,
             'FEMALE',
             3,
             4,
             26,
             '2021-01-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             FALSE,
             'Bonny',
             NULL,
             '2025-08-27',
             FALSE,
             'FEMALE',
             3,
             4,
             NULL,
             '2025-06-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Clyde',
             NULL,
             '2025-08-27',
             FALSE,
             'MALE',
             3,
             4,
             12,
             '2025-06-01',
             FALSE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Rocky',
             '276095611503339',
             '2025-09-04',
             FALSE,
             'MALE',
             3,
             5,
             22,
             '2023-05-14',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Paul',
             '276093400425883',
             '2025-09-17',
             FALSE,
             'MALE',
             1,
             5,
             5,
             NULL,
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Jack',
             '276094501144880',
             '2025-09-18',
             FALSE,
             'MALE',
             1,
             5,
             2,
             '2019-04-01',
             TRUE,
             NULL
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Ally',
             '276095610816058',
             '2025-09-18',
             FALSE,
             'FEMALE',
             1,
             NULL,
             2,
             '2021-07-08',
             TRUE,
             'Männer unverträglich'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Darby',
             '985112005197001',
             '2025-09-22',
             FALSE,
             'FEMALE',
             1,
             21,
             14,
             '2011-04-26',
             TRUE,
             'Angst bei Sturm und Fuerwerk , pöbeln auch wenn andere pöbeln'
         );
INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated, special_notes
) VALUES (
             TRUE,
             'Jimmy',
             '985112008122822',
             '2025-09-22',
             FALSE,
             'MALE',
             1,
             21,
             NULL,
             '2014-06-28',
             TRUE,
             'Angst bei Sturm und Feuerwerk'
         );

INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated
) VALUES (
             TRUE,
             'Shila',
             '276095611783826',
             '2025-09-04',
             FALSE,
             'FEMALE',
             1,
             5,
             24,
             NULL,
             TRUE
         );

INSERT INTO pets (
    is_active, name, chip_number, date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated
) VALUES (
             TRUE,
             'Lissy',
             '642096302024759',
             '2025-09-11',
             TRUE,
             'FEMALE',
             1,
             5,
             5,
             NULL,
             FALSE
         );
INSERT INTO pets (
    is_active, name , date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated
) VALUES (
             TRUE,
             'Artes',
             '2025-09-10',
             TRUE,
             'MALE',
             3,
             4,
             37,
             NULL,
             FALSE
         );

INSERT INTO pets (
    is_active, name , date_found, is_extra_invoice, sex,
    species_id, breed_id, color_id, birthdate, is_castrated
) VALUES (
             TRUE,
             'Rufus',
             '2025-07-16',
             TRUE,
             'FEMALE',
             3,
             4,
             3,
             NULL,
             FALSE
         );

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE,
        'Apollo (tot)',
        '276098106057998',
        '2024-11-11',
        FALSE,
        'MALE',
        1,
        1,
        1,
        'ANIMALDEAD',
        200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE,
        'Bella (tot)',
        NULL,
        '2024-11-11',
        FALSE,
        'FEMALE',
        1,
        2,
        5,
        'ANIMALDEAD',
        200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-1 (tot)', '276098100001001', '2024-11-12', FALSE, 'MALE',
        1, 3, 4, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-2 (tot)', NULL, '2024-11-10', FALSE, 'FEMALE',
        1, 4, 2, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-3 (tot)', '276098100001003', '2024-11-13', FALSE, 'MALE',
        1, 2, 1, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-4 (tot)', NULL, '2024-11-09', FALSE, 'FEMALE',
        1, 5, 3, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-5 (tot)', '276098100001004', '2024-11-15', FALSE, 'MALE',
        1, 1, 5, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-6 (tot)', NULL, '2024-11-14', FALSE, 'FEMALE',
        1, 3, 1, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-7 (tot)', '276098100001007', '2024-11-07', FALSE, 'MALE',
        1, 4, 4, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (FALSE, 'Test-Tier-8 (tot)', NULL, '2024-11-08', FALSE, 'FEMALE',
        1, 2, 2, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-9 (tot)', '276098100001009', '2024-11-16', FALSE, 'MALE',
        1, 1, 3, 'ANIMALDEAD', 200);

INSERT INTO pets (is_active, name, chip_number, date_found, is_extra_invoice, sex,
                  species_id, breed_id, color_id, intake_reason, unit_id)
VALUES (TRUE, 'Test-Tier-10 (tot)', NULL, '2024-11-05', FALSE, 'FEMALE',
        1, 5, 5, 'ANIMALDEAD', 200);



Update pets
set unit_id = 145
where id != 0;

INSERT INTO placement_status (id, name, display_name, active, order_name) VALUES
                                                                                             (1, 'Available', 'Verfügbar', true, 0),
                                                                                             (2, 'Reserved', 'Reserviert',  true, 0),
                                                                                             (3, 'Boarding', 'Pension',  true, 0),
                                                                                             (4, 'AdoptionScheduled', 'Adoptionstermin', true, 0)
ON CONFLICT (name) DO NOTHING;

-- =============================================================================
-- Basisdaten für Termin-Kategorien und -Typen
-- =============================================================================

-- Appointment Categories (Termin-Kategorien)
INSERT INTO appointment_categories (id, name, order_number) VALUES
                                                                (1, 'Behandlungen', 1),
                                                                (2, 'Besuche', 2),
                                                                (3, 'Pflege',3),
                                                                (4, 'Allgemein', 4)
ON CONFLICT (id) DO
    UPDATE SET name = EXCLUDED.name,
               order_number = EXCLUDED.order_number;

-- Appointment Types (Terminarten)
INSERT INTO appointment_types (id, name, order_number) VALUES
                                                           (1, 'Impftermin', 1),
                                                           (2, 'Kennenlernen', 2),
                                                           (3, 'Reinigung', 3),
                                                           (4, 'Aufräumen', 4),
                                                           (5, 'Wurzelbehandlungen', 5),
                                                           (6, 'Mitnahme', 6),
                                                           (7, 'Fellpflege', 7),
                                                           (8, 'Umbau', 8),
                                                           (9, 'Medikamente', 9),
                                                           (10, 'Spaziergang', 10),
                                                           (11, 'Krallenschnitt', 11),
                                                           (12, 'Aufräumen', '12'),
                                                           (13, 'Allgemein', 13)
ON CONFLICT (id) DO
    UPDATE SET name = EXCLUDED.name,
               order_number = EXCLUDED.order_number;

-- ===========================
--   APPOINTMENTS TESTDATEN
-- ===========================

-- Struktur:
-- id, date, notes, time, pet_id, type_id, category_id, checked, checked_at, checked_by

TRUNCATE TABLE appointments RESTART IDENTITY;


-- =======================================================
-- 22.10.2025 – Haupttag aus deiner Spec
-- =======================================================

INSERT INTO appointments
(id, "date", notes, "time", pet_id, type_id, category_id, checked, checked_at, checked_by)
VALUES
-- Hunde (Behandlungen)
(1001, '2025-10-22', 'Zahnbehandlung – kurzer Kommentar', '11:45', 45, 1, 1, false, NULL, NULL),
(1002, '2025-10-22', 'Regelmäßige Medikamentengabe',       '15:15', 10, 1, 1, true, '2025-10-22 16:00', 'admin'),

-- Hunde (Besuche)
(1003, '2025-10-22', 'Erstes Treffen – Kennenlernen',      '13:00', 37, 2, 3, false, NULL, NULL),
(1004, '2025-10-22', 'Spaziergang im Park',                '16:00',  6, 2, 3, true, '2025-10-22 17:10', 'tierarzt'),

-- Hunde (Pflege)
(1005, '2025-10-22', 'Reinigungspflege',                   '09:00', 68, 3, 2, false, NULL, NULL),
(1006, '2025-10-22', 'Fellpflege',                         '09:45', 12, 3, 2, false, NULL, NULL),

-- Katzen (Behandlungen)
(1007, '2025-10-22', 'Allgemeine Kontrolle',               '10:30', 59, 4, 1, false, NULL, NULL),

-- Vögel
(1017, '2025-10-22', 'Gesundheitscheck (Vogel)',           '10:10', 13, 1, 1, false, NULL, NULL),
(1018, '2025-10-22', 'Krallenpflege (Voliere)',            '09:35', 22, 3, 2, false, NULL, NULL),
(1019, '2025-10-22', 'Volierenkontrolle',                  '16:20', 21, 4, 4, true, '2025-10-22 18:00', 'admin');


-- =======================================================
-- 21.10.2025
-- =======================================================
INSERT INTO appointments
(id, "date", notes, "time", pet_id, type_id, category_id, checked, checked_at, checked_by)
VALUES
    (1008, '2025-10-21', 'Fellpflege (kurz)',      '12:00', 35, 3, 2, false, NULL, NULL),
    (1009, '2025-10-21', 'Impfung',                '14:00', 11, 1, 1, true, '2025-10-21 14:20', 'tierarzt'),
    (1010, '2025-10-21', 'Kennenlern-Besuch',      '10:15', 61, 2, 3, false, NULL, NULL);


-- =======================================================
-- 20.10.2025
-- =======================================================
INSERT INTO appointments
(id, "date", notes, "time", pet_id, type_id, category_id, checked, checked_at, checked_by)
VALUES
    (1011, '2025-10-20', 'Medikamentengabe',          '08:30',  3, 1, 1, false, NULL, NULL),
    (1012, '2025-10-20', 'Fototermin für Vermittlung','12:45', 34, 4, 4, true, '2025-10-20 13:10', 'admin');


-- =======================================================
-- 23.10.2025
-- =======================================================
INSERT INTO appointments
(id, "date", notes, "time", pet_id, type_id, category_id, checked, checked_at, checked_by)
VALUES
    (1013, '2025-10-23', 'Krallenpflege',     '09:30', 20, 3, 2, false, NULL, NULL),
    (1014, '2025-10-23', 'Besuchertermin',   '15:45', 27, 2, 3, false, NULL, NULL);


-- =======================================================
-- 26.10.2025
-- =======================================================
INSERT INTO appointments
(id, "date", notes, "time", pet_id, type_id, category_id, checked, checked_at, checked_by)
VALUES
    (1015, '2025-10-26', 'Gehegereinigung',     '10:00', 344, 4, 4, false, NULL, NULL),
    (1016, '2025-10-26', 'Routineuntersuchung', '11:15', 60, 1, 1, false, NULL, NULL);


-- =======================================================
-- EXTRA-TERMINE OHNE Tierbezug (pet_id = NULL)
-- =======================================================

INSERT INTO appointments
(id, "date", notes, "time", pet_id, type_id, category_id, checked, checked_at, checked_by)
VALUES
    (1020, '2025-10-22', 'Besuch Sideklick – Besprechung',               '10:00', NULL, 2, 4, false, NULL, NULL),
    (1021, '2025-10-22', 'Allgemeine Gehegeinspektion – ohne Tier',      '14:30', NULL, 4, 4, true, '2025-10-22 15:00', 'pflegeleitung'),
    (1022, '2025-10-21', 'Wartung der Pflegestation',                    '09:00', NULL, 3, 2, false, NULL, NULL),
    (1023, '2025-10-23', 'Besprechung Tierärzte-Team',                   '11:00', NULL, 1, 4, false, NULL, NULL),
    (1024, '2025-10-26', 'Pressetermin – digitale Verwaltung',           '15:00', NULL, 4, 4, false, NULL, NULL);

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





