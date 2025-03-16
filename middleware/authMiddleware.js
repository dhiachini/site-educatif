const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis l'en-tête de la requête
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Ajouter les données décodées à la requête
    next(); // Passer au middleware ou au contrôleur suivant
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré." });
    }
    return res.status(401).json({ message: "Token invalide." });
  }
};

module.exports = authMiddleware;