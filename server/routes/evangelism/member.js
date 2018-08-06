import { Router } from 'express';
import memberController from '../../controllers/evangelism/memberController';
import validator from '../../middlewares/validators/token';
import {
    validateMemberRegistration
} from '../../middlewares/validators/user';

const router = Router();

router.get('/members/count', validator.verifyToken, memberController.countAll);
router.get('/members/:id', validator.verifyToken, memberController.findMember);
router.post('/members', validator.verifyToken, validateMemberRegistration, memberController.create);
router.get('/members', validator.verifyToken, memberController.getAll);

export default router;
