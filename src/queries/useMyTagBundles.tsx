import { gql, useQuery } from '@apollo/client';

export const GET_MY_BUNDLES = gql`
    query getMyBundles {
        getProfile {
            tagBundles {
                name
                _id
            }
        }
    }
`;

export const useTagBundles = () => {
    const {loading, error, data} = useQuery(GET_MY_BUNDLES);

    return {loading, error, data: data?.getProfile?.tagBundles ?? []};
};