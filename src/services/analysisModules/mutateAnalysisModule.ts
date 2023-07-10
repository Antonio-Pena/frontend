import { DocumentNode, gql } from "@apollo/client";

export const UPDATE_ANALYSIS_MODULE = gql`
  mutation AnalysisModuleUpdate($input: UpdateAnalysisModuleInput!) {
    analysisModuleUpdate(input: $input)
  }
`;

export const CREATE_ANALYSIS_MODULE = gql`
  mutation AnalysisModuleCreate($input: CreateAnalysisModuleInput!) {
    analysisModuleCreate(input: $input)
  }
`;

export const DELETE_ANALYSIS_MODULE = gql`
  mutation AnalysisModuleDelete($analysisModuleDeleteId: ID!) {
    analysisModuleDelete(id: $analysisModuleDeleteId)
  }
`;
