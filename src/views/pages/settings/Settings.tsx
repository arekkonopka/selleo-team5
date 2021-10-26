import './index.scss';
import {
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {
    GET_TAG_BUNDLES,
    useTagBundles,
    useTagBundlesMany,
} from '../../../queries/useTagBundles';
import { Bundle } from '../../../models/Bundle';
import { ChangeEvent } from 'react';
import { gql, useMutation } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';
import { MainCard } from '../../../ui-component/cards/MainCard';

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
        refetchQueries: [GET_TAG_BUNDLES, 'getBoundles'],
    });
    const [unAssignFunction] = useMutation(UN_ASSIGN_BUNDLE_ID, {
        refetchQueries: [GET_TAG_BUNDLES, 'getBoundles'],
    });
    const {data: boundle} = useTagBundles();
    const {data: boundleMany, loading: loadingBoundleMany} = useTagBundlesMany();

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
            <MainCard title="Settings">
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
                                                onChange={(e) => onChangeCheckbox(e, item)}
                                                checked={!!boundleId?.includes(item._id)}
                                            />
                                        }
                                        label={item.name}
                                    />
                                    <Box sx={{borderBottom: 0.5, borderColor: 'primary.main'}}/>
                                </div>
                            )
                        )}
                    </FormGroup>
                )}
            </MainCard>
        </div>
    );
};

export default Settings;
