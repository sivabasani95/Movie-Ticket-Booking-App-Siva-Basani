import React, { useState } from "react";
import "./TheaterTimings.css";
import dayjs from "dayjs";
import pvr from "../../../images/pvr.avif";
import inox from "../../../images/inox.avif";
import cinepolis from "../../../images/cinepolis.avif";

// TheaterTimings component
const TheaterTimings = () => {
  const today = dayjs();
   // Store selected date in state
  const [selectedDate, setSelectedDate] = useState(today);
  // Create array for next 7 days
  const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

  // Filter options
  const filters = [
    "2D",
    "3D",
    "Wheelchair Friendly",
    "Premium Seats",
    "Recliners",
    "IMAX",
    "PVR PxL",
    "4DX",
    "Laser",
    "Dolby Atmos",
  ];
   // Theatre data
const theatres = [
  {
    name: "PVR Cinemas",
    location: "Phoenix Mall",
    img: pvr,
    timings: ["10:30 AM", "1:45 PM", "5:00 PM", "8:15 PM"],
  },
  {
    name: "INOX",
    location: "City Center",
    img: inox,
    timings: ["11:00 AM", "2:15 PM", "6:00 PM", "9:10 PM"],
  },
  {
    name: "Cinepolis",
    location: "Grand Plaza",
    img: cinepolis,
    timings: ["9:45 AM", "12:30 PM", "4:20 PM", "7:40 PM"],
  },
];
  return (
    <>
    <div className="theater-timings">
      <div className="filters-wrapper">
        <div className="filters-container">
          {filters.map((item, i) => (
            <button key={i} className="filter-pill" type="button">
              {item}
            </button>
          ))}
        </div>
 {/* Seat availability status */}
        <div className="status-row">
          <span className="status-item">
            <span className="status-dot available"></span>
            Available
          </span>

          <span className="status-item">
            <span className="status-dot filling"></span>
            Filling Fast
          </span>

          <span className="status-item">
            <span className="status-dot almost"></span>
            Almost Full
          </span>
        </div>
    </div>

  {/* Divider line */}
      <hr className="divider" />
{/* Date selection buttons */}
      <div className="date-container">
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day");

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`date-button ${isSelected ? "selected" : ""}`}
              type="button"
            >
              <span className="date-day">{date.format("D")}</span>
              <span className="date-weekday">{date.format("ddd")}</span>
              <span className="date-month">
                {date.format("MMM").toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

  {/* Theatre cards section */}
      <div className="theatres-container">
  {theatres.map((theatre, i) => (
    <div key={i} className="theatre-card">

      <div className="theatre-header">
        <img
          src={theatre.img}
          alt={theatre.name}
          className="theatre-logo"
        />

        <div className="theatre-info">
          <h3 className="theatre-name">{theatre.name}</h3>
          <p className="theatre-location">{theatre.location}</p>
           
        </div>
      </div>

  {/* Show timings */}
      <div className="timings-row">
       
        {theatre.timings.map((time, index) => (
          <button key={index} className="timing-btn">
            {time}
          </button>
         
        ))}
          {/* Cancellation button */}
        <button className="cancel-btn">Allow Cancellation</button>
      </div>

    </div>
  ))}
</div>




    </div>
    </>
  );
};

export default TheaterTimings;