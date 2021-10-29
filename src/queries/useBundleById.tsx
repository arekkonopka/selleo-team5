import { gql, useQuery } from '@apollo/client';

export const GET_BUNDLE_BY_ID = gql`
    query getBundleMany($id: MongoID!) {
        getProfile {
            _id
        }
        tagBundleMany(filter: {_id: $id}) {
            name
            _id
            description
            creatorId
        }
    }
`;

export const useBundleById = (bundleId: string) => {
    const {loading, error, data} = useQuery(GET_BUNDLE_BY_ID, {
        variables: {
            id: bundleId,
        }
    });

    return {loading, error, data: data?.tagBundleMany[0] ?? [], profileId: data?.getProfile?._id};
};
