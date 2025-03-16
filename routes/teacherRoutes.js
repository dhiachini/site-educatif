const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController"); // Assure-toi que le chemin est correct



// Routes
router.post("/add", teacherController.addTeacher);
router.get("/", teacherController.getAllTeachers);
router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;
