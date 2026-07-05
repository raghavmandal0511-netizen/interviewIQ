import user from '../../database/models/user/user.model.js'

const authRegisterMiddleware = async (req, res, next) => {
    try {

        const { userName, firstName, lastName, email, phone, password } = req.body;

            
        //  all field is empty or not check
        if (!userName || !firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //  email formate is check
        const emailRegX = /^[^\s]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegX.test(email)) {
            return res.status(400).json({ message: "invalid email formate " });
        }
        // phone number formate check
        const phoneRegX = /^\d{10}$/;
        if (!phoneRegX.test(phone)) {
            return res
                .status(400)
                .json({ message: "invalid phone number  formate  x " });
        }
        // check if user name already exits
        const exitenUserByUsername = await user.findOne({
            $or: [{ userName }, { email }, { phone }],
        });
        if (exitenUserByUsername) {
            return res.status(400).json({ message: "user already exist username " });
        }
        //  by phone nuber if already exits
        const exitenUserByPhone = await user.findOne({ phone });
        if (exitenUserByPhone) {
            return res
                .status(400)
                .json({ message: "user already phone number exits " });
        }
        // check if email is alrady exist
        const exitenUserByEmail = await user.findOne({ email });
        if (exitenUserByEmail) {
            return res.status(400).json({ message: "user already email exit" });
        }
        
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

        const {email, password} = req.body;
        //  all field check 
        if(!email || !password){
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



export default authRegisterMiddleware ;