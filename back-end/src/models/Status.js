import mongoose from "mongoose";
import timeStamps from "mongoose-timestamp";
const { Schema, model } = mongoose;

const statusSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
});

statusSchema.plugin(timeStamps);
export const Status = model("Status", statusSchema);
