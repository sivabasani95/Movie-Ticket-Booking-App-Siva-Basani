import React from "react";
import { events } from "../../../utils/constants";
import "./LiveEvents.css";

// LiveEvents component to display event cards
const LiveEvents = () => {
  return (
   <div className="live-events-container">
      {/* Section title */}
    <h2 className="live-events-title">Best Of Live Events</h2>
     {/* Grid container for events */}
<div className="live-events-grid">
   {/* Loop through events data */}
        {events.map((event, i) => (
          <div className="event-card" key={i}>
             {/* Event image */}
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
