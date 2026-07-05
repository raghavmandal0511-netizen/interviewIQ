/* @author raghav 
this file will contain the schema for the user collection in MongoDB. It will define the structure of the user document and the data types of each field. It will also define any validation rules for the fields.
*/


import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mailVerified: {
        type: Boolean,
        default: false
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    phoneVerified: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        required: true
    }
    

}, { timestamps: true, versionKey: false })

export default mongoose.model('User', userSchema)
