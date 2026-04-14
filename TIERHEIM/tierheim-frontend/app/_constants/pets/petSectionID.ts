export interface SectionPet {
  id: number;
  chipNr: string | null;
  name: string;
  breed: string | null;
  image: string | null;
}

export interface SectionUnit {
  id: number;
  name: string;
  pets: SectionPet[];
}

export interface SectionDetail {
  id: number;
  section: string;
  units: SectionUnit[];
}
