// src/components/AppointmentForm.js
import React, { useState } from "react";

const AppointmentForm = ({ selectedDoctor, onRequestAppointment }) => {
    const [selectedTime, setSelectedTime] = useState("");

    const handleRequestAppointment = () => {
        if (selectedTime) {
            onRequestAppointment({
                doctor: selectedDoctor.name,
                time: selectedTime,
            });
            setSelectedTime("");
        }
    };

    return (
        <div className="appointment-form">
            <h2>Request Appointment</h2>
            <p>Selected Doctor: <span className="selected-doctor-name">{selectedDoctor.name}</span></p>
            <label>Select Time:</label>
            <select className="timepicker" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value="">-- Select Time --</option>
                {selectedDoctor.availability.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
            <button onClick={handleRequestAppointment}>Request Appointment</button>
        </div>
    );
};

export default AppointmentForm;
