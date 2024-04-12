import React from 'react';

const ReportResult = ({ data }) => {
    return (
        <div>
            <h2>Report Result</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ReportResult;
