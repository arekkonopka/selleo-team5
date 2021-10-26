import React, { Fragment } from "react";
import { Entry } from "./../../models/Entry";

export function TrackingItem({ item }: { item: Entry }): JSX.Element {
  console.log(item);

  return (
    <>
      <li>
        {
          <>
            {/* <p>{item.tag.name}</p> */}
            <p>{item.startTime}</p>
            <button onClick={() => {}} />
            <button onClick={() => {}} />
          </>
        }
      </li>
    </>
  );
}
