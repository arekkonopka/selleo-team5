import { Bundle } from '../../../models/Bundle';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
    GET_MERGED_BUNDLES,
    useMergedBundles,
} from '../../../queries/useMergedBundles';
import { ASSIGN_BUNDLED_ID } from '../../../queries/useAssignBundle';
import { UNASSIGN_BUNDLE_ID } from '../../../queries/useUnassignBundle';
import { DataGrid, GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import './index.scss';
import _ from 'lodash';
import { Loader } from '../../../ui-component/Loader';
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Fab,
    TextField,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { Formik, Form, useFormik } from 'formik';
import * as yup from 'yup';
import { CREATE_BUNDLE } from '../../../queries/useCreateBundle';
import { Alert } from '@mui/lab';

const BUNDLE_COLUMNS: any[] = [
    {
        field: 'name',
        filterable: true,
        headerName: 'Name',
        flex: 2,
    },
    {
        field: 'description',
        filterable: true,
        headerName: 'Description',
        flex: 2,
    },
];

const BundlesList = () => {
    const [assignFunction, {loading: loadingAssign}] = useMutation(
        ASSIGN_BUNDLED_ID,
        {
            refetchQueries: [GET_MERGED_BUNDLES, 'getMergedBundles'],
        }
    );
    const [unassignFunction, {loading: loadingUnassign}] = useMutation(
        UNASSIGN_BUNDLE_ID,
        {
            refetchQueries: [GET_MERGED_BUNDLES, 'getMergedBundles'],
        }
    );
    const [createBundleFunction, {loading: addingBundle, error: creatingBundleError}] = useMutation(
        CREATE_BUNDLE,
        {
            refetchQueries: [GET_MERGED_BUNDLES, 'getMergedBundles']
        }
    );
    const {data: bundles, loading} = useMergedBundles();
    const rows = bundles.all.map((bundle: Bundle) => {
        return {
            id: bundle._id,
            name: bundle.name,
            description: bundle.description,
            tagsCount: bundle?.tags?.length || 0
        };
    });

    const columns: any[] = BUNDLE_COLUMNS;
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeCheckbox = (newSelection: GridSelectionModel) => {
        const changes: GridRowId[] = _.xor(selectionModel, newSelection);

        if (changes.length > 1) {
            return;
        }

        const added: GridRowId[] = _.differenceWith(newSelection, selectionModel, _.isEqual);
        const removed: GridRowId[] = _.differenceWith(selectionModel, newSelection, _.isEqual);

        if (added.length) {
            assignFunction({
                variables: {
                    record: added[0],
                },
            });
        }

        if (removed.length) {
            unassignFunction({
                variables: {
                    record: removed[0],
                },
            });
        }

        setSelectionModel(newSelection);
    };

    useEffect(() => {
        const bundleIds: string[] = bundles.my.map((item: Bundle) => item._id);
        setSelectionModel(bundleIds);
    }, [loading]);

    const theme = useTheme();

    const validationSchema = yup.object({
        name: yup
            .string()
            .trim()
            .matches(/^[a-z]+_*[a-z]+$/, 'Only lower case letters')
            .required('Name is required'),
        description: yup
            .string()
            .trim()
            .min(4, 'Description should be of minimum 4 characters length')
            .max(255, 'Description should be of maximum 255 characters length')
            .required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: { name: string, description: string }) => {
            createBundleFunction({
                variables: {
                    record: {
                        name: values.name,
                        description: values.description,
                    },
                },
            }).then(
                () => {
                    // formik.setValues({name: '', description: ''})
                    formik.resetForm();
                    handleClose();
                },
                () => {}
            );
        },
    });

    return (
        <Card
            sx={{
                border: '1px solid',
                borderColor: (theme.palette.primary as any)[200] + 75,
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
            }}
        >
            <CardContent>
                <div className="bundleListHeader">
                    <Typography variant="h3">Settings</Typography>
                    <Fab color="secondary" aria-label="add" size="small" onClick={handleClickOpen}>
                        <AddIcon/>
                    </Fab>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle><Typography>Add bundle</Typography></DialogTitle>
                        <DialogContent>
                            <Formik initialValues={formik.initialValues} onSubmit={() => {
                            }}>
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className="input">
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label="Name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </div>

                                    <div className="input">
                                        <TextField
                                            fullWidth
                                            id="description"
                                            name="description"
                                            label="Description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                        />
                                    </div>

                                    {creatingBundleError && (<Alert severity="error">An unexpected error occurred while creating bundle :(</Alert>)}
                                </Form>
                            </Formik>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} disabled={addingBundle}>Cancel</Button>
                            <Button onClick={formik.submitForm} disabled={!formik.isValid || addingBundle}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </CardContent>
            <Divider/>
            <CardContent>
                <div className="bundlesList">
                    {(loadingAssign || loadingUnassign) && <Loader/>}
                    <DataGrid
                        checkboxSelection
                        disableVirtualization={false}
                        loading={loading}
                        rows={rows}
                        columns={columns}
                        disableColumnMenu={false}
                        disableColumnSelector={true}
                        disableExtendRowFullWidth={false}
                        onSelectionModelChange={onChangeCheckbox}
                        selectionModel={selectionModel}
                        showCellRightBorder={false}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default BundlesList;
