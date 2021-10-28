import React from "react";
import { WorklogItem } from "./WorklogItem/WorklogItem";
import { WorklogEntry } from "../../../models/WorklogEntry";
import TableHead from "@mui/material/TableHead";
import { Table, TableBody, TableRow } from '@mui/material';
import StyledTableCell from "@mui/material/TableCell";
import { Bundle } from '../../../models/Bundle';

const WorklogList = ({ worklogItems, bundlesWithTags }: { worklogItems: WorklogEntry[], bundlesWithTags: Bundle[] }) => {
    return (
        <Table>
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
                {worklogItems.map((trackingItem: WorklogEntry) => (
                    <WorklogItem key={trackingItem._id} item={trackingItem} />
                ))}
            </TableBody>
        </Table>
    );
};
export default WorklogList;
