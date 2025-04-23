import { Router } from 'express';
import * as LoginController from '../controllers/login.controller';

const router = Router();

router.post('', LoginController.login);

export default router;
