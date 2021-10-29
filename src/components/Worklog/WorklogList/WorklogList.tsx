import React, { useState } from 'react';
import { WorklogEntry } from '../../../models/WorklogEntry';
import TableHead from '@mui/material/TableHead';
import { Fab, Table, TableBody, TableRow } from '@mui/material';
import StyledTableCell from '@mui/material/TableCell';
import { Bundle } from '../../../models/Bundle';
import AddIcon from '@mui/icons-material/Add';
import './index.scss';
import { WorklogNewItem } from './WorklogItem/WorklogNewItem';
import { useMutation } from '@apollo/client';
import { ADD_ENTRY } from '../../../queries/useAddEntries';
import { FETCH_ENTRIES } from '../../../queries/useWorklogEntries';
import { format, set } from 'date-fns';
import { DATE_FORMAT } from '../../../views/pages/worklog/Worklog';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
            tag: worklog.tag?.name ?? '',
            bundle: worklog.tag?.tagBundle.name ?? '',
            bundleId: worklog.tag?.tagBundle._id ?? '',
            dateRaw: worklog.date,
            startTime: startTime,
            endTime: endTime,
        };
    });
    console.log('entriesTemp', entriesTemp);
    const [entries, setEntries] = useState(entriesTemp);
    const [addEntry] = useMutation(ADD_ENTRY, {
        refetchQueries: [FETCH_ENTRIES, 'getEntriesForDate'],
    });

    const handleAddNewEntry = () => {
        const dateTemp = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
        addEntry({
            variables: {
                record: {
                    date: format(dateTemp, DATE_FORMAT),
                },
            },
        }).then((response) => {

            const newEntries = [...entries];
            const newItem = {
                id: response.data.createEntry._id,
                index: newEntries.length + 1,
                date: dateTemp,
                startTimeRaw: '',
                endTimeRaw: '',
                tag: '',
                bundle: '',
                bundleId: '',
                dateRaw: '',
                endTime: new Date(),
                startTime: new Date(),
            };
            console.log(newItem);
            newEntries.push(newItem);
            setEntries(newEntries);
        });
    };

    const handleCopy = () => {
        const copyArr = entries.map(
            (item) =>
                `${item.startTimeRaw} - ${item.endTimeRaw}, ${item.bundle}, ${item.tag}`
        );
        navigator.clipboard.writeText(copyArr.join('\r\n'));
    };



    const handleNewChildAtIndex = (index: number) => {
        addEntry({
            variables: {
                record: {
                    date: format(new Date(), DATE_FORMAT),
                },
            },
        }).then((response) => {
            const newEntries = [...entries];
            const newItem: Entry = {
                id: null,
                index: newEntries.length + 1,
                date: new Date(),
                startTimeRaw: '',
                endTimeRaw: '',
                tag: '',
                bundle: '',
                bundleId: '',
                dateRaw: '',
                endTime: new Date(),
                startTime: new Date(),
            };
            newEntries.splice(index, 0, newItem);
            setEntries(newEntries);
        });
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
                            return (<WorklogNewItem key={entry.id}
                                                    entry={entry}
                                                    bundlesWithTags={bundlesWithTags}
                                                    onAddNewRecord={handleNewChildAtIndex}/>)
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="worklogEntriesFooter">
                <Fab color="secondary" aria-label="add" size="small" onClick={handleCopy}>
                    <AssignmentIcon sx={{margin: '2px'}}/>
                </Fab>
            </div>
        </div>
    );
}

export default WorklogList;
