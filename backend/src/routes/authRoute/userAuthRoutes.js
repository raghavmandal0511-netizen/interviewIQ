import {Router} from 'express';
import userCreateByRegister from '../../controller/authUserController.js';
import {userLogin} from '../../controller/authUserController.js';
import authRegisterMiddleware from '../../middleware/authUserMiddleware.js';
import {authLogginMiddleware} from '../../middleware/authUserMiddleware.js';

const router = Router();

const  registerRoute = router.post('/api/userAuth/register', [authRegisterMiddleware],userCreateByRegister);
export const  loginRoute = router.post('/api/userAuth/login', [authLogginMiddleware],userLogin);

export default registerRoute;