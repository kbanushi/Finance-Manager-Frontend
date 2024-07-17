import React, { useState } from 'react';
import Papa from 'papaparse';
import Chart from "./Chart";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleParse = () => {
        if (!file) return;

        Papa.parse(file, {
            complete: (result) => {
                setData(result.data);
            },
            header: true,
        });
    };

    const handleUpload = () => {
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleParse}>Parse CSV</button>
            <button onClick={handleUpload}>Upload Data</button>
            {data && <Chart data={data} />}
        </div>
    );
};

export default FileUpload;