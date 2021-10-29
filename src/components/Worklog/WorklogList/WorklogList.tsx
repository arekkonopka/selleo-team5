import React, { useState } from 'react';
import { WorklogEntry } from '../../../models/WorklogEntry';
import TableHead from '@mui/material/TableHead';
import { Fab, Table, TableBody, TableRow } from '@mui/material';
import StyledTableCell from '@mui/material/TableCell';
import { Bundle } from '../../../models/Bundle';
import AddIcon from '@mui/icons-material/Add';
import './index.scss';
import { WorklogNewItem } from './WorklogItem/WorklogNewItem';

export interface Entry {
    id: string | null;
    index: number;
    date: Date;
    dateRaw: string;
    startTimeRaw: string;
    endTimeRaw: string;
    startTime: Date;
    endTime: Date;
    tag: string;
    bundleId: string;
    bundle: string;
}

const WorklogList = ({worklogItems, bundlesWithTags}: { worklogItems: WorklogEntry[], bundlesWithTags: Bundle[] }) => {
    const entriesTemp: Entry[] = worklogItems.map((worklog: WorklogEntry, index: number) => {
        const date: Date = new Date(worklog.date);
        const startTime: Date = new Date(worklog.date);
        const endTime: Date = new Date(worklog.date);

        return {
            id: worklog._id,
            index: index,
            date: date,
            startTimeRaw: worklog.startTime,
            endTimeRaw: worklog.endTime,
            tag: worklog.tag.name,
            bundle: worklog.tag.tagBundle.name,
            bundleId: worklog.tag.tagBundle._id,
            dateRaw: worklog.date,
            startTime: startTime,
            endTime: endTime,
        };
    });
    const [entries, setEntries] = useState(entriesTemp);

    const handleAddNewEntry = () => {
        const newEntries = [...entries];
        newEntries.push({
            id: null,
            index: entries.length + 1,
            date: new Date(),
            startTimeRaw: '',
            endTimeRaw: '',
            tag: '',
            bundle: '',
            bundleId: '',
            dateRaw: '',
            endTime: new Date(),
            startTime: new Date(),
        });
        setEntries(newEntries);
    };

    const handleCopy = () => {

    };

    const handleChangeInChild = () => {

    };

    return (
        <div>
            <div className="worklogEntriesHeader">
                <Fab color="secondary" aria-label="add" size="small" onClick={handleAddNewEntry}>
                    <AddIcon/>
                </Fab>
            </div>
            <div className="worklogEntriesList">
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left" width={200}>Start time</StyledTableCell>
                            <StyledTableCell align="left" width={200}>End time</StyledTableCell>
                            <StyledTableCell align="left">Bundle</StyledTableCell>
                            <StyledTableCell align="left">Tag</StyledTableCell>
                            <StyledTableCell align="left" width={50}/>
                            <StyledTableCell align="left" width={50}>Remove</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry: Entry) => {
                            return (<WorklogNewItem key={entry.id} entry={entry} bundlesWithTags={bundlesWithTags} onChange={handleChangeInChild}/>)
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="worklogEntriesFooter">
                <Fab color="secondary" aria-label="add" size="small" onClick={() => {
                }}>
                    <AddIcon/>
                </Fab>
                <Fab color="secondary" aria-label="add" size="small" onClick={() => {
                }}>
                    <AddIcon/>
                </Fab>
            </div>
        </div>
    );
}

export default WorklogList;
