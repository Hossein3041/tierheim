import type { SectionPetSummary } from "@/constants/pets/petLocations";

export interface RoomConfig {
  id: number;
  title: string;
  count: number;
  max: number;
  pets?: SectionPetSummary[];
}

export interface HouseConfig {
  id: number;
  title: string;
  rooms: RoomConfig[];
}
