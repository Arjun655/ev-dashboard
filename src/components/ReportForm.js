import React, { useState } from 'react';

const ReportForm = ({ onReportSubmit }) => {
    const [reportType, setReportType] = useState('totalMilesDriven');
    const [frequency, setFrequency] = useState('daily');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const reportData = reportData(reportType, frequency, startDate, endDate); 
        onReportSubmit(reportData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="reportType">Report Type:</label>
            <select id="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="totalMilesDriven">Total Miles Driven</option>
                {}
            </select>
            <label htmlFor="frequency">Frequency:</label>
            <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button type="submit">Generate Report</button>
        </form>
    );
};

export default ReportForm;
