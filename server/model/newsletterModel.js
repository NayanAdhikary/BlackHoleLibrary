const mongoose = require("mongoose");

const newsletterModelSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter a valid email address"
        ]
    },
    subcribeAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Newsletter", newsletterModelSchema);