import React from "react";
import { WorklogItem } from "./WorklogItem/WorklogItem";
import { WorklogEntry } from "../../../models/WorklogEntry";
import TableHead from "@mui/material/TableHead";
import { TableBody, TableRow } from "@mui/material";
import StyledTableCell from "@mui/material/TableCell";

const WorklogList = ({ worklogItems }: { worklogItems: WorklogEntry[] }) => {
    if (worklogItems.length === 0) {
        return (
            <div>
                <p>You haven't got any items to track yet. </p>
            </div>
        );
    }

    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <ul>
                    {worklogItems.map((trackingItem: WorklogEntry) => (
                        <WorklogItem key={trackingItem._id} item={trackingItem} />
                    ))}
                </ul>
            </TableBody>
        </>
    );
};
export default WorklogList;
