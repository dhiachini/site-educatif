const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController"); // Vérifie ce chemin !

// Routes
router.post("/add", studentController.addStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.delete("/:id", studentController.deleteStudent);

// New routes for updating laboratoryResult and qcmResult
router.put("/:id/laboratoryResult", studentController.updateLaboratoryResult);
router.put("/:id/qcmResult", studentController.updateQcmResult);
router.get("/:id/laboratoryResult", studentController.getStudentLaboratoryResult);
router.get("/:id/qcmResult", studentController.getStudentQcmResult);
module.exports = router;