import React from "react";
import ReadOnlySetUpAnalysisModule from "../../../src/screens/AnalysisModules/ModulesSelection/ReadOnly/Container";
import { useRouter } from "next/router";

const ReadSetUpAnalysisModule = () => {
  const router = useRouter();
  const { pipelineId, moduleId } = router.query;
  const pipelineSelectedId = pipelineId ? (pipelineId as string) : "";
  const analysisModuleId = moduleId ? (moduleId as string) : "";
  return (
    <ReadOnlySetUpAnalysisModule
      analysisModuleId={analysisModuleId}
      pipelineSelectedId={pipelineSelectedId}
    />
  );
};

export default ReadSetUpAnalysisModule;
