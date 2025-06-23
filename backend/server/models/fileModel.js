import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  originalname: String,
  uploadDate: { type: Date, default: Date.now },
  parsedData: Array,
});

export default mongoose.model("File", fileSchema);
