import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { NameIdPair } from "@/constants/pets/pets";

type CustomComboFieldProps = {
  id?: string;
  label: string;
  options: NameIdPair[];
  value: NameIdPair[];
  multiple?: boolean;
  freeSolo?: boolean;
  disabled?: boolean;
  onChange: (newValues: NameIdPair[]) => void;
};

const CustomComboField: React.FC<CustomComboFieldProps> = ({
  id,
  label,
  options,
  value,
  multiple = false,
  freeSolo = false,
  disabled = false,
  onChange,
}) => {
  const handleChange = (
    _event: any,
    newValue: string | NameIdPair | (string | NameIdPair)[] | null,
  ) => {
    const arr: (string | NameIdPair)[] = Array.isArray(newValue)
      ? newValue
      : newValue == null
        ? []
        : [newValue];

    const normalized: NameIdPair[] = arr
      .map((v) => {
        if (typeof v === "string") {
          const trimmed = v.trim();
          if (!trimmed) return undefined;
          return { id: "", name: trimmed } as NameIdPair;
        }
        return v;
      })
      .filter((v): v is NameIdPair => !!v);

    onChange(normalized);
  };

  return (
    <Autocomplete
      id={id}
      multiple={multiple}
      freeSolo={freeSolo}
      disabled={disabled}
      options={options}
      value={value}
      isOptionEqualToValue={(o, v) =>
        (o.id && v.id && o.id === v.id) || o.name === v.name
      }
      getOptionLabel={(option) =>
        typeof option === "string" ? option : (option.name ?? "")
      }
      filterSelectedOptions
      onChange={handleChange}
      renderOption={(props, option) => {
        const key = `${option.id || "new"}-${option.name}`;
        return (
          <li {...props} key={key}>
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
    />
  );
};
export default CustomComboField;
