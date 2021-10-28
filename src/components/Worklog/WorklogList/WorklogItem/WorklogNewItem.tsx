import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { MenuItem, TableRow, TableCell, TextField } from "@mui/material";
import { Select } from "@material-ui/core";
import { TimePicker } from "@mui/lab";
import { ADD_ENTRIES } from "../../../../queries/useAddEntries";
import { FETCH_ENTRIES } from "../../../../queries/useWorklogEntries";

export function WorklogNewItem(): JSX.Element {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [addEntry] = useMutation(ADD_ENTRIES, {
    refetchQueries: [FETCH_ENTRIES, "getEntriesForDate"],
  });

  return (
    <TableRow>
      <TableCell>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={}
          label="Age"
          //   onChange={handleChange}
        >
          <MenuItem value={10}>list of all tagBundle?.name</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={}
          label="Age"
          //   onChange={handleChange}
        >
          <MenuItem value={10}>list of all name</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <TimePicker
          label="Start time"
          value={startTime}
          onChange={(newValue: any) => {
            setStartTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </TableCell>
      <TableCell
        onBlur={() => {
          addEntry({ variables: { record: { endTime: endTime } } });
        }}
      >
        <TimePicker
          label="End time"
          value={endTime}
          onChange={(newValue: any) => {
            setEndTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </TableCell>
    </TableRow>
  );
}
