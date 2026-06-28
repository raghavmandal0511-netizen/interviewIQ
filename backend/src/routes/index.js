    import {Router} from 'express';
    import registerRoute from './authRoute/userAuthRoutes.js';
    import loginRoute from './authRoute/userAuthRoutes.js';


    const router = Router();
    router.get('/',(req,res)=>{
        res.json({message : "welcome to my interviewIQ"})
    })

    router.use(registerRoute);
    router.use(loginRoute);

    export default router;