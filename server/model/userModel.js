const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone numeber"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minilength: [6, "Password must be at least 6 charecters"],
  },
  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(){
  if(!this.isModified("password"))return;
  this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model('User', userSchema);
