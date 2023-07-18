import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  [x: string]: any;
}

const TextInputFormik = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      label={label}
      fullWidth
      sx={{ mt: "0.5rem", mb: "0.5rem" }}
      variant="outlined"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputLabelProps={{ shrink: field.value }}
      {...field}
      {...props}
    />
  );
};
export default memo(TextInputFormik);
