import { gql, useQuery } from "@apollo/client";

export const GET_MERGED_BUNDLES = gql`
  query getMergedBundles {
    getProfile {
      _id
      tagBundles {
        name
        _id
      }
    }
    tagBundleMany {
      name
      _id
      description
    }
  }
`;

export const useMergedBundles = () => {
  const { loading, error, data } = useQuery(GET_MERGED_BUNDLES);

  return {
    loading,
    error,
    data: {
      my: data?.getProfile?.tagBundles ?? [],
      all: data?.tagBundleMany ?? [],
    },
    profileId: data?.getProfile?._id ?? ''
  };
};
