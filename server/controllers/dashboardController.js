const Note = require("../models/Notes");
const mongoose = require("mongoose");

// GET/
// DASHBOARD

exports.dashboard = async (req, res) => {
  // await insertDymmyCatergoryData();
  // pagination
  let perPage = 8;
  let page = req.query.page || 1; // if not get any query then set it to the first page

  const locals = {
    pageName: "dashboard",
    title: "Dashboard",
    description: "Free Nodejs Notes App",
  };

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const notes = await Note.aggregate([
      {
        $sort: {
          updatedAt: -1, // newest note first
        },
      },
      {
        $match: { user: userId },
      },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] }, // 30 characters of the title
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Note.countDocuments({ user: userId });
    res.render("dashboard/index", {
      userName: req.user.firstName,
      user: req.user,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
      req,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET /
// VIEW SPECIFIC NOTE

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",

      req,
    });
  } else {
    res.send("Something went wrong.");
  }
};

// PUT /
// UPDATE SPECIFIC NOTE

exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now(),
      }
    ).where({
      user: req.user.id,
    });

    req.session.message = {
      type: "success",
      intro: "success !",
      message: "Note updated successfully.",
    };
    res.redirect("/dashboard"), req;
  } catch (error) {
    console.log(error);
    req.session.message = {
      type: "success",
      intro: "success !",
      message: "Error Updating Note ☹️.Please try again later !!",
    };
  }
};

// DELETE/
// DELETE NOTE

exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({
      _id: req.params.id,
    }).where({
      user: req.user.id,
    });
    req.session.message = {
      type: "success",
      intro: "success !",
      message: "Note deleted successfully.",
    };
    res.redirect("/dashboard"), req;
  } catch (error) {
    console.log(error);
    req.session.message = {
      type: "danger",
      intro: "Error",
      message: "Errorr deleting Note. Please try again later",
    };
  }
};

// GET /
// ADD NOTES

exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
    req,
  });
};

// POST/
// ADD NOTE

exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    req.session.message = {
      type: "success",
      intro: "success !",
      message: "Note added successfully.",
    };
    res.redirect("/dashboard"), req;
  } catch (error) {
    console.log(error),
      (req.session.message = {
        type: "danger",
        intro: "Error !",
        message: "There was an error adding the note.",
      });
  }
};

//F GET /
// SEARCH

exports.dashboardSearch = async = (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",

      layout: "../views/layouts/dashboard",
      req,
    });
  } catch (error) {
    console.log(error);
    req.session.message = {
      type: "danger",
      intro: "Error !",
      message: "No Note with that name ☹️",
    };
  }
};

// POST/
// SEARCH FOR NOTES

exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, ""); // to remove bad characters
    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,

      layout: "../views/layouts/dashboard",
      req,
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to insert dummy category data
/*async function insertDymmyCatergoryData() {
  try {
    const insertedNotes = await Note.insertMany([
      {
        user: "664723dbe5dda047a8c26743",
        title: "Nodejs Notes",
        body: "Node.js is a open source server environment. Node.js is cross-platform",
        createdAt: new Date(),
      },
      {
        user: "664723dbe5dda047a8c26743",
        title: "Morgan",
        body: "Morgan is a Node.js middleware to log http requests",
        createdAt: new Date(),
      },
    ]);
    console.log("Inserted notes:", insertedNotes);
  } catch (error) {
    console.log("err", error);
  }
}
*/
