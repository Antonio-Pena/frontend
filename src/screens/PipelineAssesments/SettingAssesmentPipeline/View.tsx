import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import WarningIcon from "@mui/icons-material/Warning";
import { ISetUpAnalysisModule } from "../../../types/AnalisisModule";
import { useFetch } from "../../../hooks/useFetch";
import Filter from "../../../components/Filter";
import SetUpAnalysisModulesTable from "../components/SetUpAnalysisModulesTable";
import CustomModal from "../../../components/Modal";
import { useMutation } from "@apollo/client";
import { DELETE_SET_UP_ANALYSIS_MODULE } from "../../../services/setUpAnalysisModule/mutateSetUpAnalysisModule";

const View = () => {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByVersion, setFilterByVersion] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState<string>("");
  const [successfullDeleteMessage, setSuccessfullDeleteMessage] =
    useState<string>("");

  const router = useRouter();

  const { data: allSetUpModules } = useFetch<ISetUpAnalysisModule[]>(
    `/setUpAnalysisModules`,
    []
  );

  const [SetUpAnalysisModuleDelete, { error: errorDeleting }] = useMutation(
    DELETE_SET_UP_ANALYSIS_MODULE
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

          <SetUpAnalysisModulesTable
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
