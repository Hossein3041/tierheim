import AnimalContent from "@app/_components/TabView/AnimalContent";
import { useContext, useState } from "react";
import { CategorizedPetOverview } from "@app/_constants/pets/pets";
import { OpenPetPayload, PetModals } from "@app/_components/modals/petModals";
import { TabContext } from "@app/_components/TabView/PetsTabs";
import { ContentContainer } from "@app/_components/ContentContainer";
import { SearchQueryContext } from "../SearchQueryContext";

interface AnimalsSectionProps {
  data: CategorizedPetOverview;
}

export default function AnimalsSection({ data }: AnimalsSectionProps) {
  const { searchQuery } = useContext(SearchQueryContext);
  const { overflowTabs, selectedRace } = useContext(TabContext);

  const [openPetModal, setOpenPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<OpenPetPayload>();

  const handleOpenPetModal = (pet: {
    name: string;
    breed: string;
    id: number;
    imageUrl: string;
    group: string;
  }) => {
    setSelectedPet(pet);
    setOpenPetModal(true);
  };

  const handleClosePetModal = () => {
    setOpenPetModal(false);
    setSelectedPet(undefined);
  };

  if (!data || !selectedRace) {
    return <div>Loading...</div>;
  }

  return (
    <ContentContainer>
      <AnimalContent
        categorizedPets={data.categorizedPets}
        currentCategory={selectedRace}
        overflowTabs={overflowTabs ?? []}
        isLoading={false}
        isError={false}
        onOpenPetModal={handleOpenPetModal}
        searchQuery={searchQuery}
      />
      {selectedPet && (
        <PetModals
          onOpen={openPetModal}
          onClose={handleClosePetModal}
          pet={selectedPet}
        />
      )}
    </ContentContainer>
  );
}
