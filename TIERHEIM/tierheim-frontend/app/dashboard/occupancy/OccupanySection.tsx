"use client";

import { HouseOverview } from "@app/_components/house/houseOverview";
import { PETS } from "@app/_constants/texts/Texts";
import { DragIntentProvider } from "@app/_components/room/DragIntentContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Stack } from "@mui/material";
import {
  MouseTransition,
  MultiBackend,
  TouchTransition,
} from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { CategorizedLocationsOverview } from "@app/_constants/pets/petLocations";
import { TabContext } from "@app/_components/TabView/PetsTabs";
import { useContext, useState } from "react";
import { OpenPetPayload, PetModals } from "@app/_components/modals/petModals";
import { ContentContainer } from "@app/_components/ContentContainer";
import { SearchQueryContext } from "../SearchQueryContext";

interface OccupancySectionProps {
  locationData:
    | {
        categorizedLocations: CategorizedLocationsOverview;
      }
    | undefined;
  isLoading?: boolean;
  isError?: boolean;
}

export default function OccupancySection({
  locationData,
  isLoading,
  isError,
}: OccupancySectionProps) {
  const { overflowTabs, selectedRace } = useContext(TabContext);
  const { searchQuery } = useContext(SearchQueryContext);

  const [openPetModal, setOpenPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<OpenPetPayload>();

  const BACKENDS = {
    backends: [
      {
        id: "touch",
        backend: TouchBackend,
        options: {
          delayTouchStart: 500,
          touchSlop: 16,
          enableMouseEvents: true,
          ignoreContextMenu: true,
        },
        preview: true,
        transition: TouchTransition,
      },
      {
        id: "html5",
        backend: HTML5Backend,
        preview: true,
        transition: MouseTransition,
      },
    ],
  };

  return (
    <ContentContainer>
      <DndProvider backend={MultiBackend} options={BACKENDS}>
        <DragIntentProvider>
          <HouseOverview
            categorizedLocations={locationData?.categorizedLocations || {}}
            isLoading={isLoading || false}
            isError={isError || false}
            searchQuery={searchQuery}
            currentCategory={selectedRace || PETS.all}
            overflowTabs={overflowTabs ?? []}
            onOpenPetModal={(pet) => {
              setSelectedPet(pet);
              setOpenPetModal(true);
            }}
          />
        </DragIntentProvider>
      </DndProvider>
      {selectedPet && (
        <PetModals
          onOpen={openPetModal}
          onClose={() => {
            setOpenPetModal(false);
            setSelectedPet(undefined);
          }}
          pet={selectedPet}
        />
      )}
    </ContentContainer>
  );
}
