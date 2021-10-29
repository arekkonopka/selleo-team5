import { gql, useMutation } from "@apollo/client";

export const UPDATE_ENTRY = gql`
  mutation updateEntry($id: MongoID!, $record: EntryCreateTypeInput!) {
    updateEntry(_id: $id, record: $record) {
      recordId
    }
  }
`;
