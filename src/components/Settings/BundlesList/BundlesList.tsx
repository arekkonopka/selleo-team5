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

    return (
        <div className="bundlesList">
            { (loadingAssign || loadingUnassign) && <Loader/> }
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
    );
};

export default BundlesList;
