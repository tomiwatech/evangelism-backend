import { Router } from 'express';
import userController from '../../controllers/evangelism/userController';
import {
    validateLogin,
    validateSignup
} from '../../middlewares/validators/user';

const router = Router();


router.get('/user/all', userController.getAll);
router.get('/user/count', userController.countAll);
router.post('/user/signup', validateSignup, userController.createUser);
router.post('/user/login', validateLogin, userController.login);


export default router;
