const User = require("../models/User");
const bcrypt = require("bcryptjs");


const addTeacher = async (req, res) => {
    try {
      console.log("Données reçues :", req.body); // Ajout du log pour voir les données envoyées
  
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
      }
  
      const existingTeacher = await User.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ message: "Cet email est déjà utilisé" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newTeacher = new User({
        fullName,
        email,
        password: hashedPassword,
        role: "teacher"
      });
  
      await newTeacher.save();
      res.status(201).json({ message: "Enseignant ajouté avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'enseignant :", error);
      res.status(500).json({ message: "Erreur lors de l'ajout de l'enseignant", error: error.message });
    }
  };
  

  

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des enseignants", error });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Enseignant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'enseignant", error });
  }
};

// Export correct des fonctions
module.exports = {
  addTeacher,
  getAllTeachers,
  deleteTeacher
};
