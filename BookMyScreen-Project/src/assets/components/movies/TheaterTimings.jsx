import React, { useState } from "react";
import "./TheaterTimings.css";
import dayjs from "dayjs";

const TheaterTimings = () => {
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

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

      <hr className="divider" />

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
    </div>
    </>
  );
};

export default TheaterTimings;