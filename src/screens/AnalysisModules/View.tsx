import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import AnalysisModulesTable from "./components/AnalysisModulesTable";
import { useRouter } from "next/router";
import CustomModal from "../../components/Modal";
import WarningIcon from "@mui/icons-material/Warning";
import analysisModulesService from "../../../services/analysisModules";
import { useFetch } from "../../hooks/useFetch";
import { IAnalysisModule } from "../../types/AnalisisModule";

const View = () => {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByVersion, setFilterByVersion] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState<string>("");

  const router = useRouter();

  const { data: allModules } = useFetch<IAnalysisModule[]>(
    `/analysisModules`,
    []
  );

  const searchModuleByName = (search: string) => {
    setFilterByName(search);
  };
  const searchModuleByVersion = (search: string) => {
    setFilterByVersion(search);
  };

  const handleCreateModule = () => {
    router.push(`/analisisModules/newModule`);
  };

  const handleDeleteModule = (isDeleting: boolean, moduleId: string) => {
    setIsDeleting(isDeleting);
    setModuleIdToDelete(moduleId);
  };

  const onConfirmDeleting = () => {
    const idAux = moduleIdToDelete;
    const moduleToDelete = allModules.find((m) => m.id === idAux);
    const moduleAux = { ...moduleToDelete!, isActive: false };

    analysisModulesService.updateModule(idAux, moduleAux);
    setIsDeleting(false);
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
            <Box>
              <Button
                sx={{ mt: 1, mr: 1 }}
                variant="contained"
                onClick={handleCreateModule}
              >
                CREATE MODULE
              </Button>
            </Box>
          </Box>

          <AnalysisModulesTable
            filterByName={filterByName}
            filterByVersion={filterByVersion}
            handleDelete={handleDeleteModule}
          />
        </Box>
      </Box>
      {isDeleting && (
        <CustomModal
          icon={<WarningIcon />}
          title="Delete analysis module"
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
