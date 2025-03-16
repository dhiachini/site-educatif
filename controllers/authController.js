const User = require("../models/User");
const Student = require("../models/Student"); // Import the Student model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body; // Ajout de `role`
  console.log("📌 Requête reçue:", req.body);

  try {
    // 🔎 Vérifier si tous les champs sont bien reçus
    if (!email || !password || !role) {
      console.log("❌ Champ(s) manquant(s) !");
      return res.status(400).json({ message: "Tous les champs sont requis !" });
    }

    console.log("📌 Email reçu:", email);
    console.log("📌 Mot de passe reçu:", password);
    console.log("📌 Rôle reçu:", role);

    let user;

    // 🔍 Recherche de l'utilisateur ou étudiant
    if (role === "student") {
      // Si le rôle est "student", chercher dans la collection `students`
      user = await Student.findOne({ email: email.toLowerCase().trim() });
    } else {
      // Sinon, chercher dans la collection `users`
      user = await User.findOne({ email: email.toLowerCase().trim(), role });
    }

    if (!user) {
      console.log("❌ Utilisateur/étudiant introuvable !");
      return res.status(400).json({ message: "Email ou mot de passe incorrect !" });
    }

    console.log("✅ Utilisateur/étudiant trouvé:", user);

    // 🔑 Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Mot de passe incorrect !");
      return res.status(400).json({ message: "Email ou mot de passe incorrect !" });
    }

    // 🔐 Création du token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Token généré:", token);

    // ✅ Réponse au frontend
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ Erreur serveur:", err);
    return res.status(500).json({ message: "Erreur serveur !" });
  }
};