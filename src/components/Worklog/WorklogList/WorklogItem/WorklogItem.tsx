import React from 'react';
import { WorklogEntry } from '../../../../models/WorklogEntry';

export function WorklogItem({item}: { item: WorklogEntry }): JSX.Element {
    return (
        <>
            <li>
                {
                    <>
                        {/* <p>{item.tag.name}</p> */}
                        <p>{item.startTime}</p>
                        <button onClick={() => {
                        }}/>
                        <button onClick={() => {
                        }}/>
                    </>
                }
            </li>
        </>
    );
}
