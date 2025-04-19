import express, { Router } from 'express';
import { signup } from '../controllers/AuthController';

const router = express.Router();


router.post('/api/auth/signup', signup);


export default router;