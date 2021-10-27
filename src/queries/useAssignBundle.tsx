import { gql, useQuery } from '@apollo/client';

export const ASSIGN_BUNDLED_ID = gql`
    mutation assignBundleId($record: ID) {
        assignBundleId(bundleId: $record) {
            _id
            tagBundles {
                name
            }
        }
    }
`;

export const useAssignBundle = () => {
    const {loading, error, data} = useQuery(ASSIGN_BUNDLED_ID);

    return {loading, error, data: null};
};
