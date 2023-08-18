import { gql } from "@apollo/client";

export const RUN_PIPELINE = gql`
  mutation RunPipeline($runPipelineId: ID!) {
    runPipeline(id: $runPipelineId)
  }
`;

export const STOP_PIPELINE = gql`
  mutation Mutation {
    stopPipeline
  }
`;
