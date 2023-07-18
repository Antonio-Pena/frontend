import { gql } from "@apollo/client";

export const CREATE_SET_UP_PIPELINE_ASSESMENT = gql`
  mutation SetUpPipelineAssesmentCreate(
    $input: CreateSetUpPipelineAssesmentInput!
  ) {
    setUpPipelineAssesmentCreate(input: $input)
  }
`;

export const UPDATE_SET_UP_PIPELINE_ASSESMENT = gql`
  mutation SetUpPipelineAssesmentUpdate(
    $input: UpdateSetUpPipelineAssesmentInput!
  ) {
    setUpPipelineAssesmentUpdate(input: $input)
  }
`;

export const DELETE_SET_UP_PIPELINE_ASSESMENT = gql`
  mutation SetUpPipelineAssesmentDelete($setUpPipelineAssesmentDeleteId: ID!) {
    setUpPipelineAssesmentDelete(id: $setUpPipelineAssesmentDeleteId)
  }
`;
