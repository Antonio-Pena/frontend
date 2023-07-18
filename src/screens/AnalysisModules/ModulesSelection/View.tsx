import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Filter from "../../../components/Filter";
import AnalysisModulesTable from "../../PipelineAssesments/components/AnalysisModulesTable";

const View = ({
  pipelineSelectedId,
}: {
  pipelineSelectedId: string | undefined;
}) => {
  const router = useRouter();

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
            Selection of analysis modules
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
            <Button
              color="warning"
              sx={{ mt: 1, mr: 1 }}
              variant="contained"
              onClick={() => {
                router.push({
                  pathname: "/settingUpPipelineAssesment/pipeline",
                  query: {
                    pipelineId: pipelineSelectedId,
                  },
                });
              }}
            >
              BACK
            </Button>
          </Box>

          <AnalysisModulesTable
            filterByName={filterByName}
            filterByVersion={filterByVersion}
            pipelineSelectedId={pipelineSelectedId}
          />
        </Box>
      </Box>
    </>
  );
};

export default View;
