import React from "react";
import { IAnalysisModule } from "../../../../types/AnalisisModule";
import ReadAnalysisModule from "./View";
import { GET_ANALYSIS_MODULE } from "../../../../services/analysisModules/getAnalysisModules";
import { useQuery } from "@apollo/client";

type Props = {
  analysisModuleId: string;
  pipelineSelectedId: string;
};

const ReadAnalysisModuleContainer = ({
  analysisModuleId,
  pipelineSelectedId,
}: Props) => {
  const {
    data: analysisModuleData,
    error,
    loading: loadingData,
  } = useQuery(GET_ANALYSIS_MODULE, {
    variables: { analysisModuleId },
    pollInterval: 500,
  });
  const {
    analysisModule: analysisModuleSelected,
  }: { analysisModule: IAnalysisModule } = analysisModuleData || {};

  return (
    <>
      <ReadAnalysisModule
        analysisModuleSelected={analysisModuleSelected}
        pipelineSelectedId={pipelineSelectedId}
      />
    </>
  );
};

export default ReadAnalysisModuleContainer;
