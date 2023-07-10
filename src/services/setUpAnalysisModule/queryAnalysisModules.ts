import { gql } from "@apollo/client";

export const GET_SET_UP_ANALYSIS_MODULES = gql`
  query SetUpAnalisisModules {
    setUpAnalisisModules {
      id
      name
      version
      isActive
      parameters {
        name
        value
      }
    }
  }
`;

export const GET_SET_UP_ANALYSIS_MODULE = gql`
  query SetUpAnalysisModule($analysisModuleId: ID!) {
    setUpAnalysisModule(analysisModuleId: $analysisModuleId) {
      id
      name
      version
      isActive
      parameters {
        name
        value
      }
    }
  }
`;
