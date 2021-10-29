import { DataGrid } from '@mui/x-data-grid';
import { useMyBundles } from '../../../../queries/useMyBundles';
import { Bundle } from '../../../../models/Bundle';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const BUNDLE_COLUMNS: any[] = [
    {
        field: 'id',
        filterable: true,
        headerName: 'ID',
        sortable: false,
        flex: 1,
    },
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
    {
        field: 'tagsCount',
        filterable: false,
        sortable: false,
        headerName: 'Tags count',
        flex: 1,
    },
];

export function BundlesList(): JSX.Element {
    const {data: bundles, loading} = useMyBundles();
    const navigate = useNavigate();
    const rows = bundles.map((bundle: Bundle) => {
        return {
            id: bundle._id,
            name: bundle.name,
            description: bundle.description,
            tagsCount: bundle?.tags?.length || 0
        };
    });
    const columns: any[] = BUNDLE_COLUMNS;

    const openRowDetails = (data: any) => {
        navigate(`/management/${data.id}`);
    }

    return (
            <div className="bundlesList">
                <DataGrid
                    disableVirtualization={false}
                        loading={loading}
                        rows={rows}
                        columns={columns}
                        disableColumnMenu={true}
                        disableColumnSelector={true}
                        disableExtendRowFullWidth={false}
                        onRowClick={openRowDetails}
                        showCellRightBorder={false}
                />
            </div>
    );
}
