// FOR USER LOGGED IN  AND IF NOT LOGGED DENY ACCESS
exports.isLoggedIn = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).render("../views/dashboard/accessDenied", {
      title: "Access Denied",
      pageName: "Access Denied",
    });
  }
};
