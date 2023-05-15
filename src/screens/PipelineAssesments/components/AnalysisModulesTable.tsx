import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Tooltip } from "@mui/material";
import { IAnalysisModule } from "../../../types/AnalisisModule";
import { useRouter } from "next/router";
import { useFetch } from "../../../hooks/useFetch";
import Skeleton from "@mui/material/Skeleton";

type AnalysisModuleTableProps = {
  filterByName?: string | undefined;
  filterByVersion?: string | undefined;
};

const AnalysisModulesTable = ({
  filterByName,
  filterByVersion,
}: AnalysisModuleTableProps) => {
  const router = useRouter();

  const { data: analysisModules, loading } = useFetch<IAnalysisModule[]>(
    `/analysisModules`,
    []
  );

  const activeModules = analysisModules.filter((items) => items.isActive);

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hide: true,
    },
    {
      field: "moduleName",
      headerName: "Module Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "moduleVersion",
      headerName: "Module Version",
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
            router.push(`/analisisModules/${params.id}`);
          }}
          label="Edit"
        />,
      ],
    },
  ];

  let modulesAux: IAnalysisModule[] = [];
  if (filterByName && !filterByVersion) {
    const regexp = new RegExp(`${filterByName}`, "i");
    modulesAux.push(
      ...activeModules.filter((item) => regexp.test(item.moduleName))
    );
  }
  if (!filterByName && filterByVersion) {
    const regexp = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...activeModules.filter((item) => regexp.test(item.moduleVersion))
    );
  }
  if (filterByName && filterByVersion) {
    const regexpName = new RegExp(`${filterByName}`, "i");
    const regexpVersion = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...activeModules.filter(
        (item) =>
          regexpName.test(item.moduleName) &&
          regexpVersion.test(item.moduleVersion)
      )
    );
  }

  const analysisModulesToShow =
    filterByName || filterByVersion ? modulesAux : activeModules;

  if (loading) {
    return <Skeleton variant="rectangular" />;
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
        />
      </Box>
    );
  }
};

export default AnalysisModulesTable;
