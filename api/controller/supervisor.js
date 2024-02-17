import { db } from '../connect.js'; // Import the db connection
export const getAllEmployees = (req, res) => {
    const query = "SELECT * FROM `employee`";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
export const getEmployeeById = (req, res) => {
    const employee_id = req.params.id;
    const query = "SELECT * FROM `employee` WHERE employee_id = ?";
    
    db.query(query, [employee_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.json(result[0]);
    });
}


export const createSupervisor = (req, res) => {
    const insertQuery = `
        INSERT INTO employee_supervisor (employee_id, supervisor_name, phone_number, password, email,supervisor_photo)
        SELECT e.employee_id, e.employee_name, e.phone_number, e.password, e.email,e.employee_photo
        FROM employee e
        WHERE e.supervisor = 1
            AND NOT EXISTS (
                SELECT 1
                FROM employee_supervisor es
                WHERE es.employee_id = e.employee_id
            )
    `;
    
    db.query(insertQuery, (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.affectedRows === 0) {
            return res.json({ message: "Supervisors already exist" });
        } else {
            return res.json({ message: "Supervisor(s) added successfully" });
        }
    });
};






// account
export const getAllAccounts = (req, res) => {
    const query = "SELECT * FROM `account`";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
export const getAccountById = (req, res) => {
    const account_id = req.params.id;
    const query = "SELECT * FROM `account` WHERE account_id = ?";
    
    db.query(query, [account_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.json(result[0]);
    });
};

export const updateAccount = (req, res) => {
    const account_id = req.params.id;
    const { password, account_balance, last_transaction_date, score, photo } = req.body;

    const updateQuery = "UPDATE `account` SET password = ?, account_balance = ?, last_transaction_date = ?, score = ?, photo = ? WHERE account_id = ?";
    
    db.query(updateQuery, [password, account_balance, last_transaction_date, score, photo, account_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.json({ message: "Account updated successfully" });
    });
};
export const deleteAccount = (req, res) => {
    const account_id = req.params.id;
    const deleteQuery = "DELETE FROM `account` WHERE account_id = ?";
    
    db.query(deleteQuery, [account_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.json({ message: "Account deleted successfully" });
    });
};
//post
// export const getAllPosts = (req, res) => {
//     const query = "SELECT * FROM `post`";
//     db.query(query, (err, result) => {
//         if (err) return res.status(500).json(err);
//         return res.json(result);
//     });
// };
// export const getPostById = (req, res) => {
//     const post_id = req.params.id;
//     const query = "SELECT * FROM `post` WHERE employee_id = ?";
    
//     db.query(query, [post_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.length === 0) {
//             return res.status(404).json({ message: "Post not found" });
//         }
//         return res.json(result[0]);
//     });
// };
// export const createPost = (req, res) => {
//     const { user_id, post_content, post_date, likes_count, comment_count, post_photo } = req.body;
//     const insertQuery = "INSERT INTO `post` (user_id, post_content, post_date, likes_count, comment_count, post_photo) VALUES (?, ?, ?, ?, ?, ?)";
    
//     db.query(insertQuery, [user_id, post_content, post_date, likes_count, comment_count, post_photo], (err, result) => {
//         if (err) return res.status(500).json(err);
//         return res.json({ message: "Post added successfully", post_id: result.insertId });
//     });
// };
// export const updatePost = (req, res) => {
//     const post_id = req.params.id;
//     const { post_content, post_date, likes_count, comment_count, post_photo } = req.body;

//     const updateQuery = "UPDATE `post` SET post_content = ?, post_date = ?, likes_count = ?, comment_count = ?, post_photo = ? WHERE post_id = ?";
    
//     db.query(updateQuery, [post_content, post_date, likes_count, comment_count, post_photo, post_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Post not found" });
//         }
//         return res.json({ message: "Post updated successfully" });
//     });
// };
// export const deletePost = (req, res) => {
//     const post_id = req.params.id;
//     const deleteQuery = "DELETE FROM `post` WHERE post_id = ?";
    
//     db.query(deleteQuery, [post_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Post not found" });
//         }
//         return res.json({ message: "Post deleted successfully" });
//     });
// };
//pdf
export const getAllDocuments = (req, res) => {
    const query = "SELECT * FROM `pdf_document`";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
export const getDocumentById = (req, res) => {
    const document_id = req.params.id;
    const query = "SELECT * FROM `pdf_document` WHERE document_id = ?";
    
    db.query(query, [document_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(404).json({ message: "Document not found" });
        }
        return res.json(result[0]);
    });
};
//waiting
export const getallwaitingaccount = (req, res) => {
    const query = "SELECT * FROM `waiting_account`";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
export const deleteOldWaitingAccounts = () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); // Calculate the date 2 days ago

    const deleteQuery = "DELETE FROM `waiting_account` WHERE RegistrationDate < ?";
    
    db.query(deleteQuery, [twoDaysAgo], (err, result) => {
        if (err) {
            console.error(err);
            // Handle the error, maybe log it or perform additional actions
        } else {
            console.log(`Deleted ${result.affectedRows} waiting accounts older than 2 days.`);
        }
    });
};

//prize 
// export const getAllPrizeDraws = (req, res) => {
//     const query = "SELECT * FROM `prize_draw`";
//     db.query(query, (err, result) => {
//         if (err) return res.status(500).json(err);
//         return res.json(result);
//     });
// };
// export const getPrizeDrawById = (req, res) => {
//     const draw_id = req.params.id;
//     const query = "SELECT * FROM `prize_draw` WHERE draw_id = ?";
    
//     db.query(query, [draw_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.length === 0) {
//             return res.status(404).json({ message: "Prize draw not found" });
//         }
//         return res.json(result[0]);
//     });
// };
// export const createPrizeDraw = (req, res) => {
//     const { draw_name, draw_date, draw_description, prize_details, winner_id } = req.body;
//     const insertQuery = "INSERT INTO `prize_draw` (draw_name, draw_date, draw_description, prize_details, winner_id) VALUES (?, ?, ?, ?, ?)";
    
//     db.query(insertQuery, [draw_name, draw_date, draw_description, prize_details, winner_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         return res.json({ message: "Prize draw added successfully", draw_id: result.insertId });
//     });
// };

//visitor
export const getallvisitor = (req, res) => {
    const query = "SELECT * FROM `visitor`";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
//product
// export const getAllProducts = (req, res) => {
//     const query = "SELECT * FROM `product`";
//     db.query(query, (err, result) => {
//         if (err) return res.status(500).json(err);
//         return res.json(result);
//     });
// };
// export const getProductById = (req, res) => {
//     const product_id = req.params.id;
//     const query = "SELECT * FROM `product` WHERE product_id = ?";
    
//     db.query(query, [product_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.length === 0) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         return res.json(result[0]);
//     });
// };
// export const createProduct = (req, res) => {
//     const { product_name, product_description, product_price, product_category } = req.body;
//     const insertQuery = "INSERT INTO `product` (product_name, product_description, product_price, product_category) VALUES (?, ?, ?, ?)";
    
//     db.query(insertQuery, [product_name, product_description, product_price, product_category], (err, result) => {
//         if (err) return res.status(500).json(err);
//         return res.json({ message: "Product added successfully", product_id: result.insertId });
//     });
// };
// export const updateProduct = (req, res) => {
//     const product_id = req.params.id;
//     const { product_name, product_description, product_price, product_category } = req.body;

//     const updateQuery = "UPDATE `product` SET product_name = ?, product_description = ?, product_price = ?, product_category = ? WHERE product_id = ?";
    
//     db.query(updateQuery, [product_name, product_description, product_price, product_category, product_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         return res.json({ message: "Product updated successfully" });
//     });
// };
// export const deleteProduct = (req, res) => {
//     const product_id = req.params.id;
//     const deleteQuery = "DELETE FROM `product` WHERE product_id = ?";
    
//     db.query(deleteQuery, [product_id], (err, result) => {
//         if (err) return res.status(500).json(err);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         return res.json({ message: "Product deleted successfully" });
//     });
// };
//transaction
export const getAllTransactions = (req, res) => {
    const query = "SELECT * FROM `transaction`";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
};
export const getTransactionsByAccountId = (req, res) => {
    const account_id = req.params.id;
    const query = "SELECT * FROM `transaction` WHERE account_id = ?";
    
    db.query(query, [account_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(404).json({ message: "Transactions not found for this account" });
        }
        return res.json(result);
    });
};
