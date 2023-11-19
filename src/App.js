// src/App.js
import React, { useState } from "react";
import DoctorList from "./components/DoctorList";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

const App = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleRequestAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  return (
    <div>
      <h1>Pharmaceutical Appointments</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <DoctorList onSelectDoctor={handleSelectDoctor} />
        </div>
        <div style={{ flex: 1 }}>
          {selectedDoctor && (
            <AppointmentForm
              selectedDoctor={selectedDoctor}
              onRequestAppointment={handleRequestAppointment}
            />
          )}
        </div>
      </div>
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default App;
