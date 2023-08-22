import React from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";
import TextInputFormik from "../../../components/TextInputFormik";
import { analysisModulesValidationSchema } from "../../../lib/validationSchema";
import {
  IAnalysisModule,
  ISetUpAnalysisModule,
} from "../../../types/AnalisisModule";
import { Parameters } from "../components/ParametersValuesImputs";

type SetEditAnalysisModuleProps = {
  isEditingAnalysisModule?: boolean;
  analysisModuleSelected?: IAnalysisModule | undefined;
  setAnalisisModuleSelected?: ISetUpAnalysisModule | undefined;
  handleSubmit: (
    values: ISetUpAnalysisModule,
    { setSubmitting, resetForm }: FormikHelpers<ISetUpAnalysisModule>
  ) => void;
  successfullMessage: string;
};

const SetEditAnalysisModule = ({
  isEditingAnalysisModule,
  analysisModuleSelected,
  setAnalisisModuleSelected,
  handleSubmit,
  successfullMessage,
}: SetEditAnalysisModuleProps) => {
  const router = useRouter();

  const analysisModuleInitialValues: ISetUpAnalysisModule = {
    id: "",
    name: analysisModuleSelected?.name!,
    version: analysisModuleSelected?.version!,
    isActive: false,
    parameters: analysisModuleSelected?.parameters?.map((p) => {
      return { name: p.name, value: "" };
    }),
  };

  const titleSetEdit = isEditingAnalysisModule
    ? "Editing an set up analysis module"
    : "Setting Up an analysis module";

  const renderForm = () => {
    const initialValuesAux: ISetUpAnalysisModule = isEditingAnalysisModule
      ? setAnalisisModuleSelected!
      : analysisModuleInitialValues!;

    const labelSubmitButton = isEditingAnalysisModule
      ? "UPDATE MODULE"
      : "ADD MODULE";

    return (
      <>
        <Formik
          initialValues={initialValuesAux}
          validationSchema={analysisModulesValidationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            values,
            setValues,
            setFieldValue,
          }: FormikProps<ISetUpAnalysisModule>) => {
            const moduleName = values?.name;

            return (
              <Form>
                <TextInputFormik disabled name="name" label="Module name" />
                <TextInputFormik
                  disabled
                  name="version"
                  label="Module version"
                />

                <Parameters
                  values={values}
                  setValues={setValues}
                  setFieldValue={setFieldValue}
                />
                {successfullMessage && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 3,
                    }}
                  >
                    <Alert severity="success">{successfullMessage}</Alert>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  <Button
                    color="warning"
                    sx={{ mt: 1, mr: 1 }}
                    variant="contained"
                    onClick={() => {
                      router.push("/settingUpPipelineAssesment");
                    }}
                  >
                    CANCEL
                  </Button>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    type="submit"
                    variant="contained"
                  >
                    {labelSubmitButton}
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  };
  return (
    <Box
      sx={{
        padding: "3rem 3rem 2rem 3rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" component="h1">
          {titleSetEdit}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem 3rem 3rem 3rem",
          mt: { xs: 2, md: 0 },
        }}
      >
        {renderForm()}
      </Box>
    </Box>
  );
};

export default SetEditAnalysisModule;
