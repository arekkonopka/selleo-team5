import { gql, useQuery } from '@apollo/client';

export const GET_ALL_BUNDLES = gql`
    query getBundleMany {
        tagBundleMany {
            name
            _id
            description
        }
    }
`;

export const useTagBundlesMany = () => {
    const {loading, error, data} = useQuery(GET_ALL_BUNDLES);

    return {loading, error, data: data?.tagBundleMany ?? []};
};
