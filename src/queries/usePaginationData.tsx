import { gql, useLazyQuery, useQuery } from "@apollo/client";

export const GET_ALL_TAGS = gql`
  query getPagination($tagBundleId: MongoID, $page: Int) {
    tagPagination(
      filter: { tagBundleId: $tagBundleId }
      page: $page
      perPage: 10
    ) {
      pageInfo {
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
        currentPage
      }
      count
      items {
        name
        _id
      }
    }
  }
`;

export const useTagPaginated = () => {
  const [getTags, { loading, error, data }] = useLazyQuery(GET_ALL_TAGS);

  return { loading, error, data: data?.tagPagination ?? [], getTags };
};
