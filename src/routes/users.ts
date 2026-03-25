import express from 'express';
import { createUser, editUser } from '../controllers/users.controller'

const router = express.Router();

router.post('/', createUser)
router.put('/:id/edit', editUser)

export default router