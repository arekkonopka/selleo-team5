import React, { Fragment } from 'react';
import { useWorklogEntries } from '../../../queries';
import { WorklogEntry } from '../../../models/WorklogEntry';
import { MainCard } from '../../../ui-component/cards/MainCard';
import WorklogList from '../../../components/Worklog/WorklogList/WorklogList';
import { Loader } from '../../../ui-component/Loader';
import { CircularProgress } from '@mui/material';

function Worklog(): JSX.Element {
    const {data, loading} = useWorklogEntries();

    const worklogItems: WorklogEntry[] = data;

    return (
        <Fragment>
            <MainCard title="Worklog">
                {loading && <Loader/>}
                {loading ? <CircularProgress /> : <WorklogList worklogItems={worklogItems}/>}
            </MainCard>
        </Fragment>
    );
}

export default Worklog;
