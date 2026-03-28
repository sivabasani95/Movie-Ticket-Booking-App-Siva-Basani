import React from "react";
import { events } from "../../../utils/constants";
import "./LiveEvents.css";

const LiveEvents = () => {
  return (
   <div className="live-events-container">
    <h2 className="live-events-title">Best Of Live Events</h2>
<div className="live-events-grid">
        {events.map((event, i) => (
          <div className="event-card" key={i}>
            <img
              src={event.img}
              alt={event.title}
              className="event-img"
            />
          </div>
        ))}
      </div>
    
   </div>
  );
};

export default LiveEvents;
