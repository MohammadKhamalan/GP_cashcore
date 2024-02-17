import { db } from '../connect.js';

export const insertPdfDocument = (userId, accountId, documentName, documentContent, res) => {
    const insertPdfQuery = "INSERT INTO pdf_document (user_id, account_id, document_name, document_content) VALUES (?, ?, ?, ?)";

    db.query(insertPdfQuery, [userId, accountId, documentName, documentContent], (pdfInsertErr, pdfInsertData) => {
        if (pdfInsertErr) {
            return res.status(500).json({ message: 'Error inserting data into pdfdocument', error: pdfInsertErr });
        }
        return res.status(200).json({ message: 'Data added to pdfdocument successfully', document_id: pdfInsertData.insertId });
    });
};

export const getPdfForTransaction = (req, res) => {
    const user_id = req.params.id;
    const q = "SELECT * FROM pdf_document WHERE user_id = ?";
    db.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: "There are no transactions for this id" });
        }
        const transaction = data[0]; // Assuming the first entry has all necessary transaction details

        // Create document content with transaction details
        const documentContent = JSON.stringify(transaction);

        // Insert details into pdfdocument table
        insertPdfDocument(null, transaction.account_id, 'transaction', documentContent, res);
    });
};

// export const getAllPdfDocumentsForUser = (req, res) => {
//     const userId = req.params.userId; // Using the consistent parameter name
    
//     const query = 'SELECT * FROM pdf_document WHERE user_id = ?';
  
//     db.query(query, [userId], (err, results) => {
//       if (err) {
//         console.error('Error retrieving pdf_documents:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
  
//       if (results.length === 0) {
//         return res.status(404).json({ message: 'No pdf_documents found for this user_id' });
//       }
  
//       res.status(200).json(results);
//     });
//   };
export const getAllPdfDocumentsForUser = (req, res) => {
    const userId = req.params.userId;
    
    const query = `
      SELECT pdf_document.*, user.name AS user_name
      FROM pdf_document
      INNER JOIN user ON pdf_document.user_id = user.user_id
      WHERE pdf_document.user_id = ?
    `;
    
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error retrieving pdf_documents:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    
      if (results.length === 0) {
        return res.status(404).json({ message: 'No pdf_documents found for this user_id' });
      }
    
      res.status(200).json(results);
    });
  };
  