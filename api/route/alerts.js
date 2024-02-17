import express from 'express';
import { getAllAlerts, getAlertById } from '../controller/alert.js';

const router = express.Router();

router.get('/:account_id', getAllAlerts);
router.get('/details/:id', getAlertById);

export default router;
