import { gql, useMutation } from '@apollo/client';

export const REMOVE_ENTRY = gql`
    mutation removeEntry($id: MongoID!) {
        entryRemoveById(_id: $id) {
            recordId
        }
    }
`;
