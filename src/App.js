import React, { useEffect, useState } from 'react';
import ReportForm from 'D:\\File\\Programming\\Web development\\electrifyit-reports-dashboard\\frontend\\src\\components\\ReportForm.js';
import ReportResult from 'D:\\File\\Programming\\Web development\\electrifyit-reports-dashboard\\frontend\\src\\components\\ReportResult.js';

const App = () => {
    const [reportData, setReportData] = useState(null);

const [user,setUser] = useState([])

    const getUser=()=>{
        fetch("http://localhost:3600/api/user")
        .then(res => res.json())
        .then(json => setUser(json))
    }
    useEffect(()=>{
        getUser()
    },[])

    const handleReportSubmit = (data) => {
        setReportData(data);
    };

    return (
        <div>
            <h1>Vehicle Reporting System</h1>
            <ReportForm onReportSubmit={handleReportSubmit} />
            {reportData && <ReportResult data={reportData} />}
        </div>
    );
};

export default App;

