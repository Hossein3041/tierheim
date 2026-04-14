import { NameIdPair, PetDetail } from "@/constants/pets/pets";

export function parseCsvToPairs(
  text: string | undefined | null,
  existing?: NameIdPair[],
): NameIdPair[] | undefined {
  if (text === undefined) return undefined;

  const trimmed = (text ?? "").trim();
  if (trimmed === "") return [];

  const names = trimmed
    .split(/[,\n;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const seen = new Set<string>();
  const uniq = names.filter((n) => {
    const k = n.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const byName = new Map(
    (existing ?? []).map((e) => [(e.name ?? "").trim().toLowerCase(), e]),
  );

  return uniq.map((n) => {
    const hit = byName.get(n.toLowerCase());
    return { id: hit?.id ?? "", name: n };
  });
}

export function toUpdateBody(pet: PetDetail): any {
  // const foodsPairs = parseCsvToPairs(pet.foodsText, pet.foods);
  // const medsPairs = parseCsvToPairs(pet.medicationText, pet.medications);

  const payload: any = {
    speciesId: pet.species?.id ?? null,
    birthdate: pet.birthdate ?? null,
    breedId: pet.breed?.id ?? null,
    colorId: pet.color?.id ?? null,
    sex: pet.sex ?? null,
    finderId: pet.finderId ?? pet.finder?.id ?? null,
    finderPhone: pet.finderPhone ?? null,
    unitId: pet.room?.id ?? null,
    foods: pet.foods?.filter(
      (food) => (food.name && food.name !== "") || (food.id && food.id !== ""),
    ),
    medications: pet.medications?.filter(
      (med) => (med.name && med.name !== "") || (med.id && med.id !== ""),
    ),

    chipNumber: pet.chipNumber ?? null,
    registered: !!pet.registered,
    neutered: !!pet.neutered,
    specialCharacteristics: pet.specialCharacteristics ?? null,
    hasExtraInvoice: !!pet.hasExtraInvoice,
    archived: !!pet.archived,
    placementStatusId: pet.placementStatusId ?? null,
  };

  return payload;
}
