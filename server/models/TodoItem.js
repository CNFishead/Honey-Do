import mongoose from "mongoose";

const Todo = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Item", Todo);
