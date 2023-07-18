import React, { useState } from "react";
import { uuid } from "uuidv4";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";
import { Parameters } from "../../../components/ParametersImputs";
import TextInputFormik from "../../../components/TextInputFormik";
import { analysisModulesValidationSchema } from "../../../lib/validationSchema";
import {
  IAnalysisModule,
  ISetUpPipelineAssesment,
} from "../../../types/AnalisisModule";

type CreateUpdatePipelineProps = {
  isUpdatingPipeline?: boolean;
  pipelineSelected?: ISetUpPipelineAssesment | undefined;
  handleSubmit: (
    values: ISetUpPipelineAssesment,
    { resetForm }: FormikHelpers<ISetUpPipelineAssesment>
  ) => void;
  successfullMessage: string;
};

const CreateUpdatePipeline = ({
  isUpdatingPipeline,
  pipelineSelected,
  handleSubmit,
  successfullMessage,
}: CreateUpdatePipelineProps) => {
  const router = useRouter();

  const defaultPipeline: IAnalysisModule = {
    id: "",
    name: "",
    version: "",
    isActive: false,
  };

  const titleUpdateCreate = isUpdatingPipeline
    ? "Update an assesment pipeline"
    : "Create an assesment pipeline";

  const renderForm = () => {
    const initialValuesAux: IAnalysisModule = isUpdatingPipeline
      ? pipelineSelected!
      : defaultPipeline;

    const labelSubmitButton = isUpdatingPipeline
      ? "UPDATE PIPELINE"
      : "CREATE PIPELINE";

    return (
      <>
        <Formik
          initialValues={initialValuesAux}
          validationSchema={analysisModulesValidationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }: FormikProps<IAnalysisModule>) => {
            return (
              <Form>
                <TextInputFormik name="name" label="Pipeline name" />
                <TextInputFormik name="version" label="Pipeline version" />

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
          {titleUpdateCreate}
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

export default CreateUpdatePipeline;
