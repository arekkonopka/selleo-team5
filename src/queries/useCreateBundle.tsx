import { gql } from '@apollo/client';

export const CREATE_BUNDLE = gql`
    mutation createBundle($record: CreateOneTagBundleInput!) {
        tagBundleCreateOne(record: $record) {
            recordId
        }
    }
`;
