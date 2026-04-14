import { Box, Stack } from "@mui/material";
import SearchBar from "@/components/TabNavigation/SearchBar";
import TabNavigation from "@/components/TabNavigation/TabNavigation";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { EPAGES } from "@app/_constants/Pages";
import { NAVIGATIONTAB_KEYS } from "@app/_constants/Tabs";
import { useScreenSize } from "@app/_util/useScreenSize";

interface HeaderProps {
  onSearch: (q: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { isTablet, isLargeDesktop, isMobile } = useScreenSize();

  const logoSrc = !isLargeDesktop
    ? "/tierheim/Tierheim_Logo_Mobil.svg"
    : "/tierheim/Tierheim_Logo_Desktop.svg";

  const navData = [
    {
      key: NAVIGATIONTAB_KEYS[0],
      path: EPAGES.APPOINTMENTS,
    },
    { key: NAVIGATIONTAB_KEYS[1], path: EPAGES.ANIMALS },
    { key: NAVIGATIONTAB_KEYS[2], path: EPAGES.OCCUPANCY },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: isTablet ? 0 : 5,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          display: "grid",
          gap: "0.5rem",
          mx: isMobile ? 2 : 0,
          gridTemplateColumns: isTablet ? "1fr auto" : "1fr auto 1fr",
          alignItems: "center",
          flexDirection: "column",
          height: { xs: "4rem", sm: "4.5rem", md: "4.75rem", lg: "5rem" },
        }}
      >
        {!isTablet && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {logoSrc && (
              <Image
                src={logoSrc}
                alt="Tierheim Logo"
                style={{ objectFit: "contain" }}
                width={!isLargeDesktop ? 200 : 375}
                height={!isLargeDesktop ? 64 : 80}
                priority
              />
            )}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabNavigation
            tabsEnabled={true}
            activeTab={navData.findIndex((item) =>
              pathname.startsWith(item.path),
            )}
            onTabClick={(key) => {
              const navItem = navData.find(
                (item) => item.key.toLowerCase() === key.toLowerCase(),
              );
              if (navItem) {
                router.push(navItem.path);
              }
            }}
          />
        </Box>
        <Box
          sx={{
            height: isMobile ? "41px" : "50px",
            minWidth: isMobile ? "41px" : "50px",
            display: "flex",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          <SearchBar onSearch={onSearch} mobileMode="icon" debounceMs={120} />
        </Box>
      </Stack>
    </Box>
  );
}
