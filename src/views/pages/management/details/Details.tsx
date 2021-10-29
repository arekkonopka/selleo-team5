import React, { useEffect, useState } from 'react';
import {
    Box,
    CardContent,
    TextField,
    Typography,
    Button,
    Pagination,
    CircularProgress,
    Divider,
    Alert
} from '@mui/material';
import './index.scss';
import { useMutation } from '@apollo/client';
import { UPDATE_BUNDLE } from '../../../../queries/useUpdateBundle';
import { useTagPaginated } from '../../../../queries/usePaginationData';
import { useParams } from 'react-router';
import { useBundleById } from '../../../../queries/useBundleById';
import { MainCard } from '../../../../ui-component/cards/MainCard';
import TagIcon from '@mui/icons-material/Label';
import SaveIcon from '@mui/icons-material/Save';
import { Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    description: yup
        .string()
        .trim()
        .min(4, 'Description should be of minimum 4 characters length')
        .max(255, 'Description should be of maximum 255 characters length')
        .required('Description is required'),
});

function Details(): JSX.Element {
    const [numberPage, setNumberPage] = useState(1);
    const params = useParams();
    const {data: currentBundle, profileId, loading: loadingCurrentBundle} = useBundleById(params.id);
    const [updateBundleFunction, {loading: updatingBundle, error: updatingBundleError}] = useMutation(UPDATE_BUNDLE);
    const {loading, data: dataPagination, getTags} = useTagPaginated();
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: { name: string, description: string }) => {
            updateBundleFunction({
                variables: {
                    id: profileId,
                    record: {
                        description: values.description,
                    },
                },
            }).then(
                () => {
                    formik.setValues({name: values.name, description: values.description})
                },
                () => {
                }
            );
        },
    });

    useEffect(() => {
        if (!currentBundle) {
            return;
        }

        getTags({
            variables: {
                tagBundleId: currentBundle._id,
                page: numberPage,
            },
        });
    }, [numberPage]);

    useEffect(() => {
        if (!currentBundle) {
            return;
        }

        formik.setValues({
            name: currentBundle.name,
            description: currentBundle.description,
        })
    }, [loadingCurrentBundle]);

    if (loadingCurrentBundle) {
        return (
            <div className="detailsLoaderContainer">
                <CircularProgress size="lg"/>
            </div>
        );
    }

    const isAllowed: boolean = currentBundle.creatorId === profileId;
    const onChangePagination = (event: any, page: number) => {
        setNumberPage(page);
    };

    return (
        <div className="singleClient">
            <div className="description">
                <MainCard sx={{boxShadow: 3}} title="Details" className="detailsCard">
                    <CardContent>
                        <Formik initialValues={formik.initialValues} onSubmit={() => {
                        }}>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className="inputInDetails">
                                    <TextField
                                        fullWidth
                                        disabled={true}
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </div>

                                <div className="inputInDetails">
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

                                {updatingBundleError && (
                                    <Alert severity="error">An unexpected error occurred while updating bundle
                                        :(</Alert>)}

                                {
                                    isAllowed ? (
                                        <div className="btnContainer">
                                            <Button variant="contained" startIcon={<SaveIcon/>}
                                                    disabled={updatingBundle || !formik.isValid}
                                                    onClick={formik.submitForm}>
                                                Save
                                            </Button>
                                        </div>
                                    ) : (
                                        <Alert severity="info">Edition disabled cause you are not owner ;)</Alert>
                                    )
                                }
                            </Form>
                        </Formik>
                    </CardContent>
                </MainCard>
            </div>
            <div className="tags">
                <MainCard sx={{boxShadow: 3}} title="Tags list" className="detailsCard">
                    <CardContent>
                        {loading ? (
                            <Box sx={{textAlign: 'center'}}>
                                <CircularProgress/>
                            </Box>
                        ) : (
                            <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                <Box sx={{minHeight: '390px'}}>
                                    {dataPagination?.items?.map((item: any, index: any) => (
                                        <div key={index}>
                                            <div className="tagItem">
                                                <TagIcon className="tagItemIcon" fontSize="small"/>
                                                <Typography sx={{fontSize: 16, textAlign: 'left', marginTop: 1}}
                                                            gutterBottom>
                                                    {item.name}
                                                </Typography>
                                            </div>
                                            <Divider/>
                                        </div>
                                    ))}
                                </Box>

                                <Box
                                    sx={{
                                        flexGrow: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: 3,
                                    }}
                                >
                                    <Pagination
                                        count={dataPagination?.pageInfo?.pageCount}
                                        page={numberPage}
                                        color="primary"
                                        onChange={(e, page) => onChangePagination(e, page)}
                                        hideNextButton={!dataPagination?.pageInfo?.hasNextPage}
                                        hidePrevButton={!dataPagination?.pageInfo?.hasPreviousPage}
                                    />
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </MainCard>
            </div>
        </div>
    );
}

export default Details;
