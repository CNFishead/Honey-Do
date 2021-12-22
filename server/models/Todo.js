import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    todoItems: {
      type: [Object],
    },
    // Create a relationship between Todo Lists and User
    user: {
      // the type is an Object ID, the id is created by mongoose
      type: mongoose.Schema.Types.ObjectId,
      // ref, refers to a collection
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);
