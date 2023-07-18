import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { Parameters } from "../../../components/ParametersReadOnly";
import TextInputFormik from "../../../components/TextInputFormik";
import { IAnalysisModule } from "../../../types/AnalisisModule";

type Props = {
  analysisModuleSelected?: IAnalysisModule | undefined;
};

const ReadAnalysisModule = ({ analysisModuleSelected }: Props) => {
  const router = useRouter();

  const defaultAnalysisModule: IAnalysisModule = {
    id: "",
    name: "",
    version: "",
    isActive: false,
    parameters: [],
  };

  const title = `Analysis module: ${analysisModuleSelected?.name || ""}`;

  const renderForm = () => {
    const initialValuesAux: IAnalysisModule = analysisModuleSelected!;

    const labelBackButton = "BACK";

    return (
      <>
        <Formik
          initialValues={initialValuesAux}
          enableReinitialize={true}
          onSubmit={() => {}}
        >
          {({ values }: FormikProps<IAnalysisModule>) => {
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
                      router.push("/");
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

export default ReadAnalysisModule;
