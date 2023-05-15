import React from "react";
import SetEditAnalysisModule from "../../src/screens/PipelineAssesments/SettingUpAnalysisModule/Container";
import { useRouter } from "next/router";

const SettingUpAnalysisModule = () => {
  const router = useRouter();
  const { isEditing, moduleId } = router.query;
  const isEditingAnalysisModule = isEditing === "true" ? true : false;
  const analysisModuleId = moduleId ? (moduleId as string) : "";
  return (
    <>
      <SetEditAnalysisModule
        isEditingAnalysisModule={isEditingAnalysisModule}
        analysisModuleId={analysisModuleId}
      />
    </>
  );
};

export default SettingUpAnalysisModule;
