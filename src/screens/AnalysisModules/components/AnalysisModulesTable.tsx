import React, { useState, useEffect } from "react";
import analysisModulesService from "../../../../services/analysisModules";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip } from "@mui/material";
import { IAnalysisModule } from "../../../types/AnalisisModule";

type AnalysisModuleTableProps = {
  filterByName?: string | undefined;
  filterByVersion?: string | undefined;
};

const AnalysisModulesTable = ({
  filterByName,
  filterByVersion,
}: AnalysisModuleTableProps) => {
  const [analysisModules, setAnalysisModules] = useState<IAnalysisModule[]>([]);

  useEffect(() => {
    analysisModulesService.getAllModules().then((analisisModules) => {
      setAnalysisModules(analisisModules);
    });
  }, []);

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
            console.log("edit");
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
          onFocus={() => {}}
          onClick={() => {
            console.log("delete");
          }}
          label="Delete"
        />,
      ],
    },
  ];

  let modulesAux: IAnalysisModule[] = [];
  if (filterByName && !filterByVersion) {
    const regexp = new RegExp(`${filterByName}`, "i");
    modulesAux.push(
      ...analysisModules.filter((item) => regexp.test(item.moduleName))
    );
  }
  if (!filterByName && filterByVersion) {
    const regexp = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...analysisModules.filter((item) => regexp.test(item.moduleVersion))
    );
  }
  if (filterByName && filterByVersion) {
    const regexpName = new RegExp(`${filterByName}`, "i");
    const regexpVersion = new RegExp(`${filterByVersion}`, "i");
    modulesAux.push(
      ...analysisModules.filter(
        (item) =>
          regexpName.test(item.moduleName) &&
          regexpVersion.test(item.moduleVersion)
      )
    );
  }

  const analysisModulesToShow =
    filterByName || filterByVersion ? modulesAux : analysisModules;

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
        // checkboxSelection
      />
    </Box>
  );
};

export default AnalysisModulesTable;
