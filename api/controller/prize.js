import { db } from '../connect.js'; // Import the db connection

export const getAllPrizeDraws = (req, res) => {
    const query = `
        SELECT p.draw_id, p.draw_name, p.draw_date, p.prize_details, p.draw_description, a.account_id, u.name AS user_name
        FROM prize_draw p
        JOIN account a ON p.winner_id = a.account_id
        JOIN user u ON a.user_id = u.user_id
    `;
    
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};

// export const getPrizeDrawById = (req, res) => {
//     const user_id = req.params.id;
//     const query = "SELECT * FROM `prize_draw` WHERE winner_id = ?";
    
//     db.query(query, [user_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.length === 0) {
//             return res.status(404).json({ message: "Prize draw not found" });
//         }
//         return res.json(result);
//     });
// };
export const getPrizeDrawById = (req, res) => {
    const user_id = req.params.id;
    const query = `
        SELECT a.account_id, u.name
        FROM prize_draw p
        JOIN account a ON p.winner_id = a.account_id
        JOIN user u ON a.user_id = u.user_id
        WHERE p.winner_id = ?
    `;
    
    db.query(query, [user_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(404).json({ message: "Prize draw not found" });
        }
        return res.json(result);
    });
};


export const createPrizeDraw = (req, res) => {
    const { draw_name, draw_description, prize_details } = req.body;

    // Query to select the top 3 accounts with the highest scores
    const selectTopAccountsQuery = "SELECT account_id FROM `account` ORDER BY score DESC LIMIT 3";

    // Execute the query to find the top 3 accounts
    db.query(selectTopAccountsQuery, (err, topAccountsResult) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Check if top accounts are found
        if (topAccountsResult.length > 0) {
            // Randomly select a winner from the top 3 accounts
            const randomIndex = Math.floor(Math.random() * topAccountsResult.length);
            const winnerAccountId = topAccountsResult[randomIndex].account_id;

            // Insert the prize draw with the randomly selected winner_id
            const insertQuery = "INSERT INTO `prize_draw` (draw_name, draw_date, draw_description, prize_details, winner_id) VALUES (?, NOW(), ?, ?, ?)";
            
            db.query(insertQuery, [draw_name, draw_description, prize_details, winnerAccountId], (insertErr, insertResult) => {
                if (insertErr) {
                    return res.status(500).json(insertErr);
                }

                return res.json({ message: "Prize draw added successfully", draw_id: insertResult.insertId, winner_id: winnerAccountId });
            });
        } else {
            return res.status(404).json({ message: "No top accounts found" });
        }
    });
};
