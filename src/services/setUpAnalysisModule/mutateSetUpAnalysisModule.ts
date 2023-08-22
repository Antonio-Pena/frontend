import { gql } from "@apollo/client";

export const UPDATE_SET_UP_ANALYSIS_MODULE = gql`
  mutation SetUpAnalysisModuleUpdate($input: UpdateSetUpAnalysisModuleInput!) {
    setUpAnalysisModuleUpdate(input: $input)
  }
`;

export const CREATE_SET_UP_ANALYSIS_MODULE = gql`
  mutation SetUpAnalysisModuleCreate($input: CreateSetUpAnalysisModuleInput!) {
    setUpAnalysisModuleCreate(input: $input)
  }
`;

export const DELETE_SET_UP_ANALYSIS_MODULE = gql`
  mutation SetUpAnalysisModuleDelete($setUpAnalysisModuleDeleteId: ID!) {
    setUpAnalysisModuleDelete(id: $setUpAnalysisModuleDeleteId)
  }
`;
