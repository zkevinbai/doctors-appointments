// src/__tests__/App.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App";

test('renders the main app with the title', () => {
  render(<App />);
  expect(screen.getByText("Kevin's Pharmaceutical Appointments Tool")).toBeInTheDocument();
});

test('selects a doctor and requests an appointment', () => {
  render(<App />);

  // Select a doctor
  const doctorElement = screen.getByText('Dr. Smith');
  fireEvent.click(doctorElement);

  // Request an appointment
  const timeSelect = screen.getByLabelText('Select Time:');
  fireEvent.change(timeSelect, { target: { value: '10:00 AM' } });

  const requestButton = screen.getByText('Request Appointment');
  fireEvent.click(requestButton);

  // Check if the appointment is displayed
  const appointmentElement = screen.getByText('Dr. Smith - 10:00 AM');
  expect(appointmentElement).toBeInTheDocument();
});

test('displays the appointment list', () => {
  render(<App />);

  // Request an appointment
  const doctorElement = screen.getByText('Dr. Johnson');
  fireEvent.click(doctorElement);

  const timeSelect = screen.getByLabelText('Select Time:');
  fireEvent.change(timeSelect, { target: { value: '2:00 PM' } });

  const requestButton = screen.getByText('Request Appointment');
  fireEvent.click(requestButton);

  // Check if the appointment list contains the requested appointment
  const appointmentListElement = screen.getByText('Appointments');
  const requestedAppointmentElement = screen.getByText('Dr. Johnson - 2:00 PM');
  expect(appointmentListElement).toBeInTheDocument();
  expect(requestedAppointmentElement).toBeInTheDocument();
});

test('resets the appointment form and list', () => {
  render(<App />);

  // Request an appointment
  const doctorElement = screen.getByText('Dr. Kim');
  fireEvent.click(doctorElement);

  const timeSelect = screen.getByLabelText('Select Time:');
  fireEvent.change(timeSelect, { target: { value: '3:30 PM' } });

  const requestButton = screen.getByText('Request Appointment');
  fireEvent.click(requestButton);

  // Reset the form
  const resetButton = screen.getByTestId('reset-button');
  fireEvent.click(resetButton);

  // Ensure that the form and list have been reset
  const appointmentFormElement = screen.getByText('Select Doctor:');
  const appointmentListElement = screen.queryByText('Dr. Kim - 3:30 PM');
  expect(appointmentFormElement).toBeInTheDocument();
  expect(appointmentListElement).not.toBeInTheDocument();
});
