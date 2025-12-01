import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: [3, 'User name must be at least 3 characters long'],
        maxLength: [50, 'User name must be at most 50 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;