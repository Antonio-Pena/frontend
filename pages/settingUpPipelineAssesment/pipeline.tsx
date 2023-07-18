import React from "react";
import View from "../../src/screens/PipelineAssesments/SettingAssesmentPipeline/View";
import { useRouter } from "next/router";

const SettingUpAnAssesmentPipeline = () => {
  const router = useRouter();
  const { pipelineId } = router.query;
  const pipelineSelectedId = pipelineId ? (pipelineId as string) : "";
  return <View pipelineSelectedId={pipelineSelectedId} />;
};

export default SettingUpAnAssesmentPipeline;
