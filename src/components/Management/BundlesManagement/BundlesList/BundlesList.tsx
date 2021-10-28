import { DataGrid } from '@mui/x-data-grid';
import { useMyBundles } from '../../../../queries/useMyBundles';
import { Bundle } from '../../../../models/Bundle';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { SET_SELECTED_MANAGEMENT_BUNDLE } from '../../../../store/actions';
import { useDispatch } from 'react-redux';

const BUNDLE_COLUMNS: any[] = [
    {
        field: 'id',
        filterable: true,
        headerName: 'ID',
        sortable: false,
        width: 220,
    },
    {
        field: 'name',
        filterable: true,
        headerName: 'Name',
        width: 180,
    },
    {
        field: 'description',
        filterable: true,
        headerName: 'Description',
        width: 280,
    },
    {
        field: 'tagsCount',
        filterable: false,
        sortable: false,
        headerName: 'Tags count',
        width: 150,
    },
    {
        field: 'edit',
        filterable: false,
        headerName: 'Edit',
        sortable: false,
        renderCell: (...args: any[]) => {
            // console.log(args);
            return (
                    <IconButton aria-label="delete" size="small">
                        <EditIcon fontSize="inherit"/>
                    </IconButton>
            )
        },
        width: 100,
    },
];

export function BundlesList(): JSX.Element {
    const dispatch = useDispatch();
    const {data: bundles, loading} = useMyBundles();
    const navigate = useNavigate();
    const rows = bundles.map((bundle: Bundle) => {
        return {
            id: bundle._id,
            name: bundle.name,
            description: bundle.description,
            tagsCount: bundle?.tags?.length || 0,
            edit: bundle._id,
        };
    });
    const columns: any[] = BUNDLE_COLUMNS;

    const openRowDetails = (data: any) => {
        dispatch({type: SET_SELECTED_MANAGEMENT_BUNDLE, bundle: data})
        navigate(`/management/${data.id}`);
    }

    return (
            <div style={{height: 380, width: '100%'}}>
                <DataGrid
                        loading={loading}
                        rows={rows}
                        columns={columns}
                        disableColumnSelector={true}
                        disableExtendRowFullWidth={false}
                        onRowClick={openRowDetails}
                        showCellRightBorder={false}
                />
            </div>
    );
}
