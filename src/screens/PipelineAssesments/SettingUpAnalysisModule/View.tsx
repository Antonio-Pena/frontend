import React, { useState } from "react";
import { uuid } from "uuidv4";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";
import analysisModulesService from "../../../../services/analysisModules";
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
    moduleName: analysisModuleSelected?.moduleName!,
    moduleVersion: analysisModuleSelected?.moduleVersion!,
    isActive: false,
    parameters: analysisModuleSelected?.parameters?.map((p) => {
      return { parameterName: p.parameterName, parameterValue: "" };
    }),
  };

  const titleSetEdit = isEditingAnalysisModule
    ? "Editing an Analysis Module"
    : "Setting Up an Analysis Module";

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
            const moduleName = values.moduleName;

            return (
              <Form>
                <TextInputFormik
                  disabled
                  name="moduleName"
                  label="Module Name"
                />
                <TextInputFormik
                  disabled
                  name="moduleVersion"
                  label="Module Version"
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
                      router.push("/settingAnalysisModules");
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
