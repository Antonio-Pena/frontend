import { FormikHelpers } from "formik";
import React, { useState } from "react";
import {
  IAnalysisModule,
  TModuleParameter,
  TParameter,
} from "../../../types/AnalisisModule";
import CreateUpdateAnalysisModuleView from "./View";
import analysisModulesService from "../../../../services/analysisModules";
import { useRouter } from "next/router";
import { Alert, Box } from "@mui/material";
import { uuid } from "uuidv4";
import { useFetch } from "../../../hooks/useFetch";
import { createNewParameters } from "../lib/createNewParameters";

type Props = {
  isUpdatingAnalysisModule: boolean;
};
const defaultAnalysisModule: IAnalysisModule = {
  id: "",
  moduleName: "",
  moduleVersion: "",
  parameters: [],
  isActive: false,
};

const CreateUpdateAnalysisModuleContainer = ({
  isUpdatingAnalysisModule,
}: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [successfullMessage, setSuccessfullMessage] = useState<string>("");

  const { data: analysisModuleSelected } = useFetch<IAnalysisModule>(
    `/analysisModules/${id}`,
    defaultAnalysisModule
  );

  const { data: allParameters } = useFetch<TParameter[]>(`/parameters`, []);

  const handleSubmit = async (
    values: IAnalysisModule,
    { resetForm }: FormikHelpers<IAnalysisModule>
  ) => {
    const parametersToUpdateCreate = values.parameters.filter(
      (p) => p.parameterName !== ""
    );
    if (isUpdatingAnalysisModule) {
      const analisysModuleToUpdate: IAnalysisModule = {
        ...values,
        parameters: parametersToUpdateCreate,
      };
      const { error } = await analysisModulesService.updateModule(
        analisysModuleToUpdate.id,
        analisysModuleToUpdate
      );
      if (!error) {
        resetForm();
      }

      // moduleParametersToCreate.forEach(async (param) => {
      //   const parameterData = allParameters.find(
      //     (item) => item.parameterName === param
      //   ) || { id: "", parameterName: "" };
      //   const newModuleParameter: TModuleParameter = {
      //     id: uuid(),
      //     moduleId: analisysModuleToUpdate.id,
      //     parameterId: parameterData.id,
      //     parameterValue: "",
      //   };
      //   await analysisModulesService.createModuleParameter(newModuleParameter);
      // });
    } else {
      const analisysModule: IAnalysisModule = {
        ...values,
        id: uuid(),
        parameters: parametersToUpdateCreate,
        isActive: true,
      };

      const { error } = await analysisModulesService.createModule(
        analisysModule
      );
      if (!error) {
        resetForm();
      }
      // moduleParametersToCreate.forEach(async (param) => {
      //   const parameterData = allParameters.find(
      //     (item) => item.parameterName === param
      //   ) || { id: "", parameterName: "" };
      //   const newModuleParameter: TModuleParameter = {
      //     id: uuid(),
      //     moduleId: analisysModule.id,
      //     parameterId: parameterData.id,
      //     parameterValue: "",
      //   };
      //   await analysisModulesService.createModuleParameter(newModuleParameter);
      // });
    }
    createNewParameters(parametersToUpdateCreate, allParameters);
    setSuccessfullMessage(
      `Analysis module ${values.moduleName} has been ${
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
