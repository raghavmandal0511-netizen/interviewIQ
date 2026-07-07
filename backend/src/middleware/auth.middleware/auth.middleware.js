import user from '../../database/models/user/user.model.js'

const authRegisterMiddleware = async (req, res, next) => {
    try {

        const { userName,  email, password } = req.body;


        //  all field is empty or not check
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //  email formate is check
        const emailRegX = /^[^\s]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegX.test(email)) {
            return res.status(400).json({ message: "invalid email formate " });
        }

        // check if user name already exits
        const exitenUserByUsername = await user.findOne({userName});
        if (exitenUserByUsername) {
            return res.status(400).json({ message: "user already exist username " });
        }
        // check if email is alrady exist
        const exitenUserByEmail = await user.findOne({ email });
        if (exitenUserByEmail) {
            return res.status(400).json({ message: "user already email exit" });
        }
            console.log("all passesd ");
            
        //  if all correct then moved to next
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// login middleware for user login validation


export const authLogginMiddleware = async (req, res, next) => {
    try {

            console.log("all passesd s");
        const { email, password } = req.body;
        //  all field check 
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //  email formate is check
        const emailRegX = /^[^\s]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegX.test(email)) {
            return res.status(400).json({ message: "invalid email formate " });
        }

        // check if email is exits or not 
        const exitenUserByEmail = await user.findOne({ email });
        
        
        if (!exitenUserByEmail) {
            return res.status(400).json({ message: "email is not exits" });
        }

        //  if all check complte then 
        next();
        console.log("middleware passed login");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export default authRegisterMiddleware;