import React, { useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import WarningIcon from "@mui/icons-material/Warning";
import { ISetUpAnalysisModule } from "../../../types/AnalisisModule";
import { useFetch } from "../../../hooks/useFetch";
import Filter from "../../../components/Filter";
import SetUpAnalysisModulesTable from "../components/SetUpAnalysisModulesTable";
import CustomModal from "../../../components/Modal";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_SET_UP_ANALYSIS_MODULE } from "../../../services/setUpAnalysisModule/mutateSetUpAnalysisModule";
import { GET_SET_UP_ANALYSIS_MODULES } from "../../../services/setUpAnalysisModule/queryAnalysisModules";
import {
  RUN_PIPELINE,
  STOP_PIPELINE,
} from "../../../services/execStopPipeline";

const View = ({ pipelineSelectedId }: { pipelineSelectedId?: string }) => {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByVersion, setFilterByVersion] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState<string>("");
  const [successfullDeleteMessage, setSuccessfullDeleteMessage] =
    useState<string>("");

  const router = useRouter();

  const { data, error, loading } = useQuery(GET_SET_UP_ANALYSIS_MODULES, {
    pollInterval: 500,
  });
  const {
    setUpAnalisisModules,
  }: { setUpAnalisisModules: ISetUpAnalysisModule[] } = data || {};

  const [SetUpAnalysisModuleDelete, { error: errorDeleting }] = useMutation(
    DELETE_SET_UP_ANALYSIS_MODULE
  );

  const [RunPipeline, { error: errorRunning }] = useMutation(RUN_PIPELINE);
  const [StopPipeline, { error: errorStoping }] = useMutation(STOP_PIPELINE);

  const searchModuleByName = (search: string) => {
    setFilterByName(search);
  };
  const searchModuleByVersion = (search: string) => {
    setFilterByVersion(search);
  };

  const handleAddNewModule = () => {
    router.push({
      pathname: "/settingAnalysisModules",
      query: { pipelineId: pipelineSelectedId },
    });
  };

  const handleDeleteModule = (isDeleting: boolean, moduleId: string) => {
    setIsDeleting(isDeleting);
    setModuleIdToDelete(moduleId);
  };

  const onConfirmDeleting = () => {
    const idAux = moduleIdToDelete;
    const moduleToDelete = setUpAnalisisModules.find((m) => m.id === idAux);

    SetUpAnalysisModuleDelete({
      variables: { setUpAnalysisModuleDeleteId: idAux },
    });
    setIsDeleting(false);
    setSuccessfullDeleteMessage(
      `El módulo ${moduleToDelete?.name} ha sido borrado`
    );
    setTimeout(() => {
      setSuccessfullDeleteMessage("");
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <Box
        sx={{
          padding: "3rem",
          pb: successfullDeleteMessage ? 0 : 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3" component="h1">
            Setting up an assesment pipeline
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

          <SetUpAnalysisModulesTable
            filterByName={filterByName}
            filterByVersion={filterByVersion}
            handleDelete={handleDeleteModule}
            pipelineSelectedId={pipelineSelectedId}
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
              onClick={() => StopPipeline()}
            >
              STOP
            </Button>
            <Button
              sx={{ mt: 1, mr: 1 }}
              variant="contained"
              onClick={() =>
                RunPipeline({
                  variables: { runPipelineId: pipelineSelectedId },
                })
              }
            >
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
