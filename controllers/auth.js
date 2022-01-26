const jwt = require("jsonwebtoken");
const secret = "ejsjlgghel";

const generateWebToken = (user) => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  return jwt.sign(payload, secret);
};

const checkToken = (token) => {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { generateWebToken, checkToken };
