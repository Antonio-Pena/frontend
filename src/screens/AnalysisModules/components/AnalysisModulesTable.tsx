import React, { useEffect } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  handleDelete: (isDeleting: boolean, moduleId: string) => void;
};

const AnalysisModulesTable = ({
  filterByName,
  filterByVersion,
  handleDelete,
}: AnalysisModuleTableProps) => {
  const router = useRouter();

  const { data, error, loading } = useQuery(GET_ANALYSIS_MODULES);

  const { analysisModules }: { analysisModules: IAnalysisModule[] } =
    data || {};

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
      headerName: "Module Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "version",
      headerName: "Module Version",
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
            router.push(`/analysisModules/${params.id}`);
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
        (item) => regexpName.test(item.name) && regexpVersion.test(item.version)
      )
    );
  }

  const analysisModulesToShow =
    filterByName || filterByVersion ? modulesAux : activeModules;

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
          height: 380,
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
