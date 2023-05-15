import axios from "axios";
import {
  IAnalysisModule,
  ISetUpAnalysisModule,
  TModuleParameter,
  TParameter,
} from "../src/types/AnalisisModule";

const baseUrl = "http://localhost:3001";

//Modules
const getAllModules = () => {
  const request = axios.get(`${baseUrl}/analysisModules`);
  return request.then((res) => res.data);
};

const getModule = (id: string) => {
  const request = axios.get(`${baseUrl}/analysisModules/${id}`);
  return request.then((res) => res.data);
};

const createModule = (newAnalysisModule: IAnalysisModule) => {
  const request = axios.post(`${baseUrl}/analysisModules`, newAnalysisModule);
  return request.then((res) => {
    console.log("creado");
    return res.data;
  });
};

const updateModule = async (
  id: string,
  updatedAnalysisModule: IAnalysisModule
) => {
  const request = axios.put(
    `${baseUrl}/analysisModules/${id}`,
    updatedAnalysisModule
  );

  return request
    .then((res) => res.data)
    .catch((err) => {
      console.log("Err: ", err);
    });
};

//Parameters
const getAllParameters = () => {
  const request = axios.get(`${baseUrl}/parameters`);
  return request.then((res) => res.data);
};
const getParameter = (id: string) => {
  const request = axios.get(`${baseUrl}/parameters/${id}`);
  return request.then((res) => res.data);
};

const createParameter = (newParameter: TParameter) => {
  const request = axios.post(`${baseUrl}/parameters`, newParameter);
  return request
    .then((res) => res.data)
    .catch((err) => console.log("ErrorParam", err));
};

//moduleParameters
const getAllModuleParameters = () => {
  const request = axios.get(`${baseUrl}/moduleParameters`);
  return request.then((res) => res.data);
};

const createModuleParameter = (newModuleParameter: TModuleParameter) => {
  const request = axios.post(`${baseUrl}/moduleParameters`, newModuleParameter);
  return request.then((res) => res.data);
};

const eraseModuleParameter = (id: string) => {
  return axios.delete(`${baseUrl}/moduleParameters/${id}`);
};

const updateModuleParameter = (
  id: string,
  moduleParameter: TModuleParameter
) => {
  const request = axios.put(
    `${baseUrl}/analisisModules/${id}`,
    moduleParameter
  );
  return request.then((res) => res.data);
};

//SetUpModules
// const getAllSetUpModules = () => {
//   const request = axios.get(`${baseUrl}/analysisModules`);
//   return request.then((res) => res.data);
// };

// const getSetUpModule = (id: string) => {
//   const request = axios.get(`${baseUrl}/analysisModules/${id}`);
//   return request.then((res) => res.data);
// };

const createSetUpModule = (newSetUpAnalysisModule: ISetUpAnalysisModule) => {
  const request = axios.post(
    `${baseUrl}/setUpAnalysisModules`,
    newSetUpAnalysisModule
  );
  return request.then((res) => {
    console.log("creado");
    return res.data;
  });
};

// const updateSetUpModule = async (
//   id: string,
//   updatedAnalysisModule: IAnalysisModule
// ) => {
//   const request = axios.put(
//     `${baseUrl}/analysisModules/${id}`,
//     updatedAnalysisModule
//   );

//   return request
//     .then((res) => res.data)
//     .catch((err) => {
//       console.log("Err: ", err);
//     });
// };

const analysisModulesService = {
  getAllModules,
  getModule,
  createModule,
  updateModule,
  getAllParameters,
  getParameter,
  createParameter,
  getAllModuleParameters,
  createModuleParameter,
  eraseModuleParameter,
  updateModuleParameter,
  createSetUpModule,
};

export default analysisModulesService;
