import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import AnalysisModulesTable from "./components/AnalysisModulesTable";

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
          gap: "1rem",
          // justifyContent: { xs: "space-between" },
          alignItems: "left",
          mb: 2,
          mt: { xs: 2, md: 0 },
        }}
      >
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
      <AnalysisModulesTable
        filterByName={filterByName}
        filterByVersion={filterByVersion}
      />
    </Box>
  );
};

export default View;
