import { FormikHelpers } from "formik";
import React, { useState } from "react";
import {
  ISetUpPipelineAssesment,
  IUpdateCreatePipeline,
} from "../../../types/AnalisisModule";
import CreateUpdatePipelineView from "./View";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SET_UP_PIPELINE_ASSESMENT } from "../../../services/setUpPipelineAssesment/queriesSetUpPipelineAssesment";
import {
  CREATE_SET_UP_PIPELINE_ASSESMENT,
  UPDATE_SET_UP_PIPELINE_ASSESMENT,
} from "../../../services/setUpPipelineAssesment/mutateSetUpPipelineAssesment";

type Props = {
  isUpdatingPipeline: boolean;
};

const CreateUpdatePipelineContainer = ({ isUpdatingPipeline }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [successfullMessage, setSuccessfullMessage] = useState<string>("");

  const {
    data: pipelineAssesmentData,
    error,
    loading: loadingData,
  } = useQuery(GET_SET_UP_PIPELINE_ASSESMENT, {
    variables: { pipelineAssesmentId: id },
  });
  const {
    setUpPipelineAssesment: setUpPipelineSelected,
  }: { setUpPipelineAssesment: ISetUpPipelineAssesment } =
    pipelineAssesmentData || {};
  const [
    SetUpPipelineAssesmentUpdate,
    { data: dataUpdated, loading, error: errorUpdating },
  ] = useMutation(UPDATE_SET_UP_PIPELINE_ASSESMENT);

  const [
    SetUpPipelineAssesmentCreate,
    { data: dataCreated, loading: loadingCreation, error: errorCreating },
  ] = useMutation(CREATE_SET_UP_PIPELINE_ASSESMENT);

  const handleSubmit = async (
    values: ISetUpPipelineAssesment,
    { resetForm }: FormikHelpers<ISetUpPipelineAssesment>
  ) => {
    const { id, name, version } = values;

    if (isUpdatingPipeline) {
      const pipelineToUpdate: IUpdateCreatePipeline = {
        id,
        name,
        version,
      };

      SetUpPipelineAssesmentUpdate({
        variables: { input: pipelineToUpdate },
      });

      // if (!errorUpdating) {
      //   resetForm();
      // }
    } else {
      const pipelineToCreate: IUpdateCreatePipeline = {
        id: uuid(),
        name,
        version,
      };

      SetUpPipelineAssesmentCreate({
        variables: { input: pipelineToCreate },
      });

      // if (!error) {
      //   resetForm();
      // }
    }
    setSuccessfullMessage(
      `Pipeline assesment ${values.name} has been ${
        isUpdatingPipeline ? "updated" : "created"
      } successfully`
    );
    setTimeout(() => {
      setSuccessfullMessage("");
      router.push(`/settingUpPipelineAssesment`);
    }, 1000);
  };

  return (
    <>
      <CreateUpdatePipelineView
        pipelineSelected={setUpPipelineSelected}
        isUpdatingPipeline={isUpdatingPipeline}
        handleSubmit={handleSubmit}
        successfullMessage={successfullMessage}
      />
    </>
  );
};

export default CreateUpdatePipelineContainer;
