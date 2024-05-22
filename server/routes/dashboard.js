const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { isLoggedIn } = require("../middleware/checkAuth");

// GET / DASHBOARD
router.get("/dashboard", isLoggedIn, (req, res) => {
  res.locals.pageName = "dashboard";
  dashboardController.dashboard(req, res);
});

// GET / VIEW NOTE
router.get("/dashboard/item/:id", isLoggedIn, (req, res) => {
  res.locals.title = "View Note";
  res.locals.pageName = "view-note";
  dashboardController.dashboardViewNote(req, res);
});

// PUT / UPDATE NOTE
router.put("/dashboard/item/:id", isLoggedIn, (req, res) => {
  res.locals.title = "update Note";
  res.locals.pageName = "update-Note";
  dashboardController.dashboardUpdateNote(req, res);
});

// DELETE /  DELETE NOTE
router.delete("/dashboard/item-delete/:id", isLoggedIn, (req, res) => {
  res.locals.title = "Delete Note";
  res.locals.pageName = "delete-Note";
  dashboardController.dashboardDeleteNote(req, res);
});

// GET /  ADD NOTE
router.get("/dashboard/add", isLoggedIn, (req, res) => {
  res.locals.title = "Add Note";
  res.locals.pageName = "add-note";
  dashboardController.dashboardAddNote(req, res);
});

// POST / ADD NOTE
router.post("/dashboard/add", isLoggedIn, (req, res) => {
  res.locals.title = "Add Note";
  res.locals.pageName = "add-note";
  dashboardController.dashboardAddNoteSubmit(req, res);
});

// GET/  SEARCH
router.get("/dashboard/search", isLoggedIn, (req, res) => {
  res.locals.title = "Search Note";
  res.locals.pageName = "search-Note";
  dashboardController.dashboardSearch(req, res);
});

// POST/  SEARCH
router.post("/dashboard/search", isLoggedIn, (req, res) => {
  res.locals.title = "Search Note";
  res.locals.pageName = "search-Note";
  dashboardController.dashboardSearchSubmit(req, res);
});

module.exports = router;
