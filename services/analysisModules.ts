import axios from "axios";
import {
  IAnalysisModule,
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
  return request.then((res) => res.data);
};

const eraseModule = (id: string) => {
  return axios.delete(`${baseUrl}/analisisModules/${id}`);
};

const updateModule = (id: string, AnalysisModule: IAnalysisModule) => {
  const request = axios.put(`${baseUrl}/analisisModules/${id}`, AnalysisModule);
  return request.then((res) => res.data);
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
  return request.then((res) => res.data);
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

const eraseModuleParameter = (moduleId: string) => {
  return axios.delete(`${baseUrl}/analisisModules?moduleId=${moduleId}`);
};

const updateModuleParameter = (
  moduleId: string,
  moduleParameter: TModuleParameter
) => {
  const request = axios.put(
    `${baseUrl}/analisisModules?moduleId=${moduleId}`,
    moduleParameter
  );
  return request.then((res) => res.data);
};

const analysisModulesService = {
  getAllModules,
  getModule,
  createModule,
  eraseModule,
  updateModule,
  getAllParameters,
  getParameter,
  createParameter,
  getAllModuleParameters,
  createModuleParameter,
  eraseModuleParameter,
  updateModuleParameter,
};

export default analysisModulesService;
