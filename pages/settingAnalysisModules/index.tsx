import React from "react";
import AnalysisModules from "../../src/screens/AnalysisModules/ModulesSelection/View";
import { useRouter } from "next/router";

const SettingPipeline = () => {
  const router = useRouter();
  const { pipelineId } = router.query;
  const pipelineSelectedId = pipelineId ? (pipelineId as string) : "";
  return <AnalysisModules pipelineSelectedId={pipelineSelectedId} />;
};

export default SettingPipeline;
