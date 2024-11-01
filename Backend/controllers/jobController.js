const Job = require("../models/Job");
// Get all jobs
// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log(jobs); // Logging the jobs without calling res.json
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error); // Added error logging
    res.status(500).json({ error: "Server error" });
  }
};


// Get a job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  const {
    jobId,
    jobTitle,
    jobType,
    company,
    location,
    description,
    experienceLevel,
    qualifications,
  } = req.body;
  try {
    const newJob = new Job({
      jobId,
      jobTitle,
      jobType,
      company,
      location,
      description,
      experienceLevel,
      qualifications,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update job details
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.json({ msg: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
