import React, { useState, useEffect } from 'react';
import { makeRequest } from '../axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Invoices.scss';
import logoImage from '../images/invoice.png'; // Adjust the path based on the folder structure
import logoImage1 from '../images/logo1.png'; // Adjust the path based on the folder structure

import { motion } from 'framer-motion'; // Import motion from Framer Motion

function Invoices() {
  const [userId, setUserId] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');
  const [showTable, setShowTable] = useState(false);

  const fetchInvoices = async () => {
    try {
      const response = await makeRequest.get(`/pdf_documents/${userId}`);
      setInvoices(response.data);
    } catch (error) {
      setError('No invoices found for this user.');
      setInvoices([]);
    }
  };

  const handleGetInvoices = async () => {
    if (!userId || isNaN(userId)) {
      setError('Please enter a valid number.');
      return;
    }
    await fetchInvoices();
    setShowTable(true);
  };

  const handleInputChange = (event) => {
    setUserId(event.target.value);
    setShowTable(false);
    setError('');
  };
  const handleDownloadPDF = async (invoiceId) => {
    try {
      const selectedInvoice = invoices.find((invoice) => invoice.document_id === invoiceId);
  
      if (!selectedInvoice) {
        setError('Invoice not found.');
        return;
      }
  
      const content = `
        <div style="color: #333; font-size: 30px; text-align: center;">
          <img src="${logoImage1}" alt="Logo" className="logo" />
          <h1>Invoice Details</h1>
          <p>Document ID: ${selectedInvoice.document_id}</p>
          <p>User ID: ${selectedInvoice.user_id}</p>
          <p>Account Id: ${selectedInvoice.account_id}</p>
          <p>Name: ${selectedInvoice.user_name}</p>
          <p>Document Name: ${selectedInvoice.document_name}</p>
          <p>Document Content: ${selectedInvoice.document_content}</p>
          <!-- Include other invoice details as needed -->
        </div>
      `;
  
      const frame = document.createElement('div');
      frame.innerHTML = content;
      document.body.appendChild(frame);
  
      const canvas = await html2canvas(frame);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size
      const imgWidth = 210; // A4 size paper width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      const margin = 30; // Set the top margin in millimeters
      pdf.addImage(imgData, 'PNG', 0, margin, imgWidth, imgHeight);
      pdf.save('invoice.pdf');
  
      document.body.removeChild(frame);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setError('Error downloading PDF. Please try again.');
    }
  };
//   const handleDownloadPDF = async (invoiceId) => {
//     try {
//       const selectedInvoice = invoices.find((invoice) => invoice.document_id === invoiceId);
  
//       if (!selectedInvoice) {
//         setError('Invoice not found.');
//         return;
//       }
  
//       const content = `
//         <div style="color: #333; font-size: 24px; text-align: center;">
//         <img src="${logoImage1}" alt="Logo" className="logo" />

//           <h1>Invoice Details</h1>
//           <p>Document ID: ${selectedInvoice.document_id}</p>
//           <p>User ID: ${selectedInvoice.user_id}</p>
//           <p>Account Id: ${selectedInvoice.account_id}</p>
//           <p>Name: ${selectedInvoice.user_name}</p>
//           <p>Document Name: ${selectedInvoice.document_name}</p>
// <p> Document Content: ${selectedInvoice.document_content}</p>
//           <!-- Include other invoice details as needed -->

//         </div>
//       `;
  
//       const frame = document.createElement('div');
//       frame.innerHTML = content;
  
//       document.body.appendChild(frame);
  
//       const canvas = await html2canvas(frame);
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF();
//       const imgWidth = 210; // A4 size paper width
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save('invoice.pdf');
  
//       document.body.removeChild(frame);
//     } catch (error) {
//       console.error('Error downloading PDF:', error);
//       setError('Error downloading PDF. Please try again.');
//     }
//   };
  
  return (
    <div className="invoices-container">
      <h2>Invoice Management</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={handleInputChange}
          className="input-field"
        />
        <button onClick={handleGetInvoices} className="search-btn">
          Get Invoices
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {!showTable && (
        <motion.div className="explanation-boxes">
        <motion.div
          className="explanation1-box"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>By entering an User ID, you can view all invoices related to this user in the table below.</p>
        </motion.div>
        <motion.div
          className="explanation2-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
                <img src={logoImage} alt="Logo" className="logo" />
        </motion.div>
        <motion.div
          className="explanation3-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>when enter user id and click to search it , the invoices related to this user is render,The Print button enables you to execute a PDF copy  for the chosen invoice.</p>
        </motion.div>
      </motion.div>
      )}
     {showTable && (
  <table className="invoices-table">
    <thead>
      <tr>
        <th>Document ID</th>
        <th>User ID</th>
        <th>Name</th>
        <th>Document Name</th>
        <th>Document Content</th>
        <th>Account ID</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {invoices.map((invoice) => (
        <tr key={invoice.document_id}>
          <td>{invoice.document_id}</td>
          <td>{invoice.user_id}</td>
          <td>{invoice.user_name}</td>
          <td>{invoice.document_name}</td>
          <td>{invoice.document_content}</td>
          <td>{invoice.account_id}</td>
          <td>
            <button onClick={() => handleDownloadPDF(invoice.document_id)}>Print</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      )}
    </div>
  );
}

export default Invoices;
