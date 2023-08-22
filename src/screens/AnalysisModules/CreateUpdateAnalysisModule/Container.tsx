import { FormikHelpers } from "formik";
import React, { useState } from "react";
import {
  IAnalysisModule,
  IUpdateCreateAnalysisModule,
} from "../../../types/AnalisisModule";
import CreateUpdateAnalysisModuleView from "./View";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALYSIS_MODULE } from "../../../services/analysisModules/getAnalysisModules";
import {
  CREATE_ANALYSIS_MODULE,
  UPDATE_ANALYSIS_MODULE,
} from "../../../services/analysisModules/mutateAnalysisModule";

type Props = {
  isUpdatingAnalysisModule: boolean;
};
const defaultAnalysisModule: IAnalysisModule = {
  id: "",
  name: "",
  version: "",
  parameters: [],
  isActive: false,
};

const CreateUpdateAnalysisModuleContainer = ({
  isUpdatingAnalysisModule,
}: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [successfullMessage, setSuccessfullMessage] = useState<string>("");

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

  const [
    AnalysisModuleUpdate,
    { data: dataUpdated, loading, error: errorUpdating },
  ] = useMutation(UPDATE_ANALYSIS_MODULE);

  const [
    AnalysisModuleCreate,
    { data: dataCreated, loading: loadingCreation, error: errorCreating },
  ] = useMutation(CREATE_ANALYSIS_MODULE);

  const handleSubmit = async (
    values: IAnalysisModule,
    { resetForm }: FormikHelpers<IAnalysisModule>
  ) => {
    const { id, name, version, parameters } = values;

    const parametersToUpdateCreate = parameters!
      .filter((p) => p.name !== "")
      .map((item) => item.name);
    if (isUpdatingAnalysisModule) {
      const analisysModuleToUpdate: IUpdateCreateAnalysisModule = {
        id,
        name,
        version,
        parameters: parametersToUpdateCreate,
      };

      AnalysisModuleUpdate({ variables: { input: analisysModuleToUpdate } });

      // if (!errorUpdating) {
      //   resetForm();
      // }
    } else {
      const analisysModuleToCreate: IUpdateCreateAnalysisModule = {
        id: uuid(),
        name,
        version,
        parameters: parametersToUpdateCreate,
      };

      AnalysisModuleCreate({
        variables: { input: analisysModuleToCreate },
      });

      // if (!errorCreating) {
      //   resetForm();
      // }
    }
    setSuccessfullMessage(
      `Analysis module ${values.name} has been ${
        isUpdatingAnalysisModule ? "updated" : "created"
      } successfully`
    );
    setTimeout(() => {
      setSuccessfullMessage("");
      router.push(`/`);
    }, 1000);
  };

  return (
    <>
      <CreateUpdateAnalysisModuleView
        analysisModuleSelected={analysisModuleSelected}
        isUpdatingAnalysisModule={isUpdatingAnalysisModule}
        handleSubmit={handleSubmit}
        successfullMessage={successfullMessage}
      />
    </>
  );
};

export default CreateUpdateAnalysisModuleContainer;
