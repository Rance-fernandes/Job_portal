const Job = require("../models/Job");
const User = require('../models/User');
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
    console.log(req.body); // Log the incoming data for debugging
    
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,           // Return the updated job document
      runValidators: true  // Ensures validation is applied to updated fields
    });

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.status(200).json(job); // Send updated job data as response
  } catch (error) {
    console.error("Error updating job:", error); // Log the error
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


exports.applyForJob = async (req, res) => {
  const { email, jobId } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the job ID is already in the applied jobs
    if (user.appliedJobs.includes(jobId)) {
      return res.status(400).json({ message: 'Job already applied' });
    }

    // Add the job ID to the user's applied jobs
    user.appliedJobs.push(jobId);
    await user.save();

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAppliedJobs = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('appliedJobs');
    if (user) {
      res.json(user.appliedJobs);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applied jobs', error });
  }
};

// Revoke job application controller function
exports.revokeApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { email } = req.query;

    // Find the user by email and update their applied jobs
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ msg: "User not found" });
    }

    // Remove the job from the user's applied jobs list
    const jobIndex = user.appliedJobs.findIndex(
      (appliedJob) => appliedJob.toString() === jobId
    );
    if (jobIndex === -1) {
      return res.status(404).json({ msg: "Job application not found" });
    }

    user.appliedJobs.splice(jobIndex, 1); // Remove the job
    await user.save();

    res.status(200).json({ msg: "Application revoked successfully" });
  } catch (error) {
    console.error("Error revoking job application:", error);
    res.status(500).json({ error: "Server error" });
  }
};