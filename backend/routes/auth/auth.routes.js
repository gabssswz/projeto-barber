import { Router } from 'express';
import { login, getMe } from './auth.controller.js';
import { verificarToken } from './auth.middleware.js';


const router = Router();

router.post('/login', login);

router.get('/me'. verificarToken, getMe);

export default router;