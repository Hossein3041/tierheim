export enum PetSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export type PlacementStatusOption = {
  id: number;
  name: "Available" | "Reserved" | "Boarding" | "AdoptionScheduled";
  displayName: string;
};

export type PrimaryBadge = "P" | "R" | null;

export interface PetData {
  id: number;
  name: string;
  chipNumber: string | null;
  image: string | null;
  birthdate: string;
  isRegistered: boolean;
  isCastrated: boolean;
  foundLocation: string | null;
  dateFound: string;
  foundDate?: string | null;
  isExtraInvoice: boolean;
  specialNotes: string | null;
  sex: PetSex;
  locationUnit: string | null;
  placementStatusId?: number | null;
  placementStatusName?: string | null;
  isActive: boolean;
  locationShortName: string;
  sectionShortName: string;

  primaryBadge?: PrimaryBadge;
  hasAttention?: boolean;
  animalReasonType?: string | null;

  species: {
    id: number;
    name: string;
  };

  breed: {
    id: number;
    name: string;
  };

  color: {
    id: number;
    name: string;
  };

  finder: {
    id: number;
    name: string;
  };

  unit?: {
    id: number;
    name: string;
  } | null;
}

export interface PetDetail {
  id: number;
  name: string;
  species: Species;
  birthdate?: string | null;
  breed?: Breed;
  color?: Color;
  sex?: string;

  finder?: {
    id: number;
    name?: string;
    address?: string;
    phone?: string;
  };

  finderId?: number;
  finderName?: string;
  foundLocation?: string;
  foundDate?: string | null;
  finderAddress?: string;
  finderPhone?: string;
  room?: Room;

  foodsInput?: string;
  medicationInput?: string;

  foods?: NameIdPair[];
  medications?: NameIdPair[];

  foodsText?: string;
  medicationText?: string;

  chipNumber?: string;
  registered?: boolean;
  neutered?: boolean;
  specialCharacteristics?: string;
  archived?: boolean;
  hasExtraInvoice?: boolean;

  placementStatusId?: number | null;
  placementStatusName?: string | null;
}

export interface Appointment {
  id: number;
  date: string;
  description: string;
}

export interface CategorizedPetOverview {
  categorizedPets: {
    category: string;
    pets: PetData[];
  }[];
}

export interface SectionOverview {
  id: number;
  name: string;
  currentPetCount: number;
  maxPetCount: number;
}

export interface LocationOverview {
  id: number;
}

export interface Species {
  id: number;
  name: string;
}
export interface Species {
  id: number;
  name: string;
}

export interface Breed {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
}

export type AddedFile = {
  addedFileName: string;
  addedFile: string;
};

export interface Room {
  id: number;
  default: boolean;
  name: string;
  section: string;
  location: string;
}

export interface NameIdPair {
  id?: string | null;
  name: string;
}

export interface PetUpdateBody {
  speciesId?: number | null;
  birthdate?: string | null;
  breedId?: number | null;
  colorId?: number | null;
  sex?: string | null;
  finderId?: number | null;
  finderPhone?: string | null;
  unitId?: number | null;

  foods?: NameIdPair[];
  medications?: NameIdPair[];

  chipNumber?: string | null;
  registered: boolean;
  neutered: boolean;
  specialCharacteristics?: string | null;
  hasExtraInvoice: boolean;
  archived: boolean;
}

export type FinderOption = {
  id: number;
  name: string;
  phone?: string;
  address?: string;
};
