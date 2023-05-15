import React, { useState } from "react";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IAnalysisModule, TParameter } from "../types/AnalisisModule";
import { useFetch } from "../hooks/useFetch";
import { uuid } from "uuidv4";

type Props = {
  values: IAnalysisModule;
  setValues: (values: IAnalysisModule) => void;
  setFieldValue: (field: string, value: any) => void;
};

export const Parameters = ({ values, setValues, setFieldValue }: Props) => {
  const { data: allParameters, loading } = useFetch<TParameter[]>(
    `/parameters`,
    []
  );
  const parameters = [...values.parameters];
  const handleAddNewParameter = () => {
    const emptyParameter: TParameter = { id: "", parameterName: "" };
    parameters.push(emptyParameter);
    setFieldValue("parameters", parameters);
  };

  const handleChangeParameter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newParameterName = event.target.value;
    const parameterExists = allParameters.find(
      (p) => p.parameterName === newParameterName
    );
    if (parameterExists) {
      parameters[Number(event.target.id)] = parameterExists;
    } else {
      const newParameter: TParameter = {
        id: uuid(),
        parameterName: newParameterName,
      };
      parameters[Number(event.target.id)] = newParameter;
      setFieldValue("parameters", parameters);
    }
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
        {parameters.map((param, i) => {
          return (
            <TextField
              sx={{ mt: "0.3rem", mb: "0.3rem" }}
              key={i}
              id={`${i}`}
              name="parameter"
              label="Parameter Name"
              defaultValue={param.parameterName}
              onChange={handleChangeParameter}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "0.3rem",
            mb: "0.3rem",
          }}
        >
          <Tooltip title="Click to add a new parameter">
            <Button
              variant="contained"
              sx={{ height: "100%" }}
              onClick={() => {
                handleAddNewParameter();
              }}
            >
              <AddIcon></AddIcon>
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};
