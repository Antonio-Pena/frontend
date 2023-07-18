import React from "react";
import SetEditAnalysisModuleView from "./View";
import { useQuery } from "@apollo/client";
import { GET_SET_UP_ANALYSIS_MODULE } from "../../../../services/setUpAnalysisModule/queryAnalysisModules";
import { ISetUpAnalysisModule } from "../../../../types/AnalisisModule";

type Props = {
  setUpAnalysisModuleId: string;
  pipelineSelectedId: string;
};

const ReadSetUpAnalysisModuleContainer = ({
  setUpAnalysisModuleId,
  pipelineSelectedId,
}: Props) => {
  const {
    data: setUpAnalysisModuleData,
    error: errorGetSetUpAnalisisModule,
    loading: loadingSetUpAnalisisModuleData,
  } = useQuery(GET_SET_UP_ANALYSIS_MODULE, {
    variables: { analysisModuleId: setUpAnalysisModuleId },
    pollInterval: 500,
  });

  const {
    setUpAnalysisModule: setUpAnalysisModuleSelected,
  }: { setUpAnalysisModule: ISetUpAnalysisModule } =
    setUpAnalysisModuleData || {};

  return (
    <>
      <SetEditAnalysisModuleView
        setAnalisisModuleSelected={setUpAnalysisModuleSelected}
        pipelineSelectedId={pipelineSelectedId}
      />
    </>
  );
};

export default ReadSetUpAnalysisModuleContainer;
