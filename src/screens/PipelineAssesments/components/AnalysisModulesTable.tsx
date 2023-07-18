import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowParams,
} from "@mui/x-data-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Tooltip } from "@mui/material";
import { IAnalysisModule } from "../../../types/AnalisisModule";
import { useRouter } from "next/router";
import { useFetch } from "../../../hooks/useFetch";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@apollo/client";
import { GET_ANALYSIS_MODULES } from "../../../services/analysisModules/getAnalysisModules";

type AnalysisModuleTableProps = {
  filterByName?: string | undefined;
  filterByVersion?: string | undefined;
  pipelineSelectedId?: string | undefined;
};

const AnalysisModulesTable = ({
  filterByName,
  filterByVersion,
  pipelineSelectedId,
}: AnalysisModuleTableProps) => {
  const router = useRouter();

  const {
    data: analysisModulesData,
    error,
    loading,
  } = useQuery(GET_ANALYSIS_MODULES, {
    pollInterval: 500,
  });

  const { analysisModules }: { analysisModules: IAnalysisModule[] } =
    analysisModulesData || {};

  const activeModules = analysisModules?.filter((items) => items.isActive);

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
      headerName: "Selection",
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={
            <Tooltip title="Select">
              <CheckCircleOutlineIcon />
            </Tooltip>
          }
          onClick={() => {
            router.push({
              pathname: "/settingAnalysisModules/Module",
              query: { moduleId: params.id, pipelineId: pipelineSelectedId },
            });
          }}
          label="Set"
        />,
      ],
    },
  ];

  let modulesAux: IAnalysisModule[] = [];
  if (filterByName && !filterByVersion) {
    const regexp = new RegExp(`${filterByName}`, "i");
    modulesAux.push(...activeModules.filter((item) => regexp.test(item.name)));
  }
  if (!filterByName && filterByVersion) {
    const regexp = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...activeModules.filter((item) => regexp.test(item.version))
    );
  }
  if (filterByName && filterByVersion) {
    const regexpName = new RegExp(`${filterByName}`, "i");
    const regexpVersion = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...activeModules.filter(
        (item) => regexpName.test(item.name) && regexpVersion.test(item.name)
      )
    );
  }

  const analysisModulesToShow =
    filterByName || filterByVersion ? modulesAux : activeModules;

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    router.push({
      pathname: "/settingAnalysisModules/readonly",
      query: { pipelineId: pipelineSelectedId, moduleId: params.id },
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
          height: 400,
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

export default AnalysisModulesTable;
