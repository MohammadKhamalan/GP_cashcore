import { db } from '../connect.js';
// import { db } from '../connect.js';
// export const getAllAlerts = (req, res) => {
//     const { account_id } = req.params; // Corrected to use req.params
  
//     const getAllAlertsQuery = `
//       SELECT *
//       FROM alerts
//       WHERE account_id = ? AND seen_alert = 0
//     `;
  
//     db.query(getAllAlertsQuery, [account_id], (error, alerts) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
  
//       if (alerts.length === 0) {
//         return res.status(404).json({ message: "No unseen alerts found" });
//       }
  
//       // Update seen_flag to 1 for the retrieved alerts
//       const alertIDs = alerts.map(alert => alert.alert_id);
//       const updateSeenAlertQuery = `
//         UPDATE alerts
//         SET seen_alert = 1
//         WHERE alert_id IN (?)
//       `;
  
//       db.query(updateSeenAlertQuery, [alertIDs], (updateError) => {
//         if (updateError) {
//           console.error(updateError);
//           return res.status(500).json({ error: "Error updating seen_flag" });
//         }
  
//         res.status(200).json({ message: "Alerts fetched and marked as seen" });
//       });
//     });
//   };

// export const getAllAlerts = (req, res) => {
//     const { account_id } = req.params;
  
//     const getAllAlertsQuery = `
//       SELECT *
//       FROM alerts
//       WHERE account_id = ?
//       ORDER BY seen_alert ASC
//     `;
  
//     db.query(getAllAlertsQuery, [account_id], (error, alerts) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
  
//       if (alerts.length === 0) {
//         return res.status(404).json({ message: "No alerts found" });
//       }
  
//       const unseenAlerts = alerts.filter(alert => alert.seen_alert === 0);
//       const seenAlerts = alerts.filter(alert => alert.seen_alert === 1);
  
//       const allAlerts = [...unseenAlerts, ...seenAlerts];
  
//       // Update seen_alert to 1 for the retrieved unseen alerts
//       const unseenAlertIDs = unseenAlerts.map(alert => alert.alert_id);
//       const updateSeenAlertQuery = `
//         UPDATE alerts
//         SET seen_alert = 1
//         WHERE alert_id IN (?)
//       `;
  
//       db.query(updateSeenAlertQuery, [unseenAlertIDs], (updateError) => {
//         if (updateError) {
//           console.error(updateError);
//           return res.status(500).json({ error: "Error updating seen_alert" });
//         }
  
//         res.status(200).json({ alerts: allAlerts, message: "Alerts fetched and marked as seen" });
//       });
//     });
//   };
  
  
//   export const getAlertById = (req, res) => {
//     const alertID = req.params.id;
  
//     const getAlertQuery = `
//       SELECT p.post_content, p.post_date, p.likes_count, p.comment_count
//       FROM alerts a
//       JOIN posts p ON a.post_id = p.post_id
//       WHERE a.alert_id = ?
//     `;
  
//     db.query(getAlertQuery, [alertID], (error, alertDetails) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
  
//       if (!alertDetails || alertDetails.length === 0) {
//         return res.status(404).json({ message: "Alert not found" });
//       }
  
//       // Update seen_flag to 1 for the specific alert
//       const updateSeenAlertQuery = `
//         UPDATE alerts
//         SET seen_alert = 1
//         WHERE alert_id = ?
//       `;
  
//       db.query(updateSeenAlertQuery, [alertID], (updateError) => {
//         if (updateError) {
//           console.error(updateError);
//           return res.status(500).json({ error: "Error updating seen_flag" });
//         }
  
//         res.status(200).json({ alert_details: alertDetails[0], message: "Alert details fetched and marked as seen" });
//       });
//     });
//   };
export const getAllAlerts = (req, res) => {
    const { account_id } = req.params;
  
    const getAllAlertsQuery = `
      SELECT *
      FROM alerts
      WHERE account_id = ?
      ORDER BY seen_alert ASC
    `;
  
    db.query(getAllAlertsQuery, [account_id], (error, alerts) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (alerts.length === 0) {
        return res.status(404).json({ message: "No alerts found" });
      }
  
      const unseenAlerts = alerts.filter(alert => alert.seen_alert === 0);
      const seenAlerts = alerts.filter(alert => alert.seen_alert === 1);
  
      const allAlerts = [...unseenAlerts, ...seenAlerts];
  
      // Update seen_alert to 1 for the retrieved unseen alerts
      const unseenAlertIDs = unseenAlerts.map(alert => alert.alert_id);
      const updateSeenAlertQuery = `
        UPDATE alerts
        SET seen_alert = 1
        WHERE alert_id IN (?)
      `;
  
      if (unseenAlertIDs.length > 0) {
        db.query(updateSeenAlertQuery, [unseenAlertIDs], (updateError) => {
          if (updateError) {
            console.error(updateError);
            return res.status(500).json({ error: "Error updating seen_alert" });
          }
  
          res.status(200).json({ alerts: allAlerts, message: "Alerts fetched and marked as seen" });
        });
      } else {
        res.status(200).json({ alerts: allAlerts, message: "All alerts are already seen" });
      }
    });
  };
  
// export const getAllAlerts = (req, res) => {
//     const { account_id } = req.params;
  
//     const getAllAlertsQuery = `
//       SELECT *
//       FROM alerts
//       WHERE account_id = ?
//       ORDER BY seen_alert ASC
//     `;
  
//     db.query(getAllAlertsQuery, [account_id], (error, alerts) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
  
//       if (alerts.length === 0) {
//         return res.status(404).json({ message: "No alerts found" });
//       }
  
//       const unseenAlerts = alerts.filter(alert => alert.seen_alert === 0);
//       const seenAlerts = alerts.filter(alert => alert.seen_alert === 1);
  
//       const allAlerts = [...unseenAlerts, ...seenAlerts];
  
//       // Update seen_alert to 1 for the retrieved unseen alerts
//       const unseenAlertIDs = unseenAlerts.map(alert => alert.alert_id);
//       const updateSeenAlertQuery = `
//         UPDATE alerts
//         SET seen_alert = 1
//         WHERE alert_id IN (?)
//       `;
  
//       db.query(updateSeenAlertQuery, [unseenAlertIDs], (updateError) => {
//         if (updateError) {
//           console.error(updateError);
//           return res.status(500).json({ error: "Error updating seen_alert" });
//         }
  
//         res.status(200).json({ alerts: allAlerts, message: "Alerts fetched and marked as seen" });
//       });
//     });
//   };
  export const getAlertById = (req, res) => {
    const alertID = req.params.id;
  
    const getAlertQuery = `
      SELECT p.post_content, p.post_date, p.likes_count, p.comment_count
      FROM alerts a
      JOIN posts p ON a.post_id = p.post_id
      WHERE a.alert_id = ?
    `;
  
    db.query(getAlertQuery, [alertID], (error, alertDetails) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (!alertDetails || alertDetails.length === 0) {
        return res.status(404).json({ message: "Alert not found" });
      }
  
      // Update seen_alert to 1 for the specific alert
      const updateSeenAlertQuery = `
        UPDATE alerts
        SET seen_alert = 1
        WHERE alert_id = ?
      `;
  
      db.query(updateSeenAlertQuery, [alertID], (updateError) => {
        if (updateError) {
          console.error(updateError);
          return res.status(500).json({ error: "Error updating seen_alert" });
        }
  
        res.status(200).json({ alert_details: alertDetails[0], message: "Alert details fetched and marked as seen" });
      });
    });
  };
    