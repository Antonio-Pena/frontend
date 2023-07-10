import { DocumentNode, gql } from "@apollo/client";

export const GET_PARAMETERS = gql`
  query Parameters {
    parameters {
      id
      name
    }
  }
`;
