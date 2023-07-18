import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowParams,
} from "@mui/x-data-grid";
import { Box, Tooltip } from "@mui/material";
import { ISetUpPipelineAssesment } from "../../../types/AnalisisModule";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GET_SET_UP_PIPELINES_ASSESMENT } from "../../../services/setUpPipelineAssesment/queriesSetUpPipelineAssesment";

type SetUpPipelineAssesmentTableProps = {
  filterByName?: string | undefined;
  filterByVersion?: string | undefined;
  handleDelete: (isDeleting: boolean, pipelineId: string) => void;
};

const SetUpPipelineAssesmentTable = ({
  filterByName,
  filterByVersion,
  handleDelete,
}: SetUpPipelineAssesmentTableProps) => {
  const router = useRouter();

  const {
    data: setUpPipelinesAssesmentData,
    error,
    loading,
  } = useQuery(GET_SET_UP_PIPELINES_ASSESMENT, {
    pollInterval: 500,
  });

  const {
    setUpPipelinesAssesment,
  }: { setUpPipelinesAssesment: ISetUpPipelineAssesment[] } =
    setUpPipelinesAssesmentData || {};

  const activeSetUpPipelinesAssesment =
    setUpPipelinesAssesment?.filter((items) => items.isActive) || [];

  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hide: true,
    },
    {
      field: "name",
      headerName: "Pipeline name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "version",
      headerName: "Pipeline version",
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
            router.push(`/settingUpPipelineAssesment/${params.id}`);
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

  let pipelineAux: ISetUpPipelineAssesment[] = [];
  if (filterByName && !filterByVersion) {
    const regexp = new RegExp(`${filterByName}`, "i");
    pipelineAux.push(
      ...activeSetUpPipelinesAssesment.filter((item) => regexp.test(item.name))
    );
  }
  if (!filterByName && filterByVersion) {
    const regexp = new RegExp(`${filterByVersion}`, "i");
    pipelineAux.push(
      ...activeSetUpPipelinesAssesment.filter((item) =>
        regexp.test(item.version)
      )
    );
  }
  if (filterByName && filterByVersion) {
    const regexpName = new RegExp(`${filterByName}`, "i");
    const regexpVersion = new RegExp(`${filterByVersion}`, "i");
    pipelineAux.push(
      ...activeSetUpPipelinesAssesment.filter(
        (item) => regexpName.test(item.name) && regexpVersion.test(item.name)
      )
    );
  }

  const pipelinesToShow =
    filterByName || filterByVersion
      ? pipelineAux
      : activeSetUpPipelinesAssesment;

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    router.push({
      pathname: "/settingUpPipelineAssesment/pipeline",
      query: { pipelineId: params.id },
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
          rows={pipelinesToShow}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={handleRowClick}
        />
      </Box>
    );
  }
};

export default SetUpPipelineAssesmentTable;
