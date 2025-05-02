import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import './ApplicationDetail.css'; // Importing the CSS file

const ApplicationDetail = () => {
  const printRef = useRef<HTMLDivElement>(null); // This will be the reference for the content to generate PDF

  // Function to download as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Get the content to be included in the PDF
    const content = printRef.current;

    if (content) {
      // Convert the content of the div to a PDF (you can also adjust styling here)
      doc.html(content, {
        callback: (doc) => {
          doc.save('job-application-details.pdf'); // Save the PDF
        },
        x: 10, // Adjust x positioning
        y: 10, // Adjust y positioning
      });
    }
  };

  return (
    <div className="container">
      {/* Content that will be included in the PDF */}
      <div ref={printRef}>
        <h3>Job Application Details</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Skills:</strong> React, TypeScript</p>
        <p><strong>Experience:</strong> 3 years</p>
        <p><strong>Resume:</strong> Resume.pdf</p>
        {/* Add more content here */}
      </div>

      {/* Button to download the content as PDF */}
      <Button 
        variant="outline-primary" 
        onClick={handleDownloadPDF} 
        style={{ marginTop: '20px' }}>
        Download as PDF
      </Button>
    </div>
  );
};

export default ApplicationDetail;


