import { FormikHelpers } from "formik";
import React, { useState } from "react";
import {
  IAnalysisModule,
  ICreateSetUpAnalysisModule,
  ISetUpAnalysisModule,
  IUpdateSetUpAnalysisModule,
} from "../../../types/AnalisisModule";
import SetEditAnalysisModuleView from "./View";
import analysisModulesService from "../../../../services/analysisModules";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";
import { useFetch } from "../../../hooks/useFetch";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALYSIS_MODULE } from "../../../services/analysisModules/getAnalysisModules";
import {
  CREATE_SET_UP_ANALYSIS_MODULE,
  UPDATE_SET_UP_ANALYSIS_MODULE,
} from "../../../services/setUpAnalysisModule/mutateSetUpAnalysisModule";
import { GET_SET_UP_ANALYSIS_MODULE } from "../../../services/setUpAnalysisModule/queryAnalysisModules";

type Props = {
  isEditingAnalysisModule?: boolean;
  analysisModuleId: string;
  pipelineSelectedId?: string | undefined;
};

const SetEditAnalysisModuleContainer = ({
  isEditingAnalysisModule,
  analysisModuleId,
  pipelineSelectedId,
}: Props) => {
  const router = useRouter();
  const [successfullMessage, setSuccessfullMessage] = useState<string>("");

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

  const {
    data: setUpAnalysisModuleData,
    error: errorGetSetUpAnalisisModule,
    loading: loadingSetUpAnalisisModuleData,
  } = useQuery(GET_SET_UP_ANALYSIS_MODULE, {
    variables: { analysisModuleId },
    pollInterval: 500,
  });
  const {
    setUpAnalysisModule: setUpAnalysisModuleSelected,
  }: { setUpAnalysisModule: ISetUpAnalysisModule } =
    setUpAnalysisModuleData || {};

  const [
    SetUpAnalysisModuleUpdate,
    { data: dataUpdated, loading, error: errorUpdating },
  ] = useMutation(UPDATE_SET_UP_ANALYSIS_MODULE);

  const [
    SetUpAnalysisModuleCreate,
    { data: dataCreated, loading: loadingCreation, error: errorCreating },
  ] = useMutation(CREATE_SET_UP_ANALYSIS_MODULE);

  const handleSubmit = async (
    values: ISetUpAnalysisModule,
    { resetForm }: FormikHelpers<ISetUpAnalysisModule>
  ) => {
    const { id, name, version, parameters } = values;

    if (isEditingAnalysisModule) {
      const setUpAnalisysModuleToUpdate: IUpdateSetUpAnalysisModule = {
        id,
        parameters,
      };
      SetUpAnalysisModuleUpdate({
        variables: { input: setUpAnalisysModuleToUpdate },
      });
    } else {
      const setUpAnalisysModuleToCreate: ICreateSetUpAnalysisModule = {
        analysisModuleId,
        parameters,
        pipelineId: pipelineSelectedId!,
      };
      SetUpAnalysisModuleCreate({
        variables: { input: setUpAnalisysModuleToCreate },
      });
    }
    setSuccessfullMessage(
      `Analysis module ${values.name} has been ${
        isEditingAnalysisModule ? "updated" : "set up"
      } successfully`
    );
    setTimeout(() => {
      setSuccessfullMessage("");
      router.push({
        pathname: "/settingUpPipelineAssesment/pipeline",
        query: { pipelineId: pipelineSelectedId },
      });
    }, 1000);
  };

  return (
    <>
      <SetEditAnalysisModuleView
        analysisModuleSelected={analysisModuleSelected}
        setAnalisisModuleSelected={setUpAnalysisModuleSelected}
        isEditingAnalysisModule={isEditingAnalysisModule}
        handleSubmit={handleSubmit}
        successfullMessage={successfullMessage}
      />
    </>
  );
};

export default SetEditAnalysisModuleContainer;
