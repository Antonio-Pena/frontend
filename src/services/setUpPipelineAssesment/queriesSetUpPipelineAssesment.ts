import { gql } from "@apollo/client";

export const GET_SET_UP_PIPELINES_ASSESMENT = gql`
  query SetUpPipelinesAssesment {
    setUpPipelinesAssesment {
      id
      name
      version
      isActive
    }
  }
`;

export const GET_SET_UP_PIPELINE_ASSESMENT = gql`
  query SetUpPipelineAssesment($pipelineAssesmentId: ID!) {
    setUpPipelineAssesment(pipelineAssesmentId: $pipelineAssesmentId) {
      id
      isActive
      name
      version
    }
  }
`;
