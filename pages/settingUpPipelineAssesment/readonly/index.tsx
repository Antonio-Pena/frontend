import React from "react";
import ReadOnlySetUpAnalysisModule from "../../../src/screens/PipelineAssesments/SettingUpAnalysisModule/ReadOnly/Container";
import { useRouter } from "next/router";

const ReadSetUpAnalysisModule = () => {
  const router = useRouter();
  const { pipelineId, setUpModuleId } = router.query;
  const pipelineSelectedId = pipelineId ? (pipelineId as string) : "";
  const setUpAnalysisModuleId = setUpModuleId ? (setUpModuleId as string) : "";
  return (
    <ReadOnlySetUpAnalysisModule
      setUpAnalysisModuleId={setUpAnalysisModuleId}
      pipelineSelectedId={pipelineSelectedId}
    />
  );
};

export default ReadSetUpAnalysisModule;
