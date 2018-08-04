import { Router } from 'express';
import userController from '../../controllers/evangelism/userController';
import {
    validateLogin,
    validateSignup
} from '../../middlewares/validators/user';

const router = Router();

router.post('/users/signup', validateSignup, userController.createUser);
router.post('/users/login', validateLogin, userController.login);


export default router;
