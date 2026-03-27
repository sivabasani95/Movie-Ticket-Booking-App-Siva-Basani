
import React from "react";
import { events } from "../../utils/constants.js";
import "./LiveEvents.css";
const LiveEvents = () => {
    return(
        <div className="live-events-wrapper">
            <h2 className="live-events-title">The Best Of Live Events</h2>
             <div className="live-events-grid">
                {events.map((event,i) =>  (
                    <div className="live-event-card" key={i}>
                        <img 
                        src={event.img}
                        alt={event.title}
                        className="live-event-image"
                        
                        />
                    </div>


                ))}



            </div>   
       
        </div>
    )
}
export default LiveEvents;