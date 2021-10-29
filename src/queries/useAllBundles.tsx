import { gql, useQuery } from "@apollo/client";

export const GET_ALL_BUNDLES = gql`
    query getBundleMany {
        tagBundleMany {
            name
            _id
            description
            creatorId
        }
    }
`;

export const useAllBundles = () => {
  const { loading, error, data } = useQuery(GET_ALL_BUNDLES);

  return { loading, error, data: data?.tagBundleMany ?? [] };
};
