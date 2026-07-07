    import {Router} from 'express';
    import registerRoute from '../modules/auth/auth.routes.js';
    import {loginRoute} from '../modules/auth/auth.routes.js';
    import userProfileRoute from '../modules/user/user.routes.js';


    const router = Router();
    router.get('/',(req,res)=>{
        res.json({message : "welcome to my interviewIQ"})
    })

    router.use(registerRoute);
    router.use(loginRoute);
    
    router.use(userProfileRoute);
    export default router;