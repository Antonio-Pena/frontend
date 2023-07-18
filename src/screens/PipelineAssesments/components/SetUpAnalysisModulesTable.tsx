import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip } from "@mui/material";
import { ISetUpAnalysisModule } from "../../../types/AnalisisModule";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@apollo/client";
import { GET_SET_UP_ANALYSIS_MODULES } from "../../../services/setUpAnalysisModule/queryAnalysisModules";

type AnalysisModuleTableProps = {
  filterByName?: string | undefined;
  filterByVersion?: string | undefined;
  handleDelete: (isDeleting: boolean, moduleId: string) => void;
  pipelineSelectedId?: string;
};

const SetUpAnalysisModulesTable = ({
  filterByName,
  filterByVersion,
  handleDelete,
  pipelineSelectedId,
}: AnalysisModuleTableProps) => {
  const router = useRouter();

  const {
    data: setUpAnalysisModulesData,
    error,
    loading,
  } = useQuery(GET_SET_UP_ANALYSIS_MODULES);

  const {
    setUpAnalisisModules,
  }: { setUpAnalisisModules: ISetUpAnalysisModule[] } =
    setUpAnalysisModulesData || {};

  const activeModulesInPipeline = setUpAnalisisModules?.filter(
    (items) => items.isActive && items.pipelineId === pipelineSelectedId
  );

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hide: true,
    },
    {
      field: "name",
      headerName: "Module name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "version",
      headerName: "Module version",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Operations",
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={
            <Tooltip title="Edit">
              <EditIcon />
            </Tooltip>
          }
          onClick={() => {
            router.push({
              pathname: "/settingAnalysisModules/Module",
              query: {
                isEditing: true,
                moduleId: params.id,
                pipelineId: pipelineSelectedId,
              },
            });
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          }
          onClick={() => {
            handleDelete(true, `${params.id}`);
          }}
          label="Delete"
        />,
      ],
    },
  ];

  let modulesAux: ISetUpAnalysisModule[] = [];
  if (filterByName && !filterByVersion) {
    const regexp = new RegExp(`${filterByName}`, "i");
    modulesAux.push(
      ...activeModulesInPipeline.filter((item) => regexp.test(item.name))
    );
  }
  if (!filterByName && filterByVersion) {
    const regexp = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...activeModulesInPipeline.filter((item) => regexp.test(item.version))
    );
  }
  if (filterByName && filterByVersion) {
    const regexpName = new RegExp(`${filterByName}`, "i");
    const regexpVersion = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...activeModulesInPipeline.filter(
        (item) => regexpName.test(item.name) && regexpVersion.test(item.version)
      )
    );
  }

  const analysisModulesToShow =
    filterByName || filterByVersion ? modulesAux : activeModulesInPipeline;

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    router.push({
      pathname: "/settingUpPipelineAssesment/readonly",
      query: { pipelineId: pipelineSelectedId, setUpModuleId: params.id },
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: 380,
          width: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#777777",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={1000}
          height={300}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading data...
        </Skeleton>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          height: 350,
          width: "80%",
        }}
      >
        <DataGrid
          rows={analysisModulesToShow}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={handleRowClick}
        />
      </Box>
    );
  }
};

export default SetUpAnalysisModulesTable;
