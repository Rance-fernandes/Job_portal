const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
   jobId: { type: String, required: true, unique: true },
   jobTitle: { type: String, required: true },
   jobType: { type: String, required: true },
   company: { type: String, required: true },
   location: { type: String, required: true },
   description: { type: String, required: true },
   experienceLevel: { type: String, required: true },
   qualifications: [String],
   created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", JobSchema);
