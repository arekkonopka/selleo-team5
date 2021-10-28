import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { gql, useMutation } from "@apollo/client";

import { WorklogEntry } from "../../../../models/WorklogEntry";
import { FETCH_ENTRIES } from "../../../../queries/useWorklogEntries";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const REMOVE_ENTRY = gql`
    mutation removeEntry($id: MongoID!) {
        entryRemoveById(_id: $id) {
            recordId
        }
    }
`;

export function WorklogItem({ item }: { item: WorklogEntry }): JSX.Element {
    const [removeEntry] = useMutation(REMOVE_ENTRY, { refetchQueries: [FETCH_ENTRIES, "getEntriesForDate"] });

    return (
        <TableRow>
            <TableCell>{item.tag?.tagBundle?.name ? item.tag.tagBundle.name : "empty name"}</TableCell>
            <TableCell>{item.tag?.name ? item.tag?.name : "empty name"}</TableCell>
            <TableCell>
                <p>start time: {item.startTime}</p>
            </TableCell>
            <TableCell>
                <p>end time: {item.endTime}</p>
            </TableCell>
            <TableCell>
                <IconButton aria-label="delete" size="large" onClick={() => {}}>
                    <AddCircleIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => {
                        removeEntry({ variables: { id: item._id } });
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
