import express, { Router } from 'express';
import { signup, signin, logout} from '../controllers/AuthController.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);


export default router;