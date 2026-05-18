import Mongoose from "mongoose";
import { Review } from "./spot-review.js";

export const spotReviewMongoStore = {
  async getAllspotReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },

  async addReview(spotId, spotReviewData) {
    const newReview = new Review({
      title: spotReviewData.title,
      comment: spotReviewData.comment,
      category: spotReviewData.category,
      date: spotReviewData.date,
      userid: spotReviewData.userid,
      spotid: spotId,
    });

    const reviewObj = await newReview.save();
    return reviewObj;
  },

  async getReviewsBySpotId(id) {
    if (id) {
      const reviews = await Review.find({ spotid: id }).lean();
      return reviews;
    }
    return null;
  },

  async deleteReview(id) {
    try {
      await Review.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllReviews() {
    await Review.deleteMany({});
  },
};
