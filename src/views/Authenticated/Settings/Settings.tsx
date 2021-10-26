import "./index.scss";
import "./index.css";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  GET_TAG_BUNDLES,
  useTagBundles,
  useTagBundlesMany,
} from "../../../queries/useTagBundles";
import { Bundle } from "../../../models/Bundle";
import { ChangeEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import useAuth from '../../../hooks/useAuth';

const ASSIGN_BUNDLED_ID = gql`
  mutation assignBundleId($record: ID) {
    assignBundleId(bundleId: $record) {
      _id
      tagBundles {
        name
      }
    }
  }
`;

const UN_ASSIGN_BUNDLE_ID = gql`
  mutation unassignBundleId($record: ID) {
    unassignBundleId(bundleId: $record) {
      _id
      tagBundles {
        name
      }
    }
  }
`;

const Settings = () => {
  const {user} = useAuth();

  const [assignFunction] = useMutation(ASSIGN_BUNDLED_ID, {
    refetchQueries: [GET_TAG_BUNDLES, "getBoundles"],
  });
  const [unAssignFunction] = useMutation(UN_ASSIGN_BUNDLE_ID, {
    refetchQueries: [GET_TAG_BUNDLES, "getBoundles"],
  });
  const { data: boundle } = useTagBundles();
  const { data: boundleMany, loading: loadingBoundleMany } =
    useTagBundlesMany();

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>, item: Bundle) => {
    if (e.target.checked === false) {
      unAssignFunction({
        variables: {
          record: item._id,
        },
      });
    } else {
      assignFunction({
        variables: {
          record: item._id,
        },
      });
    }
  };
  const boundleId = boundle?.getProfile?.tagBundles.map(
    (item: any) => item._id
  );

  return (
    <div className="settings">
      <Card sx={{ width: 400, minHeight: 400, boxShadow: 3 }}>
        <CardContent>
          <Typography sx={{ fontSize: 18 }} gutterBottom>
            {user?.name}
          </Typography>
          <Box sx={{ borderBottom: 1 }}></Box>
          <Typography sx={{ fontSize: 18, margin: 2 }} gutterBottom>
            Twoje Bundle
          </Typography>
          {loadingBoundleMany ? (
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <FormGroup>
              {boundleMany?.tagBundleMany?.map(
                (item: Bundle, index: number) => (
                  <div key={index} className="bundles">
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          onChange={(e) => onChangeCheckbox(e, item)}
                          checked={boundleId?.includes(item._id) ? true : false}
                        />
                      }
                      label={item.name}
                    />
                    <Box
                      sx={{ borderBottom: 0.5, borderColor: "primary.main" }}
                    ></Box>
                  </div>
                )
              )}
            </FormGroup>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
