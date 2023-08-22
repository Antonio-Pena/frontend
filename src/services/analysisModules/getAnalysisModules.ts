import { gql } from "@apollo/client";

export const GET_ANALYSIS_MODULES = gql`
  query AnalysisModules {
    analysisModules {
      id
      isActive
      name
      version
      parameters {
        id
        name
      }
    }
  }
`;

export const GET_ANALYSIS_MODULE = gql`
  query AnalysisModule($analysisModuleId: ID!) {
    analysisModule(analysisModuleId: $analysisModuleId) {
      id
      name
      version
      parameters {
        id
        name
      }
      isActive
    }
  }
`;
