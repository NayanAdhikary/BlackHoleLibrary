const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./Routes/auth"));
app.use("/api/books", require("./Routes/books"));
app.use("/api/rent", require("./Routes/rentRoutes"));
app.use("/api/reviews", require("./Routes/reviews"));
app.use("/api/users", require("./Routes/auth"));
app.use("/api/newsletter", require("./Routes/newsletter"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on port: ${PORT}`)
);
