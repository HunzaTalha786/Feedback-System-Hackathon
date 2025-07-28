// import Feedback from "../models/Feedback.js";

// export const submitFeedback = async (req, res) => {
//   try {
//     const feedback = new Feedback(req.body);
//     await feedback.save();
//     res.status(201).json({ message: "Feedback submitted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error submitting feedback" });
//   }
// };

// export const getAllFeedbacks = async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find().sort({ createdAt: -1 });
//     res.status(200).json(feedbacks);
//   } catch (err) {
//     res.status(500).json({ message: "Error retrieving feedbacks" });
//   }
// };

import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const { course = "", page = 1, limit = 5 } = req.query;

    const query = course ? { course: { $regex: course, $options: "i" } } : {};

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Feedback.countDocuments(query);

    res.status(200).json({ feedbacks, total });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving feedbacks" });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting feedback" });
  }
};
