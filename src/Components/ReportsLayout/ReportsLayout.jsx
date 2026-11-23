import React from 'react';
import './ReportsLayout.css';

const reports = [
  { id: 1, doctor: 'Dr. John Doe', speciality: 'Cardiology', file: '/patient_report.pdf' },
  { id: 2, doctor: 'Dr. Jane Smith', speciality: 'Dermatology', file: '/patient_report.pdf' },
];

const ReportsLayout = () => {
  return (
    <div className="reports-container">
      <h1>Reports</h1>
      {reports.length === 0 ? (
        <p>You have no reports yet.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.doctor}</td>
                <td>{r.speciality}</td>
                <td>
                  <a href={r.file} target="_blank" rel="noopener noreferrer" className="report-btn">View Report</a>
                </td>
                <td>
                  <a href={r.file} download="patient_report.pdf" className="report-btn">Download Report</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsLayout;
