// src/components/DoctorList.js
import React from "react";
import doctors from "../data/doctors";

const DoctorList = ({ onSelectDoctor }) => {
    return (
        <div className="doctors-list">
            <h2>Doctors</h2>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id} onClick={() => onSelectDoctor(doctor)}>
                        {doctor.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
