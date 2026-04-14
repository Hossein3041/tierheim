import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  InputBase,
  Modal,
  useTheme,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useScreenSize } from "@app/_util/useScreenSize";

type SearchBarProps = {
  onSearch: (q: string) => void;
  mobileMode?: "icon" | "inline";
  debounceMs?: number;
};

export default function SearchBar({
  onSearch,
  mobileMode = "icon",
  debounceMs = 100,
}: SearchBarProps) {
  const theme = useTheme();
  const { isTablet } = useScreenSize();

  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const debounceTO = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTO.current) clearTimeout(debounceTO.current);
    debounceTO.current = window.setTimeout(() => {
      onSearch(value.trim());
    }, debounceMs) as unknown as number;

    return () => {
      if (debounceTO.current) clearTimeout(debounceTO.current);
    };
  }, [value, onSearch, debounceMs]);

  useEffect(() => {
    if (open && isTablet) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [open, isTablet]);

  const inputRef = useRef<HTMLInputElement>(null);

  const searchTheme = theme.palette.searchbar;

  const submit = () => {
    if (debounceTO.current) clearTimeout(debounceTO.current);
    const q = value.trim();

    setSubmitting(true);
    onSearch(q);

    setValue("");

    window.setTimeout(() => setSubmitting(false), 500);

    if (isTablet) {
      setOpen(false);
      setIsFocused(false);
    }
  };

  const SearchField = (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "9999px",
        backgroundColor: isFocused
          ? searchTheme.activeBg
          : searchTheme.background,
        border:
          isFocused || submitting
            ? `2px solid ${searchTheme.focusBorder}`
            : `1px solid ${searchTheme.border}`,
        px: 2,
        py: 0.6,
        transition: "background-color .2s, border .2s, box-shadow .2s",
        ...(submitting && {
          boxShadow: "0 0 0 4px rgba(0,0,0,0.06)",
        }),
        "*": {
          backgroundColor: "transparent !important",
        },
      }}
    >
      <InputBase
        id={"input"}
        inputRef={inputRef}
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Suche nach Tiernamen"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{ ml: 1, flex: 1.5 }}
      />
      <IconButton
        type="submit"
        size="small"
        sx={{ p: 0.5 }}
        disabled={submitting}
      >
        {submitting ? (
          <CircularProgress size={18} thickness={5} />
        ) : (
          <SearchIcon sx={{ color: searchTheme.searchicon }} />
        )}
      </IconButton>
    </Box>
  );

  if (isTablet && mobileMode === "icon") {
    return (
      <>
        <IconButton
          onClick={() => {
            setValue("");
            setIsFocused(false);
            setOpen(true);
          }}
          sx={{
            width: "100%",
            backgroundColor: searchTheme.background,
            border: `1px solid ${searchTheme.border}`,
            transition:
              "background-color 0.2s ease-in-out, border 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: searchTheme.hover,
              borderColor: searchTheme.focusBorder,
            },
          }}
        >
          <SearchIcon
            sx={{
              color: searchTheme.searchicon,
              height: "1.6rem",
              width: "1.6rem",
            }}
          />
        </IconButton>

        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            setIsFocused(false);
          }}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 300,
              sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
            },
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -20%)",
              }}
            >
              {SearchField}
            </Box>
          </Fade>
        </Modal>
      </>
    );
  }

  return SearchField;
}
