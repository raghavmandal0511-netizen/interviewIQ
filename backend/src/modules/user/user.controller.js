import user from '../../database/models/user/user.model.js'

const getUserProfile = async (req, res) => {
    try {

        const userId = req.user.id;
        const userProfile = await user.findById(userId).select('-password'); // Exclude password from the response
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            userProfile });
    }
    catch (error) {
        success: false,
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default getUserProfile;