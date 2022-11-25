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
import { Box } from "@mui/material";
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
    analysisModulesService.getAll().then((analisisModules) => {
      setAnalysisModules(analisisModules);
    });
  }, []);

  const columns: GridColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "moduleName", headerName: "Module Name", width: 200 },
    { field: "moduleVersion", headerName: "Module Version", width: 200 },
    // { field: "", headerName: "Update", width: 200, type: "actions" },
    {
      field: "actions",
      type: "actions",
      width: 180,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon />}
          onClick={() => {
            console.log("edit");
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon />}
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
