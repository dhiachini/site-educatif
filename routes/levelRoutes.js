const express = require("express");
const { addLevel, getAllLevels } = require("../controllers/levelController");

const router = express.Router();

router.post("/addlevels", addLevel);
router.get("/alllevels", getAllLevels);

module.exports = router;
