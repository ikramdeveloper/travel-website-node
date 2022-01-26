const auth = require("../controllers/auth");

const checkAuth = (req, resp, next) => {
  const token = req.cookies["auth_token"];
  if (token && auth.checkToken(token)) {
    next();
  } else {
    resp.status(400);
    resp.send("Not authorized");
  }
};

module.exports = checkAuth;
