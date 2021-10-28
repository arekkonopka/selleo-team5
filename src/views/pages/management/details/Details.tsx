import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
    Pagination,
    CircularProgress,
} from '@mui/material';
import './index.scss';
import { useMutation } from '@apollo/client';
import { UPDATE_BUNDLE } from '../../../../queries/useUpdateBundle';
import { useTagPaginated } from '../../../../queries/usePaginationData';
import { useSelector } from 'react-redux';
import { Bundle } from '../../../../models/Bundle';
import useAuth from '../../../../hooks/useAuth';

function Details(): JSX.Element {
    const {user} = useAuth();
    const [numberPage, setNumberPage] = useState(1);
    const [inputValue, setInputValue] = useState({});

    const currentBundle: Bundle = useSelector((state: any) => state.management.selectedBundle);
    const [updateBundle] = useMutation(UPDATE_BUNDLE);
    const {loading, data: dataPagination, getTags} = useTagPaginated();

    const onClickSubmit = (e: any) => {
        e.preventDefault();
        updateBundle({
            variables: {
                id: user?.id,
                record: inputValue,
            },
        });
        setInputValue({name: currentBundle.name, description: currentBundle.description});
    };

    const onChangePagination = (event: any, page: number) => {
        setNumberPage(page);
    };

    const isAllowed = currentBundle?.creatorId === user?.id;

    useEffect(() => {
        getTags({
            variables: {
                tagBundleId: currentBundle._id,
                page: numberPage,
            },
        });
    }, [numberPage]);

    return (
        <div className="singleClient">
            <div className="description">
                <Card sx={{width: 400, minHeight: 400, boxShadow: 3}}>
                    <CardContent>
                        <Typography
                            sx={{fontSize: 18, textAlign: 'center', marginBottom: 2}}
                            gutterBottom
                        >
                            name: {currentBundle && currentBundle.name}
                        </Typography>
                        <Box sx={{borderBottom: 1}}></Box>
                        {inputValue === currentBundle?.description ? (
                            <Typography
                                sx={{fontSize: 12, marginTop: 2}}
                                gutterBottom
                                color="red"
                            >
                                Zmień opis
                            </Typography>
                        ) : (
                            ''
                        )}
                        <TextField
                            margin="normal"
                            fullWidth
                            id="filled-multiline-static"
                            label="Twój opis"
                            multiline
                            rows={8}
                            variant="filled"
                            disabled={isAllowed}
                            onChange={(e) => setInputValue(e.target.value)}
                            value={currentBundle?.description}
                        />
                        <Box sx={{textAlign: 'right'}}>
                            <Button
                                onClick={onClickSubmit}
                                disabled={
                                    inputValue === '' || inputValue === currentBundle?.description
                                        ? true
                                        : false
                                }
                            >
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </div>
            <div className="tags">
                <Card sx={{width: 400, minHeight: 521, boxShadow: 3}}>
                    <Typography
                        sx={{fontSize: 18, textAlign: 'center', marginTop: 2}}
                        gutterBottom
                    >
                        Lista tagów:
                    </Typography>
                    <CardContent sx={{minHeight: '400px'}}>
                        {/* w jaki sposob zrobic tak zeby po nacisnieciu page przechodzilo gladko, bez ladowania */}

                        {loading ? (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                <CircularProgress/>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <Box sx={{minHeight: '390px'}}>
                                    {dataPagination?.items?.map((item: any, index: any) => (
                                        <div key={index}>
                                            <Typography
                                                sx={{fontSize: 18, textAlign: 'center', marginTop: 1}}
                                                gutterBottom
                                            >
                                                {item.name}
                                            </Typography>
                                            <Box sx={{borderBottom: 1}}></Box>
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
                </Card>
            </div>
        </div>
    );
}

export default Details;
