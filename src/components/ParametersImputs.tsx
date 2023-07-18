import React, { useState } from "react";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IAnalysisModule, TParameter } from "../types/AnalisisModule";
import { useFetch } from "../hooks/useFetch";
import { uuid } from "uuidv4";
import { useQuery } from "@apollo/client";
import { GET_PARAMETERS } from "../services/parameters/getParameters";

type Props = {
  values: IAnalysisModule;
  setFieldValue: (field: string, value: any) => void;
};

export const Parameters = ({ values, setFieldValue }: Props) => {
  // const { data: allParameters } = useFetch<TParameter[]>(`/parameters`, []);

  const { data, error, loading } = useQuery(GET_PARAMETERS, {
    pollInterval: 500,
  });

  const { parameters: allParameters }: { parameters: TParameter[] } =
    data || {};

  const { parameters: parametersInValues } = values || { parameters: [] };

  const parameters = [...parametersInValues!];
  const handleAddNewParameter = () => {
    const emptyParameter: TParameter = { id: "", name: "" };
    parameters.push(emptyParameter);
    setFieldValue("parameters", parameters);
  };

  const handleChangeParameter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const newParameterName = event.target.value;
    const newParameter: TParameter = {
      id: "",
      name: newParameterName,
    };
    parameters[Number(event.target.id)] = newParameter;
    setFieldValue("parameters", parameters);

    // const parameterExists = allParameters.find(
    //   (p) => p.name === newParameterName
    // );
    // if (parameterExists) {
    //   parameters[Number(event.target.id)] = parameterExists;
    // } else {
    //   const newParameter: TParameter = {
    //     id: uuid(),
    //     name: newParameterName,
    //   };
    //   parameters[Number(event.target.id)] = newParameter;
    //   setFieldValue("parameters", parameters);
    // }
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
          return (
            <TextField
              sx={{ mt: "0.3rem", mb: "0.3rem" }}
              key={i}
              id={`${i}`}
              name="parameter"
              label="Parameter Name"
              defaultValue={param.name}
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
