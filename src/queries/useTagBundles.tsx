import { gql, useQuery } from "@apollo/client";

export const GET_TAG_BUNDLES = gql`
  query getBoundles {
    getProfile {
      tagBundles {
        name
        _id
      }
    }
  }
`;

export const GET_BOUNDLE_MANY = gql`
  query getBounldleMany {
    tagBundleMany {
      name
      _id
      description
    }
  }
`;

export const useTagBundles = () => {
  const { loading, error, data } = useQuery(GET_TAG_BUNDLES);

  return { loading, error, data: data ?? [] };
};

export const useTagBundlesMany = () => {
  const { loading, error, data } = useQuery(GET_BOUNDLE_MANY);

  return { loading, error, data: data ?? [] };
};
