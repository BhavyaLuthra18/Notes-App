const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

/*--APP Routes -*/

// HOME PAGE /
router.get("/", mainController.homepage);

// ABOUT PAGE /
router.get("/about", mainController.about);

module.exports = router;
