const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// Ajouter un élève
const addStudent = async (req, res) => {
  try {
    const { level, fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      level,
      fullName,
      email,
      password: hashedPassword,
      role: "student", // Par défaut
      laboratoryResult: null, // Par défaut
      qcmResult: null, // Par défaut
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
    });

    await newStudent.save();
    res
      .status(201)
      .json({ message: "Élève ajouté avec succès", student: newStudent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de l'élève", error });
  }
};

// Récupérer tous les élèves
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ role: "student" });
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des élèves", error });
  }
};

// Récupérer un élève par ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    res.status(200).json({ message: "Élève trouvé", student });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'élève", error });
  }
};

// Supprimer un élève
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Élève supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'élève", error });
  }
};

// Mettre à jour laboratoryResult
const updateLaboratoryResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { laboratoryResult } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      { laboratoryResult },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    res
      .status(200)
      .json({ message: "Résultat laboratoire mis à jour", student });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du résultat laboratoire",
      error,
    });
  }
};

const updateQcmResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { qcmResult, q1, q2, q3, q4, q5 } = req.body;

    // Create an update object with the fields that are provided in the request
    const updateFields = {};
    if (qcmResult !== undefined) updateFields.qcmResult = qcmResult;
    if (q1 !== undefined) updateFields.q1 = q1;
    if (q2 !== undefined) updateFields.q2 = q2;
    if (q3 !== undefined) updateFields.q3 = q3;
    if (q4 !== undefined) updateFields.q4 = q4;
    if (q5 !== undefined) updateFields.q5 = q5;

    // Update the student document with the provided fields
    const student = await Student.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    res.status(200).json({ message: "Résultats QCM mis à jour", student });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour des résultats QCM",
      error: error.message,
    });
  }
};

const getStudentLaboratoryResult = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    res.status(200).json({ laboratoryResult: student.laboratoryResult });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du résultat laboratoire",
      error,
    });
  }
};

const getStudentQcmResult = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }

    res.status(200).json({ qcmResult: student.qcmResult });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du résultat laboratoire",
      error,
    });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateLaboratoryResult,
  updateQcmResult,
  getStudentLaboratoryResult,
  getStudentQcmResult,
};
