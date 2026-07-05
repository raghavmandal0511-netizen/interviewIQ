import {Router} from 'express';
import userCreateByRegister from './auth.controllers.js';
import {userLogin} from './auth.controllers.js';
import authRegisterMiddleware from '../../middleware/auth.middleware/auth.middleware.js';
import {authLogginMiddleware} from '../../middleware/auth.middleware/auth.middleware.js';

const router = Router();

const  registerRoute = router.post('/api/userAuth/register', [authRegisterMiddleware],userCreateByRegister);
export const  loginRoute = router.post('/api/userAuth/login', [authLogginMiddleware],userLogin);

export default registerRoute;