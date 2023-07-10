import * as Yup from "yup";

const name = Yup.string()
  .min(5, "Module name must be at least 5 characters long")
  .max(30, "Module name is too long")
  .required("Module name is required");

const version = Yup.string().required("Module version is required");
// const parameter = Yup.string().required("Parameter name is required");

export const analysisModulesValidationSchema = Yup.object({
  name,
  version,
});
