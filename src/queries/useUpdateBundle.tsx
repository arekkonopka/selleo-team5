import { gql, useMutation } from "@apollo/client";

export const UPDATE_BUNDLE = gql`
  mutation updateBundle($id: MongoID!, $record: UpdateByIdTagBundleInput!) {
    tagBundleUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;
// export const useUpdateBundle = (id, record) => {
//   const [assignFunction] = useMutation(ASSIGN_BUNDLED_ID, {
//     refetchQueries: [GET_MERGED_BUNDLES, 'getMergedBundles'],
// });

//   return {loading, error, data: null};
// };
