// src/components/ExcelUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('excelFile', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/candidates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Candidates added successfully.');
      }
    } catch (error) {
      console.error(error);
    //   alert('Error uploading candidates.');
    alert(error);
    }
  };

  return (
    <div>
      <h2>Upload Candidate Data from Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ExcelUpload;
