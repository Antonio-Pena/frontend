import React from "react";
import { Box, TextField } from "@mui/material";
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
  const parametersAux = values?.parameters!;
  const parameters = parametersAux?.map((item) => {
    return { name: item.name, value: item.value };
  });

  const handleChangeParameter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("event.target", event.target.id);
    event.preventDefault();
    const parameterName = event.target.name;
    const parameterValue = event.target.value;
    console.log("parameterName", parameterName);
    console.log("parameterValue", parameterValue);
    const newParameter: TSetUpParameter = {
      name: parameterName,
      value: parameterValue,
    };
    console.log(
      "parameters[Number(event.target.id)]",
      parameters[Number(event.target.id)]
    );
    parameters[Number(event.target.id)] = newParameter;
    setFieldValue("parameters", parameters);
  };

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
        {parameters?.map((param, i) => {
          const empty = param.value === "" ? true : false;
          return (
            <TextField
              required
              error={empty}
              sx={{ mt: "0.3rem", mb: "0.3rem" }}
              key={i}
              id={`${i}`}
              name={param.name}
              label={param.name}
              defaultValue={param.value}
              onChange={handleChangeParameter}
            />
          );
        })}
      </Box>
    </>
  );
};
