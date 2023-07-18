import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Filter from "../../components/Filter";
import AnalysisModulesTable from "./components/AnalysisModulesTable";
import { useRouter } from "next/router";
import { useFetch } from "../../hooks/useFetch";
import {
  IAnalysisModule,
  ISetUpPipelineAssesment,
} from "../../types/AnalisisModule";
import SetUpPipelineAssesmentTable from "./components/SetUpPipelineAssesmentTable";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SET_UP_PIPELINES_ASSESMENT } from "../../services/setUpPipelineAssesment/queriesSetUpPipelineAssesment";
import { DELETE_SET_UP_PIPELINE_ASSESMENT } from "../../services/setUpPipelineAssesment/mutateSetUpPipelineAssesment";
import CustomModal from "../../components/Modal";
import WarningIcon from "@mui/icons-material/Warning";

const View = () => {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByVersion, setFilterByVersion] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [pipelineIdToDelete, setPipelineIdToDelete] = useState<string>("");
  const [successfullDeleteMessage, setSuccessfullDeleteMessage] =
    useState<string>("");

  const router = useRouter();

  const { data, error, loading } = useQuery(GET_SET_UP_PIPELINES_ASSESMENT);
  const {
    setUpPipelinesAssesment,
  }: { setUpPipelinesAssesment: ISetUpPipelineAssesment[] } = data || {};

  const [SetUpPipelineAssesmentDelete, { error: errorDeleting }] = useMutation(
    DELETE_SET_UP_PIPELINE_ASSESMENT
  );

  const searchPipelineByName = (search: string) => {
    setFilterByName(search);
  };
  const searchModuleByVersion = (search: string) => {
    setFilterByVersion(search);
  };

  const handleCreatePipeline = () => {
    router.push(`/settingUpPipelineAssesment/newPipeline`);
  };

  const handleDeletePipeline = (isDeleting: boolean, pipelineId: string) => {
    setIsDeleting(isDeleting);
    setPipelineIdToDelete(pipelineId);
  };

  const onConfirmDeleting = () => {
    const idAux = pipelineIdToDelete;
    const moduleToDelete = setUpPipelinesAssesment?.find(
      (m: IAnalysisModule) => m.id === idAux
    );
    SetUpPipelineAssesmentDelete({
      variables: { setUpPipelineAssesmentDeleteId: idAux },
    });
    setIsDeleting(false);
    setSuccessfullDeleteMessage(
      `El módulo ${moduleToDelete?.name} ha sido borrado`
    );
    setTimeout(() => {
      setSuccessfullDeleteMessage("");
      router.push(`/settingUpPipelineAssesment`);
    }, 1500);
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
            Assesment pipelines
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
                onSearch={searchPipelineByName}
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
                onClick={handleCreatePipeline}
              >
                CREATE PIPELINE
              </Button>
            </Box>
          </Box>

          <SetUpPipelineAssesmentTable
            filterByName={filterByName}
            filterByVersion={filterByVersion}
            handleDelete={handleDeletePipeline}
          />
        </Box>
      </Box>
      {isDeleting && (
        <CustomModal
          icon={<WarningIcon />}
          title="Delete pipeline assesment"
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
