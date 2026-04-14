export const LOGINTEXTS = {
  organisationName: "Tierschutz Bremerhaven e.V.",
  organisationAddress: "Vieländerweg 137 - 27574 Bremerhaven",
  organisationEmail: "info@tierschutz-bremerhaven.eu",
  loginGreeting: "Willkommen zurück!",
  loginInstruction:
    "Gib hier Benutzername und Passwort ein,\n" +
    "um Zugang zu unserer Seite zu erhalten.",
  loginUsername: "BENUTZERNAME",
  loginPassword: "PASSWORT",
  loginButton: "Einloggen",
  passwordReset: "Passwort vergessen?",
  logout: "Ausloggen",
  unlockPassword: "Freischalt Passwort",
  unlock: "Freischalten",
  newPassword: "Zukünftiges Passwort",
  validatePassword: {
    minChar: "Mind. 8 Zeichen.",
    minNumber: "Mind. eine Zahl.",
    minLower: "Mind. ein Kleinbuchstabe.",
    minUpper: "Mind. ein Großbuchstabe.",
    minSpecial: "Mind. ein Sonderzeichen oder Leerzeichen in der Mitte.",
  },
};

export const PETS = {
  all: "Alle",
  noPets: "Keine Tiere in dieser Kategorie.",
  loadPets: "Lade Tiere...",
  errorPets: "Fehler beim Laden der Tiere.",
  unknown: "Unbekannt",
  other: "Andere",
};

export const PETMODALTEXTS = {
  headline: "Tierdetails",
  fieldNameLabelText: "NAME",
  fieldBirthdateLabelText: "GEBURTSDATUM",
  fieldSexLabelText: "GESCHLECHT",
  fieldSpeciesLabelText: "ART",
  fieldRaceLabelText: "RASSE",
  fieldColorLabelText: "FARBE",
  fieldFinderNameLabelText: "NAME DES FINDERS",
  fieldFinderLocationLabelText: "FUNDORT",
  fieldFindingDateLabelText: "FUNDDATUM",
  fieldFinderAddressLabelText: "ADRESSE DES FINDERS",
  fieldTelephonenumberLabelText: "TELEFONNUMMER",
  fieldRoomLabelText: "RAUM",
  fieldFeedLabelText: "FUTTER",
  fieldMedicationLabelText: "MEDIKAMENTE",
  fieldChipnumberLabelText: "CHIPNUMMER",
  fieldRegistrationLabelText: "REGISTRIERT",
  fieldCastrationLabelText: "KASTRIERT",
  fieldSpecialfeaturesLabelText: "BESONDERHEITEN",
  fieldAppointmentButtonInputText: "Termine",
  fieldCancelationButtonInputText: "Abbrechen",
  fieldSaveButtonInputText: "Speichern",
  fieldInvoiceButtonInputText: "EXTRA RECHNUNG",
  fieldArchiveButtonInputText: "ARCHIVIERT",
  footerBoxLinkText: "Historie anzeigen",
};

export const ANIMALCONTENT = {
  otherCategoryText: "Keine Tiere in der Kategorie Andere.",
  emptyOtherCategoriesText: (categories: string[]) =>
    `Keine Tiere in den folgenden Kategorien: ${categories.join(", ")}.`,
  noPetsInCategoryText: (category: string) =>
    `Keine Tiere in der Kategorie ${category}.`,
  noPetsFoundForQueryInCategory: (q: string, category: string) =>
    `Keine Tiere gefunden für "${q}" in Kategorie "${category}".`,
};

export const ROOMPETMODALTEXTS = {
  roomPetDetailButtonText: " Details",
  roomPetDetailChipNumberLabelText: "CHIP-NUMMER",
  roomPetPlaceholderText: "- frei -",
};

export const ANIMALIMAGE = {
  ariaLabelText: "Tierbild anzeigen oder hochladen",
  animalImageName: "petImage",
  animalName: "Tiername",
  uploadImage: "Bild hochladen",
};

export const ANIMALTABVIEW = {
  noCategories: "Keine Kategorien",
};

export const DRAGANDDROP = {
  item_type: "ITEM_TYPE",
  dragContextError: "useDragContext must be used within a DragProvider",
  unitUpdateError: "Fehler beim Updaten des Zwingers: ",
  unitUpdateConfirmError:
    "handleConfirm: selectedUnitId oder pendingMove fehlt.",
  noUnits: "Keine Zwinger verfügbar.",
  chooseUnit: "Zwinger auswählen.",
  chooseAnotherSection: "Bitte wähle einen anderen Raum.",
  closeText: "Schließen",
  roomDetailsText: "Raumdetails",
  cancelText: "Abbrechen",
  saveText: "Speichern",
  loadUnitsText: "Lade Units...",
};

export const ARCHIVETEXTS = {
  arrowBack: "arrow-back",
  arrowForward: "arrow-forward",
  back: "Zurück",
  continue: "Weiter",
  confirm: "Bestätigen",
  date: "Datum",
  chipNumber: "Chipnummer",
  archive: "Archiv",
  logout: "Ausloggen",
};

export const APPOINTMENTS = {
  unknownName: "Unbekannter Name",
  unknownRace: "Unbekannte Rasse",
  noPictureAvailable: "Kein Bild vorhanden",
};

export const APPOINTMENTSMODALTEXTS = {
  headline: "Termindetails",
  noAppointmentsfound: "Keine Termine gefunden.",
  typeOfAppointmentLabelText: "Art des Termins",
  deleteAppointmentTitle: "Termin löschen",
  deleteAppointment: "Löschen",
  deleteAppointmentMessage:
    "Möchten Sie diesen Termin wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.",
  categorie: "Kategorie",
  date: "Datum",
  time: "Uhrzeit",
  notes: "Notizen",
};

export const APPOINTMENTHISTORYTEXTS = {
  historyLabel: "Historie",
  appointmentCompleted: "Termin abgehakt",
  date: "Datum:",
  hour: "Uhr",
  by: "Durch:",
  openSince: "Offen seit",
  from: "Von:",
  until: "Bis:",
  noHistoryAvailableForThisDate:
    "Für diesen Termin liegt noch keine Historie vor.",
  close: "Schließen",
};
