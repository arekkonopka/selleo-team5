import React, { useState } from 'react';
import { useWorklogEntries } from '../../../queries';
import { WorklogEntry } from '../../../models/WorklogEntry';
import WorklogList from '../../../components/Worklog/WorklogList/WorklogList';
import { Loader } from '../../../ui-component/Loader';
import { Card, CardContent, CardHeader, CircularProgress, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';

function Worklog(): JSX.Element {
    const [date, setDate] = useState<Date | null>(new Date());
    const {data, loading} = useWorklogEntries();

    const worklogItems: WorklogEntry[] = data;

    const handleDateChange = (date: Date | null) => {
        setDate(date);
    }

    return (
        <Card>
            <CardContent>
                <DatePicker
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </CardContent>
            <CardContent>
                {loading && <Loader/>}
                {loading ? <CircularProgress/> : <WorklogList worklogItems={worklogItems}/>}
            </CardContent>
        </Card>
    );
}

export default Worklog;
