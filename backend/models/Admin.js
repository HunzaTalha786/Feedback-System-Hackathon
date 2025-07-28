import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: String, //admin
  password: String, // admin123
});

export default mongoose.model("Admin", adminSchema);