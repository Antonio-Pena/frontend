import { FormikHelpers } from "formik";
import React, { useState } from "react";
import {
  IAnalysisModule,
  IUpdateCreateAnalysisModule,
} from "../../../types/AnalisisModule";
import ReadAnalysisModule from "./View";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALYSIS_MODULE } from "../../../services/analysisModules/getAnalysisModules";
import {
  CREATE_ANALYSIS_MODULE,
  UPDATE_ANALYSIS_MODULE,
} from "../../../services/analysisModules/mutateAnalysisModule";

const ReadAnalysisModuleContainer = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: analysisModuleData,
    error,
    loading: loadingData,
  } = useQuery(GET_ANALYSIS_MODULE, {
    variables: { analysisModuleId: id },
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
