import { gql, useQuery } from "@apollo/client";

export const FETCH_ENTRIES = gql`
  query getEntriesForDate($date: Date) {
    entryMany(filter: { date: $date }) {
      _id
      tag {
        name
        tagBundle {
          name
        }
      }
    }
  }
`;

export const useEntries = () => {
  const { loading, error, data } = useQuery(FETCH_ENTRIES);

  return { loading, error, data: data.entryMany ?? [] };
};
