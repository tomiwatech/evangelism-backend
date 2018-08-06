import { Router } from 'express';
import ConvertController from '../../controllers/evangelism/convertController';
import validator from '../../middlewares/validators/token';
import {
    validateConvertRegistration
} from '../../middlewares/validators/user';

const router = Router();

router.get('/converts/count', validator.verifyToken, ConvertController.countAll);
router.get('/converts/:id', validator.verifyToken, ConvertController.findConvert);
router.post('/converts', validator.verifyToken, validateConvertRegistration, ConvertController.create);
router.get('/converts', validator.verifyToken, ConvertController.getAll);

export default router;
