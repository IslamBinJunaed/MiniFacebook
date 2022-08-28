import mongoose from "mongoose";
import timeStamps from "mongoose-timestamp";

const { Schema, model } = mongoose;
const storySchema = new Schema({});

storySchema.plugin(timeStamps);
export const Story = model("Story", storySchema);
