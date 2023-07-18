import React from "react";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IAnalysisModule, TParameter } from "../types/AnalisisModule";
import { useQuery } from "@apollo/client";
import { GET_PARAMETERS } from "../services/parameters/getParameters";

type Props = {
  values: IAnalysisModule;
};

export const Parameters = ({ values }: Props) => {
  const { data, error, loading } = useQuery(GET_PARAMETERS, {
    pollInterval: 500,
  });

  const { parameters: allParameters }: { parameters: TParameter[] } =
    data || {};

  const { parameters: parametersInValues } = values || { parameters: [] };

  const parameters = [...parametersInValues!];

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
              disabled
            />
          );
        })}
      </Box>
    </>
  );
};
