import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import WarningIcon from "@mui/icons-material/Warning";
import { ISetUpAnalysisModule } from "../../../types/AnalisisModule";
import { useFetch } from "../../../hooks/useFetch";
import analysisModulesService from "../../../../services/analysisModules";
import Filter from "../../../components/Filter";
import SetAnalysisModulesTable from "../components/SetAnalysisModulesTable";
import CustomModal from "../../../components/Modal";

const View = () => {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByVersion, setFilterByVersion] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState<string>("");

  const router = useRouter();

  const { data: allSetUpModules } = useFetch<ISetUpAnalysisModule[]>(
    `/setUpAnalysisModules`,
    []
  );

  const searchModuleByName = (search: string) => {
    setFilterByName(search);
  };
  const searchModuleByVersion = (search: string) => {
    setFilterByVersion(search);
  };

  const handleAddNewModule = () => {
    router.push(`/settingAnalysisModules`);
  };

  const handleDeleteModule = (isDeleting: boolean, moduleId: string) => {
    setIsDeleting(isDeleting);
    setModuleIdToDelete(moduleId);
  };

  const onConfirmDeleting = () => {
    const idAux = moduleIdToDelete;
    const moduleToDelete = allSetUpModules.find((m) => m.id === idAux);
    const moduleAux = { ...moduleToDelete!, isActive: false };

    analysisModulesService.updateSetUpModule(idAux, moduleAux);
    setIsDeleting(false);
    window.location.reload();
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
            Setting Up an Assesment Pipeline
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
            <Box>
              <Button
                sx={{ mt: 1, mr: 1 }}
                variant="contained"
                onClick={handleAddNewModule}
              >
                ADD NEW
              </Button>
            </Box>
          </Box>

          <SetAnalysisModulesTable
            filterByName={filterByName}
            filterByVersion={filterByVersion}
            handleDelete={handleDeleteModule}
          />
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Button
              color="warning"
              sx={{ mt: 1, mr: 1 }}
              variant="contained"
              onClick={() => {}}
            >
              STOP
            </Button>
            <Button sx={{ mt: 1, mr: 1 }} variant="contained">
              EXECUTE
            </Button>
          </Box>
        </Box>
      </Box>
      {isDeleting && (
        <CustomModal
          icon={<WarningIcon />}
          title="Delete set up analysis module"
          onClose={() => {
            setIsDeleting(false);
          }}
          onConfirmAction={onConfirmDeleting}
        />
      )}
    </>
  );
};

export default View;
