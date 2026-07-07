import {Router} from 'express';
import verifyToken from '../../middleware/auth.middleware/verifyToken.middleware.js';
import getUserProfile from './user.controller.js';

const router = Router();


const userProfileRoute = router.get('/api/user/profile', [verifyToken], getUserProfile );


export default userProfileRoute;