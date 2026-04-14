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