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
