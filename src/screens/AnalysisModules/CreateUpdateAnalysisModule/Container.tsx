import { FormikHelpers } from "formik";
import React from "react";
import { IAnalysisModule } from "../../../types/AnalisisModule";
import CreateUpdateAnalysisModuleView from "./View";
import analysisModulesService from "../../../../services/analysisModules";
import { useRouter } from "next/router";

type Props = { isUpdatingAnalysisModule: boolean };

const CreateUpdateAnalysisModuleContainer = ({
  isUpdatingAnalysisModule,
}: Props) => {
  const router = useRouter();
  const handleSubmit = async (
    values: IAnalysisModule,
    { resetForm }: FormikHelpers<IAnalysisModule>
  ) => {
    const { error } = await analysisModulesService.create(values);
    if (!error) {
      resetForm();
    }
    window.alert(
      `Analysis module ${values.moduleName} has been created successfully`
    );
    router.push(`/`);
  };

  return (
    <CreateUpdateAnalysisModuleView
      isUpdatingAnalysisModule={isUpdatingAnalysisModule}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateUpdateAnalysisModuleContainer;
