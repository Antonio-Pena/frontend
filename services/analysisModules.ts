import axios from "axios";

const baseUrl = "http://localhost:3001/analysisModules";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

// const create = (newAnalysisModule) => {
//   const request = axios.post(baseUrl, newPerson);
//   return request.then((res) => res.data);
// };

// const erase = (moduleId) => {
//   return axios.delete(`${baseUrl}/${id}`);
// };

// const update = (id, newAnalysisModule) => {
//   const request = axios.put(`${baseUrl}/${id}`, newPerson);
//   return request.then((res) => res.data);
// };

const analysisModulesService = { getAll };

export default analysisModulesService;
