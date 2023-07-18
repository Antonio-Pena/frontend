import React from "react";
import { Box, TextField } from "@mui/material";
import { ISetUpAnalysisModule } from "../../../types/AnalisisModule";

type Props = {
  values: ISetUpAnalysisModule;
};

export const Parameters = ({ values }: Props) => {
  const parametersAux = values?.parameters!;
  const parameters = parametersAux?.map((item) => {
    return { name: item.name, value: item.value };
  });

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
              disabled
            />
          );
        })}
      </Box>
    </>
  );
};
