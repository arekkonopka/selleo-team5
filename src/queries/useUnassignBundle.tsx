import { gql, useQuery } from '@apollo/client';

export const UNASSIGN_BUNDLE_ID = gql`
    mutation unassignBundleId($record: ID) {
        unassignBundleId(bundleId: $record) {
            _id
            tagBundles {
                name
            }
        }
    }
`;

export const useUnassignBundle = () => {
    const {loading, error, data} = useQuery(UNASSIGN_BUNDLE_ID);

    return {loading, error, data: null};
};
