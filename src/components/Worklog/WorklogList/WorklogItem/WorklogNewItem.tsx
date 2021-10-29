import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { MenuItem, TableRow, TableCell, TextField, IconButton, Autocomplete } from '@mui/material';
import { Select } from '@material-ui/core';
import { TimePicker } from '@mui/lab';
import { FETCH_ENTRIES } from '../../../../queries/useWorklogEntries';
import { Bundle } from '../../../../models/Bundle';
import { Entry } from '../WorklogList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tag } from '../../../../models/Tag';
import { REMOVE_ENTRY } from '../../../../queries/useRemoveEntry';
import { UPDATE_ENTRY } from '../../../../queries/useUpdateEntry';

export function WorklogNewItem({
                                   entry,
                                   bundlesWithTags,
                                   onChange
                               }: { entry: Entry, bundlesWithTags: Bundle[], onChange: Function }): JSX.Element {
    const [bundle, setBundle] = useState(entry.bundle);
    const [tag, setTag] = useState(entry.tag);
    const [selectedBundle, setSelectedBundle] = useState(bundlesWithTags.find((item: Bundle) => item.name === entry.bundle));
    const [startTime, setStartTime] = useState(entry.startTimeRaw);
    const [endTime, setEndTime] = useState('');
    const [updateEntry] = useMutation(UPDATE_ENTRY, {
        refetchQueries: [FETCH_ENTRIES, 'getEntriesForDate'],
    });
    const [removeEntry] = useMutation(REMOVE_ENTRY, {
        refetchQueries: [FETCH_ENTRIES, 'getEntriesForDate'],
    });

    const handleAddEntry = () => {
    };

    const handleRemoveEntry = () => {
        removeEntry({
            variables: {
                id: entry.id
            },
        }).then(() => {
            onChange();
        });
    };

    const handleChangeEntry = () => {
        if (!entry.id) {
            return;
        }

        updateEntry({
            variables: {
                id: entry.id,
                record: {
                    tagName: tag,
                    tagBundleName: bundle,
                    startTime: startTime,
                    endTime: endTime,
                    order: 0,
                    date: '',
                }
            },
        }).then(() => {
            onChange();
        });
    };

    const handleAddNextEntry = () => {

    }

    useEffect(() => {
        console.log(bundlesWithTags.find((item: Bundle) => item.name === bundle));
        setSelectedBundle(bundlesWithTags.find((item: Bundle) => item.name === bundle));
    }, [bundle]);

    useEffect(() => {
        // handleChangeEntry();
    }, [bundle, tag, startTime, endTime]);

    return (
        <TableRow key={entry.id}>
            <TableCell>
                <TimePicker
                    value={startTime}
                    onChange={(newValue: any) => {
                        setStartTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </TableCell>
            <TableCell>
                <TimePicker
                    value={endTime}
                    onChange={(newValue: any) => {
                        setEndTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </TableCell>
            <TableCell>
                <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={bundle}
                    label="Bundle"
                    onChange={(event) => {
                        setBundle((event.target.value as any));
                    }}
                >
                    {
                        bundlesWithTags.map((bundle: Bundle) => {
                            return (<MenuItem value={bundle.name}>{bundle.name}</MenuItem>)
                        })
                    }
                </Select>
            </TableCell>
            <TableCell>
                <Autocomplete
                    options={selectedBundle?.tags.map((tag: Tag) => tag.name) ?? []}
                    fullWidth
                    id="demo-simple-select"
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(event, value: any) => {
                        setTag(value);
                    }}
                />
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={handleAddNextEntry}
                >
                    <AddCircleIcon/>
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={handleRemoveEntry}
                >
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
