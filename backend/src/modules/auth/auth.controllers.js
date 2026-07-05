import user from '../../database/models/user/user.model.js'
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userCreateByRegister = async (req, res) => {
    try {
        const { userName, firstName, lastName, email, phone, password } = req.body;
        // all conditions for register alredy check in middleware so can directly create user
        const salt = await bycrpt.genSalt(10);
        const hashPassword = await bycrpt.hash(password, salt);
        const newUser = new user({
            userName,
            firstName,
            lastName,
            email,
            phone,
            password: hashPassword
        });
        console.log("hello error ");
        //  save users 
        await newUser.save();
        
        
        // generate token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });   
        // set cookie
        setCookie(res, token);
        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};


//  login user 
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;   
        // all conditions for login alredy check in middleware so can directly login user
        const existingUser = await user.findOne({ email });
        // password checking 
        const isPasswordValid = await bycrpt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });   
        setCookie(res, token);
        res.status(200).json({ message: 'User logged in successfully' });


    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }   }


    export default userCreateByRegister ;



    // cookies set for login and register   
    const setCookie = (res, token) => {
        res.cookie('token', token, {    
            httpOnly: true, // This makes the cookie inaccessible to JavaScript (for security)
            secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
            sameSite: 'strict', // Adjust this based on your needs (e.g., 'lax' or 'none')
            maxAge: 3600000 // 1 hour
        });
    }