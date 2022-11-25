import { Box, Button, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React from "react";
import TextInputFormik from "../../../components/TextInputFormik";
import { IAnalysisModule } from "../../../types/AnalisisModule";

type CreateUpdateAnalysisModuleProps = {
  isUpdatingAnalysisModule?: boolean;
  analysisModuleSelected?: IAnalysisModule | undefined;
  handleSubmit: (
    values: IAnalysisModule,
    { setSubmitting, resetForm }: FormikHelpers<IAnalysisModule>
  ) => void;
};

const defaultAnalysisModule: IAnalysisModule = {
  id: "",
  moduleName: "",
  moduleVersion: "",
};

const CreateUpdateAnalysisModule = ({
  isUpdatingAnalysisModule,
  analysisModuleSelected,
  handleSubmit,
}: CreateUpdateAnalysisModuleProps) => {
  const titleUpdateCreate = isUpdatingAnalysisModule
    ? "Create an Analysis Module"
    : "Update an Analysis Module";

  const renderForm = () => {
    const initialValuesAux: IAnalysisModule = isUpdatingAnalysisModule
      ? analysisModuleSelected!
      : defaultAnalysisModule;

    const labelSubmitButton = isUpdatingAnalysisModule
      ? "UPDATE MODULE"
      : "CREATE MODULE";

    return (
      <Formik
        initialValues={initialValuesAux}
        // validationSchema={analysisModulesValidationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<IAnalysisModule>) => (
          <Form>
            <TextInputFormik name="moduleName" label="Module Name" />
            <TextInputFormik name="moduleVersion" label="Module Version" />

            <Box
              sx={{ display: "flex", gap: 4, justifyContent: "center", mt: 3 }}
            >
              <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                {labelSubmitButton}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };
  return (
    <Box
      sx={{
        padding: "3rem",
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
          padding: "3rem",
          mb: 2,
          mt: { xs: 2, md: 0 },
        }}
      >
        {renderForm()}
      </Box>
    </Box>
  );
};

export default CreateUpdateAnalysisModule;
