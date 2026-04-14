export interface SectionPetSummary {
  petId: number;
  name: string;
  image: string | null;
  species: string;
}

export interface SectionOverview {
  id: number;
  name: string;
  currentPetCount: number;
  maxPetCount: number;
  pets?: SectionPetSummary[];
}

export interface LocationOverview {
  id: number;
  name: string;
  currentPetCount: number;
  sections: SectionOverview[];
}

export interface CategorizedLocationsOverview {
  [species: string]: { locations: LocationOverview[] };
}
