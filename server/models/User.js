const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sports: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'], // Basic email validation
    },
    phone: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for the password
    },
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {

    if (!this.isModified('password')) return next();

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
