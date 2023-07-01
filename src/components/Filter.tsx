import React from "react";
import { TextField } from "@mui/material";

type FilterProps = {
  id: string;
  label: string;
  onSearch: (search: string) => void;
};

const Filter = ({ id, label, onSearch }: FilterProps) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="filled"
      size="small"
      sx={{ width: "200px" }}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
};

export default Filter;
