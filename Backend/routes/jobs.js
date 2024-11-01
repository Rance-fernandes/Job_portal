const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getAllJobs);
router.get("/:id", auth, getJobById);
router.post("/", auth, createJob);
router.put("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

module.exports = router;
