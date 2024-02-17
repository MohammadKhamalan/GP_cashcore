import { db } from '../connect.js';
export const add_interaction = (req, res) => {
    const { account_id, interaction_type, interaction_amount } = req.body;
    const branch_id = 0;
    let deposited_for = interaction_type === 0 ? 1 : 0; // 1 for withdrawal, 0 for deposit
  
    const getAccountAndUserNameQuery = `
      SELECT 
        a.user_id,
        a.email,
        a.phone_number,
        a.account_balance,
        a.birthdate,
        u.name AS user_name
      FROM account a
      LEFT JOIN user u ON a.user_id = u.user_id
      WHERE a.account_id = ?
    `;
  
    const insertInteractionQuery = `
      INSERT INTO user_branch (
        interaction_id,
        user_id,
        branch_id,
        interaction_date,
        interaction_type,
        interaction_amount,
        deposited_for,
        account_id,
        name,
        phone_number,
        email,
        birthdate
      )
      VALUES (DEFAULT, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const insertPdfDocumentQuery = `
      INSERT INTO pdf_document (
        document_id,
        user_id,
        document_name,
        document_content,
        account_id
      )
      VALUES (DEFAULT, ?, ?, ?, ?)
    `;
  
    const updateBalanceQuery = `UPDATE account SET account_balance = ? WHERE account_id = ?`;
  
    db.query(getAccountAndUserNameQuery, [account_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching account and user details', error: err });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ message: 'Account details not found for the provided account_id' });
      }
  
      const { user_id, email, phone_number, account_balance, user_name, birthdate } = data[0];
  
      if (interaction_type === 0 && interaction_amount > account_balance) {
        return res.status(400).json({ message: 'Withdrawal amount exceeds account balance' });
      }
  
      const newAccountBalance = interaction_type === 0 ? account_balance - interaction_amount : account_balance + parseInt(interaction_amount);
      const documentName = interaction_type === 0 ? 'Withdraw money' : 'Deposit money';
      const documentContent = `${interaction_type === 0 ? 'Withdrawal' : 'Deposit'} of amount ${interaction_amount} by ${user_name}`;
  
      db.query(
        insertInteractionQuery,
        [
          user_id,
          branch_id,
          interaction_type,
          interaction_amount,
          deposited_for,
          account_id,
          user_name,
          phone_number,
          email,
          birthdate,
        ],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error inserting interaction:', insertErr);
            return res.status(500).json({ message: 'Error inserting interaction', error: insertErr });
          }
  
          console.log('Insert Result:', insertResult);
  
          db.query(updateBalanceQuery, [newAccountBalance, account_id], (updateErr, updateResult) => {
            if (updateErr) {
              console.error('Error updating account balance:', updateErr);
              return res.status(500).json({ message: 'Error updating account balance', error: updateErr });
            }
  
            console.log('Update Result:', updateResult);
  
            db.query(
              insertPdfDocumentQuery,
              [user_id, documentName, documentContent, account_id],
              (pdfInsertErr, pdfInsertResult) => {
                if (pdfInsertErr) {
                  console.error('Error inserting PDF document:', pdfInsertErr);
                  return res.status(500).json({ message: 'Error inserting PDF document', error: pdfInsertErr });
                }
  
                console.log('PDF Document Insert Result:', pdfInsertResult);
  
                const successMessage = (interaction_type === 0) ? 'Withdrawal successful' : 'Deposit successful';
                return res.status(200).json({ message: successMessage });
              }
            );
          });
        }
      );
    });
  };
 





export const getInteractions = (req, res) => {
    const q = "SELECT * FROM user_branch";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
};


export const getuserinteractions = (req, res) => {
    const account_id = req.params.id;
    const q = "SELECT * FROM account WHERE account_id = ?";
    db.query(q, [account_id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) {
            return res.status(404).json({ message: "No interactions found for this user" });
        }
        return res.json(data);
    });
};