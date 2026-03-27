import React from "react";
import "./LiveEvents.css";

const LiveEvents = () => {
  return (
    <div className="live-events">
      <h2 className="live-title">Live Events</h2>

      <div className="live-grid">
        <div className="live-card">Concerts</div>
        <div className="live-card">Workshops</div>
        <div className="live-card">Comedy Shows</div>
        <div className="live-card">Sports</div>
      </div>
    </div>
  );
};

export default LiveEvents;
