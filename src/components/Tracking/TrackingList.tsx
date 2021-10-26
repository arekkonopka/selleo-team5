import React from "react";
import { TrackingItem } from "./TrackingItem";
import { useEntries } from "../../queries";
import { Entry } from "../../models/Entry";

const TrackingList = () => {
  const { data } = useEntries();

  const trackingItems: Entry[] = data;

  return trackingItems.length > 0 ? (
    <ul>
      {trackingItems.map((trackingItem) => (
        <TrackingItem item={trackingItem} />
      ))}
    </ul>
  ) : (
    <div>
      <p>you haven't got any items to track yet. </p>
    </div>
  );
};
export default TrackingList;
