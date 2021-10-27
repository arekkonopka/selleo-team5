import React from 'react';
import { WorklogItem } from './WorklogItem/WorklogItem';
import { WorklogEntry } from '../../../models/WorklogEntry';

const WorklogList = ({worklogItems}: { worklogItems: WorklogEntry[] }) => {
    return worklogItems.length > 0 ? (
        <ul>
            {worklogItems.map((trackingItem: WorklogEntry) => (
                <WorklogItem key={trackingItem._id} item={trackingItem}/>
            ))}
        </ul>
    ) : (
        <div>
            <p>You haven't got any items to track yet. </p>
        </div>
    );
};
export default WorklogList;