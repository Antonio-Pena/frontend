import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import AnalysisModulesTable from "./components/AnalysisModulesTable";
import { useRouter } from "next/router";
import { useFetch } from "../../hooks/useFetch";
import { IAnalysisModule } from "../../types/AnalisisModule";

const View = () => {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByVersion, setFilterByVersion] = useState<string>("");

  const searchModuleByName = (search: string) => {
    setFilterByName(search);
  };
  const searchModuleByVersion = (search: string) => {
    setFilterByVersion(search);
  };

  return (
    <>
      <Box
        sx={{
          padding: "3rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3" component="h1">
            Analysis Modules
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "80%",
              display: "flex",
              gap: "1rem",
              paddingTop: "2rem",
              justifyContent: { xs: "space-between" },
              mb: 2,
              mt: { xs: 2, md: 0 },
            }}
          >
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Filter
                id="byName"
                label="Filter by name:"
                onSearch={searchModuleByName}
              />
              <Filter
                id="byVersion"
                label="Filter by version:"
                onSearch={searchModuleByVersion}
              />
            </Box>
          </Box>

          <AnalysisModulesTable
            filterByName={filterByName}
            filterByVersion={filterByVersion}
          />
        </Box>
      </Box>
    </>
  );
};

export default View;
