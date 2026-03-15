import Mongoose from "mongoose";

const { Schema } = Mongoose;

const sightingSchema = new Schema({
  species: String,
  description: String,
  season: String,
  spotid: {
    type: Schema.Types.ObjectId,
    ref: "spot",
  },
});

export const sighting = Mongoose.model("sighting", sightingSchema);
