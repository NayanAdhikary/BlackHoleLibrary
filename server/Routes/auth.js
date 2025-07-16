const express = require('express');
const {
    register, 
    login,
    getUserProfile,
    getAllUsers,
    updateUserById,
    deleteUserById,
    addUserByAdmin
} = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getUserProfile);
router.get("/all", protect, isAdmin, getAllUsers);
router.put("/update/:id", protect, updateUserById);
router.delete("/delete/:id", protect, isAdmin, deleteUserById);
router.post("/add", protect, isAdmin, addUserByAdmin);

module.exports = router;