import { gql } from "@apollo/client";

export const ADD_ENTRY = gql`
  mutation createEntry($record: EntryCreateTypeInput) {
    createEntry(record: $record) {
      _id
      startTime
      date
      endTime
      tag {
        name
        _id
        tagBundle {
          name
        }
      }
      order
      copied
      updatedAt
      createdAt
    }
  }
`;
