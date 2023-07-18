import React, { useState } from "react";
import { uuid } from "uuidv4";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";
import { Parameters } from "../../../components/ParametersImputs";
import TextInputFormik from "../../../components/TextInputFormik";
import { analysisModulesValidationSchema } from "../../../lib/validationSchema";
import { IAnalysisModule, TParameter } from "../../../types/AnalisisModule";

type CreateUpdateAnalysisModuleProps = {
  isUpdatingAnalysisModule?: boolean;
  analysisModuleSelected?: IAnalysisModule | undefined;
  handleSubmit: (
    values: IAnalysisModule,
    { resetForm }: FormikHelpers<IAnalysisModule>
  ) => void;
  successfullMessage: string;
};

const CreateUpdateAnalysisModule = ({
  isUpdatingAnalysisModule,
  analysisModuleSelected,
  handleSubmit,
  successfullMessage,
}: CreateUpdateAnalysisModuleProps) => {
  const router = useRouter();

  const defaultAnalysisModule: IAnalysisModule = {
    id: "",
    name: "",
    version: "",
    isActive: false,
    parameters: [],
  };

  const titleUpdateCreate = isUpdatingAnalysisModule
    ? "Update an analysis module"
    : "Create an analysis module";

  const renderForm = () => {
    const initialValuesAux: IAnalysisModule = isUpdatingAnalysisModule
      ? analysisModuleSelected!
      : defaultAnalysisModule;

    const labelSubmitButton = isUpdatingAnalysisModule
      ? "UPDATE MODULE"
      : "CREATE MODULE";

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
                <TextInputFormik name="name" label="Module name" />
                <TextInputFormik name="version" label="Module version" />

                <Parameters values={values} setFieldValue={setFieldValue} />
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
                      router.push("/");
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

export default CreateUpdateAnalysisModule;
