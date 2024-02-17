import express from 'express';
import { getAllEmployees, createSupervisor, getEmployeeById } from '../controller/supervisor.js'; // Import the controller function

const router = express.Router();

router.post("/", createSupervisor);
router.get('/:id', getEmployeeById); // Specific route comes before the more general route
router.get('/', getAllEmployees);

export default router;
