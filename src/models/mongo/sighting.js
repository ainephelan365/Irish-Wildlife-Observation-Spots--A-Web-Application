import Mongoose from "mongoose";

const { Schema } = Mongoose;

const sightingSchema = new Schema({
  title: String,
  artist: String,
  duration: Number,
  spotid: {
    type: Schema.Types.ObjectId,
    ref: "spot",
  },
});

export const sighting = Mongoose.model("sighting", sightingSchema);
