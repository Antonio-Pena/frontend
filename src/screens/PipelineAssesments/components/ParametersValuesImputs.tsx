import React, { useState } from "react";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { uuid } from "uuidv4";
import {
  ISetUpAnalysisModule,
  TSetUpParameter,
} from "../../../types/AnalisisModule";

type Props = {
  values: ISetUpAnalysisModule;
  setValues: (values: ISetUpAnalysisModule) => void;
  setFieldValue: (field: string, value: any) => void;
};

export const Parameters = ({ values, setValues, setFieldValue }: Props) => {
  console.log("values", values);
  const parameters = [...values?.parameters!];

  const handleChangeParameter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const parameterName = event.target.name;
    const parameterValue = event.target.value;
    const newParameter: TSetUpParameter = {
      parameterName,
      parameterValue,
    };
    parameters[Number(event.target.id)] = newParameter;
    setFieldValue("parameters", parameters);
  };
  console.log("parameters", parameters);

  return (
    <>
      <Box
        sx={{
          mt: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {parameters.map((param, i) => {
          const empty = param.parameterValue === "" ? true : false;
          return (
            <TextField
              required
              error={empty}
              sx={{ mt: "0.3rem", mb: "0.3rem" }}
              key={i}
              id={`${i}`}
              name={param.parameterName}
              label={param.parameterName}
              defaultValue={param.parameterValue}
              onChange={handleChangeParameter}
            />
          );
        })}
      </Box>
    </>
  );
};
