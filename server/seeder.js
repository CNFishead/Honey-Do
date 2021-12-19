import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

// Load model
import User from "./models/User.js";

// Connect DB
await mongoose.connect(process.env.MONGO_URI);

// data
import { Users } from "./data/Users.js";

// Import into DB
const importData = async () => {
  try {
    await User.create(Users);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (e) {
    console.error(e);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (e) {
    console.error(e);
  }
};

if (process.argv[2] === "-D") {
  deleteData();
} else {
  importData();
}
