import { gql } from "@apollo/client";

export const RUN_PIPELINE = gql`
  mutation Mutation {
    runPipeline
  }
`;

export const STOP_PIPELINE = gql`
  mutation Mutation {
    stopPipeline
  }
`;
