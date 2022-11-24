import React, { useState, useEffect } from "react";
import analysisModulesService from "../../../../services/analysisModules";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface AnalysisModule {
  id: string;
  moduleName: string;
  moduleVersion: string;
}

type AnalysisModuleTableProps = {
  filterByName?: string | undefined;
  filterByVersion?: string | undefined;
};

const AnalysisModulesTable = ({
  filterByName,
  filterByVersion,
}: AnalysisModuleTableProps) => {
  const [analysisModules, setAnalysisModules] = useState<AnalysisModule[]>([]);

  useEffect(() => {
    analysisModulesService.getAll().then((analisisModules) => {
      setAnalysisModules(analisisModules);
    });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "moduleName", headerName: "Module Name", width: 200 },
    { field: "moduleVersion", headerName: "Module Version", width: 200 },
    { field: "", headerName: "Update", width: 200, type: "actions" },
  ];

  let modulesAux: AnalysisModule[] = [];
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
        width: "100%",
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
