import { FormikHelpers } from "formik";
import React, { useState } from "react";
import {
  IAnalysisModule,
  ISetUpAnalysisModule,
  TModuleParameter,
  TParameter,
} from "../../../types/AnalisisModule";
import SetEditAnalysisModuleView from "./View";
import analysisModulesService from "../../../../services/analysisModules";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";
import { useFetch } from "../../../hooks/useFetch";

type Props = {
  isEditingAnalysisModule?: boolean;
  analysisModuleId: string;
};
const defaultAnalysisModule: IAnalysisModule = {
  id: "",
  moduleName: "",
  moduleVersion: "",
  parameters: [],
  isActive: false,
};

const SetEditAnalysisModuleContainer = ({
  isEditingAnalysisModule,
  analysisModuleId,
}: Props) => {
  const router = useRouter();
  const [successfullMessage, setSuccessfullMessage] = useState<string>("");

  const { data: analysisModuleSelected } = useFetch<IAnalysisModule>(
    `/analysisModules/${analysisModuleId}`,
    defaultAnalysisModule
  );

  const { data: allParameters } = useFetch<TParameter[]>(`/parameters`, []);

  const handleSubmit = async (
    values: ISetUpAnalysisModule,
    { resetForm }: FormikHelpers<ISetUpAnalysisModule>
  ) => {
    if (isEditingAnalysisModule) {
    } else {
      const setUpAnalisysModule: ISetUpAnalysisModule = {
        ...values,
        id: uuid(),
        isActive: true,
      };

      const { error } = await analysisModulesService.createSetUpModule(
        setUpAnalisysModule
      );
      if (!error) {
        resetForm();
      }
    }
    setSuccessfullMessage(
      `Analysis module ${values.moduleName} has been ${
        isEditingAnalysisModule ? "updated" : "set"
      } successfully`
    );
    setTimeout(() => {
      setSuccessfullMessage("");
      router.push(`/settingAnalysisModules`);
    }, 1000);
  };

  return (
    <>
      <SetEditAnalysisModuleView
        analysisModuleSelected={analysisModuleSelected}
        isEditingAnalysisModule={isEditingAnalysisModule}
        handleSubmit={handleSubmit}
        successfullMessage={successfullMessage}
      />
    </>
  );
};

export default SetEditAnalysisModuleContainer;
