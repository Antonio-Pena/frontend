import React from "react";
import SetEditAnalysisModule from "../../src/screens/PipelineAssesments/SettingUpAnalysisModule/Container";
import { useRouter } from "next/router";

const SettingUpAnalysisModule = () => {
  const router = useRouter();
  const { isEditing, moduleId, pipelineId } = router.query;
  const isEditingAnalysisModule = isEditing === "true" ? true : false;
  const analysisModuleId = moduleId ? (moduleId as string) : "";
  const pipelineSelectedId = pipelineId ? (pipelineId as string) : "";
  return (
    <>
      <SetEditAnalysisModule
        isEditingAnalysisModule={isEditingAnalysisModule}
        analysisModuleId={analysisModuleId}
        pipelineSelectedId={pipelineSelectedId}
      />
    </>
  );
};

export default SettingUpAnalysisModule;
