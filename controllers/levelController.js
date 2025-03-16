const Level = require("../models/Level");

// Ajouter un niveau
const addLevel = async (req, res) => {
  try {
    const { level } = req.body;

    if (!level) {
      return res.status(400).json({ message: "Le niveau est requis" });
    }

    const newLevel = new Level({ level });
    await newLevel.save();

    res.status(201).json({ message: "Niveau ajouté avec succès", newLevel });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du niveau", error });
  }
};

// Récupérer tous les niveaux
const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des niveaux", error });
  }
};

module.exports = {
  addLevel,
  getAllLevels,
};
