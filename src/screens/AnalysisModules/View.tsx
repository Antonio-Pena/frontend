import React, { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import AnalysisModulesTable from "./components/AnalysisModulesTable";
import { useRouter } from "next/router";
import CustomModal from "../../components/Modal";
import WarningIcon from "@mui/icons-material/Warning";
import analysisModulesService from "../../../services/analysisModules";
import { useFetch } from "../../hooks/useFetch";
import { IAnalysisModule } from "../../types/AnalisisModule";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALYSIS_MODULES } from "../../services/analysisModules/getAnalysisModules";
import { DELETE_ANALYSIS_MODULE } from "../../services/analysisModules/mutateAnalysisModule";

const View = () => {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByVersion, setFilterByVersion] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState<string>("");
  const [successfullDeleteMessage, setSuccessfullDeleteMessage] =
    useState<string>("");

  const router = useRouter();

  const { data, error, loading } = useQuery(GET_ANALYSIS_MODULES, {
    pollInterval: 500,
  });
  const { analysisModules }: { analysisModules: IAnalysisModule[] } =
    data || {};

  const [AnalysisModuleDelete, { error: errorDeleting }] = useMutation(
    DELETE_ANALYSIS_MODULE
  );

  const searchModuleByName = (search: string) => {
    setFilterByName(search);
  };
  const searchModuleByVersion = (search: string) => {
    setFilterByVersion(search);
  };

  const handleCreateModule = () => {
    router.push(`/analysisModules/newModule`);
  };

  const handleDeleteModule = (isDeleting: boolean, moduleId: string) => {
    setIsDeleting(isDeleting);
    setModuleIdToDelete(moduleId);
  };

  const onConfirmDeleting = () => {
    const idAux = moduleIdToDelete;
    const moduleToDelete = analysisModules?.find(
      (m: IAnalysisModule) => m.id === idAux
    );
    AnalysisModuleDelete({ variables: { analysisModuleDeleteId: idAux } });
    setIsDeleting(false);
    setSuccessfullDeleteMessage(
      `El módulo ${moduleToDelete?.name} ha sido borrado`
    );
    setTimeout(() => {
      setSuccessfullDeleteMessage("");
      router.push(`/`);
    }, 1500);
  };

  return (
    <>
      <Box
        sx={{
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: successfullDeleteMessage ? 0 : 3,
          }}
        >
          <Typography variant="h3" component="h1">
            Analysis modules
          </Typography>
        </Box>
        {successfullDeleteMessage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Alert severity="success">{successfullDeleteMessage}</Alert>
          </Box>
        )}
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
              paddingTop: successfullDeleteMessage ? "5px" : "2rem",
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
