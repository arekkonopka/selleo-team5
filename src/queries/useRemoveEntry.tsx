import { gql, useMutation } from '@apollo/client';

export const REMOVE_ENTRY = gql`
    mutation removeEntry($id: MongoID!, $record: EntryCreateTypeInput!) {
        entryRemoveById(_id: $id) {
            recordId
        }
    }
`;
