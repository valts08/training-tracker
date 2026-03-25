import express from 'express';
import { getWorkouts, createWorkout, deleteWorkout } from '../controllers/workouts.controller';

const router = express.Router();

router.get('/all', getWorkouts)
router.post('/', createWorkout)
router.delete('/:id/delete', deleteWorkout)

export default router