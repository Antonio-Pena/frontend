import * as Yup from "yup";

const name = Yup.string()
  .min(5, "Name must be at least 5 characters long")
  .max(30, "Name is too long")
  .required("Name is required");

const version = Yup.string().required("Version is required");
// const parameter = Yup.string().required("Parameter name is required");

export const analysisModulesValidationSchema = Yup.object({
  name,
  version,
});
