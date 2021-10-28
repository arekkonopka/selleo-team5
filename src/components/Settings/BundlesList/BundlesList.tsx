import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
} from "@mui/material";
import { Bundle } from "../../../models/Bundle";
import React, { ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { MainCard } from "../../../ui-component/cards/MainCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  GET_MERGED_BUNDLES,
  useMergedBundles,
} from "../../../queries/useMergedBundles";
import { Loader } from "../../../ui-component/Loader";
import { ASSIGN_BUNDLED_ID } from "../../../queries/useAssignBundle";
import { UNASSIGN_BUNDLE_ID } from "../../../queries/useUnassignBundle";
import { GridAddIcon } from "@mui/x-data-grid";
import "./index.scss";

const BundlesList = () => {
  const [assignFunction, { loading: loadingAssign }] = useMutation(
    ASSIGN_BUNDLED_ID,
    {
      refetchQueries: [GET_MERGED_BUNDLES, "getMergedBundles"],
    }
  );
  const [unassignFunction, { loading: loadingUnassign }] = useMutation(
    UNASSIGN_BUNDLE_ID,
    {
      refetchQueries: [GET_MERGED_BUNDLES, "getMergedBundles"],
    }
  );
  const { data: bundles, loading } = useMergedBundles();

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>, item: Bundle) => {
    if (e.target.checked === false) {
      unassignFunction({
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
  const bundleIds = bundles.my.map((item: any) => item._id);

  return (
    <MainCard title="Bundles management">
      <div className="bundlesListWrapper">
        <div className="">
          {(loading || loadingAssign || loadingUnassign) && <Loader />}
        </div>
        <div className="list">
          {loading ? (
            <CircularProgress />
          ) : (
            <PerfectScrollbar
              style={{
                height: "calc(100vh - 450px)",
              }}
            >
              <div>
                <FormGroup>
                  {bundles.all.map((item: Bundle, index: number) => {
                    return (
                      <div key={index} className="bundles">
                        <FormControlLabel
                          sx={{ padding: "15px" }}
                          control={
                            <Checkbox
                              onChange={(e) => onChangeCheckbox(e, item)}
                              checked={!!bundleIds?.includes(item._id)}
                            />
                          }
                          label={item.name}
                        />
                        <Box
                          sx={{
                            borderBottom: 0.5,
                            borderColor: "primary.light",
                          }}
                        />
                      </div>
                    );
                  })}
                </FormGroup>
              </div>
            </PerfectScrollbar>
          )}
        </div>
        <div className="actions">
          <Button variant="outlined" startIcon={<GridAddIcon />}>
            Add
          </Button>
        </div>
      </div>
    </MainCard>
  );
};

export default BundlesList;
