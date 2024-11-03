const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,applyForJob,getAppliedJobs,revokeApplication
} = require("../controllers/jobController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getAllJobs);
router.get("/:id", auth, getJobById);
router.post("/", auth, createJob);
router.put("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

// Route to apply for a job
router.post('/apply',auth, applyForJob);
router.get('/applied-jobs/:email',getAppliedJobs);
router.delete('/revoke/:jobId', auth,revokeApplication);


module.exports = router;
