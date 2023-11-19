import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App";

test('renders the main app with the title', () => {
  render(<App />);
  expect(screen.getByText("Kevin's Doctor Appointments App")).toBeInTheDocument();
});

test('selects a doctor and requests an appointment', async () => {
  render(<App />);

  // Select a doctor
  const doctorElement = screen.getByText('Dr. Smith');
  fireEvent.click(doctorElement);

  // Request an appointment
  const timeSelect = screen.getByLabelText('Select Time:');
  fireEvent.change(timeSelect, { target: { value: '10:00 AM' } });

  const requestButton = screen.getByRole('button', { name: 'Request Appointment' });
  fireEvent.click(requestButton);
});

test('displays the appointment list', async () => {
  render(<App />);

  // Request an appointment
  const doctorElement = screen.getByText('Dr. Johnson');
  fireEvent.click(doctorElement);

  const timeSelect = screen.getByLabelText('Select Time:');
  fireEvent.change(timeSelect, { target: { value: '2:00 PM' } });

  // Use getByRole to select the button based on its role
  const requestButton = screen.getByRole('button', { name: 'Request Appointment' });
  fireEvent.click(requestButton);

  // Wait for the appointment list to be updated
  await waitFor(() => {
    // Check if the appointment list contains the requested appointment
    const appointmentListElement = screen.getByText('Appointments');
    expect(appointmentListElement).toBeInTheDocument();
  }, { timeout: 3000 }); // Adjust the timeout duration as needed
});
