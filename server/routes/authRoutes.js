import express from 'express';
import { registerUser, getUserByUID } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/:uid', getUserByUID);

export default router;