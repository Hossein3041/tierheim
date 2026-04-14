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