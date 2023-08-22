import React from "react";
import { IAnalysisModule } from "../../../types/AnalisisModule";
import ReadAnalysisModule from "./View";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_ANALYSIS_MODULE } from "../../../services/analysisModules/getAnalysisModules";

const ReadAnalysisModuleContainer = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: analysisModuleData,
    error,
    loading: loadingData,
  } = useQuery(GET_ANALYSIS_MODULE, {
    variables: { analysisModuleId: id },
    pollInterval: 500,
  });
  const {
    analysisModule: analysisModuleSelected,
  }: { analysisModule: IAnalysisModule } = analysisModuleData || {};

  return (
    <>
      <ReadAnalysisModule analysisModuleSelected={analysisModuleSelected} />
    </>
  );
};

export default ReadAnalysisModuleContainer;
