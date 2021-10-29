import { gql, useLazyQuery } from '@apollo/client';

export const FETCH_ENTRIES = gql`
    query getEntriesForDate($date: Date) {
        entryMany(filter: { date: $date }) {
            _id
            startTime
            endTime
            date
            tag {
                name
                tagBundle {
                    name
                }
            }
        }
    }
`;

export const useWorklogEntries = (date: string | null) => {
    const [getWorklogEntries, {loading, error, data}] = useLazyQuery(FETCH_ENTRIES, {
        variables: {
            date: date
        }
    });

    return {getWorklogEntries, loading, error, data: data?.entryMany ?? []};
};
