import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { ISetUpAnalysisModule } from "../../../../types/AnalisisModule";
import TextInputFormik from "../../../../components/TextInputFormik";
import { Parameters } from "../../components/ParametersReadOnly";

type Props = {
  setAnalisisModuleSelected: ISetUpAnalysisModule;
  pipelineSelectedId: string;
};

const SetEditAnalysisModule = ({
  setAnalisisModuleSelected,
  pipelineSelectedId,
}: Props) => {
  const router = useRouter();

  const title = `Set up analysis module: ${
    setAnalisisModuleSelected?.name || ""
  }`;

  const renderForm = () => {
    const initialValuesAux: ISetUpAnalysisModule = setAnalisisModuleSelected!;
    const labelBackButton = "BACK";

    return (
      <>
        <Formik
          initialValues={initialValuesAux}
          enableReinitialize={true}
          onSubmit={() => {}}
        >
          {({ values }: FormikProps<ISetUpAnalysisModule>) => {
            const moduleName = values?.name;

            return (
              <Form>
                <TextInputFormik disabled name="name" label="Module name" />
                <TextInputFormik
                  disabled
                  name="version"
                  label="Module version"
                />

                <Parameters values={values} />
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
                      router.push({
                        pathname: "/settingUpPipelineAssesment/pipeline",
                        query: { pipelineId: pipelineSelectedId },
                      });
                    }}
                  >
                    {labelBackButton}
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
          {title}
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
