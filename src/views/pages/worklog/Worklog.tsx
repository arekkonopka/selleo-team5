import React, { useEffect, useState } from 'react';
import { useWorklogEntries } from '../../../queries';
import { WorklogEntry } from '../../../models/WorklogEntry';
import WorklogList from '../../../components/Worklog/WorklogList/WorklogList';
import { Loader } from '../../../ui-component/Loader';
import { Button, Card, CardContent, CardHeader, CircularProgress, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useMyBundles } from '../../../queries/useMyBundles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { add, set, sub } from 'date-fns';
import './index.scss';

function Worklog(): JSX.Element {
    const [date, setDate] = useState<Date>(set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0}));
    const {data, loading: loadingWorklogEntries, getWorklogEntries} = useWorklogEntries(date);
    const {data: bundlesWithTags, loading: loadingBundles} = useMyBundles();
    const loading: boolean = loadingWorklogEntries || loadingBundles;

    const worklogItems: WorklogEntry[] = data;

    const handleDateChange = (date: Date | null) => {
        if (!date) {
            return;
        }

        setDate(date);
    }

    const handlePreviousDay = () => {
        const newDate: Date = sub(date, {days: 1});
        setDate(newDate);
    }

    const handleNextDay = () => {
        const newDate: Date = add(date, {days: 1});
        setDate(newDate);
    }

    useEffect(() => {
        console.log('date', date);
        getWorklogEntries({variables: {date: date}});
    }, [date]);

    const emptyList: boolean = worklogItems.length === 0;

    return (
        <Card>
            <CardContent>
                <div className="worklogHeader">
                    <IconButton aria-label="previous day" onClick={handlePreviousDay}>
                        <ArrowLeftIcon/>
                    </IconButton>
                    <DatePicker
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <IconButton aria-label="next day" onClick={handleNextDay}>
                        <ArrowRightIcon/>
                    </IconButton>
                </div>
            </CardContent>
            <CardContent>
                {loading && <Loader/>}
                {loading && (
                    <div className="placehoderContainer">
                        <CircularProgress size="md"/>
                    </div>
                )}

                {(!loading && emptyList) && (
                    <div className="placehoderContainer">
                        <p>You haven't got any items to track yet. </p>
                    </div>
                )}

                {(!loading && !emptyList) && <WorklogList worklogItems={worklogItems} bundlesWithTags={bundlesWithTags}/> }
            </CardContent>
        </Card>
    );
}

export default Worklog;
