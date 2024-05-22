// HOMEPAGE

exports.homepage = async (req, res) => {
  const locals = {
    title: "Nodejs Notes",
    description: "Free Nodejs Notes App",
  };
  res.render("index", {
    locals,
    layout: "../views/layouts/front-page",
  });
};

// ABOUT PAGE
exports.about = async (req, res) => {
  const locals = {
    title: "About - NodeJs Notes",
    description: "Free NodeJS Notes App.",
  };
  res.render("about", locals);
};
