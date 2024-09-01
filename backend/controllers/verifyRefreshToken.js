const jwt = require("jsonwebtoken");

const refreshToken = (req, res, next) => {
  // generate access token
  const access_token = jwt.sign(req.user, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "15m", // token will expires in 15 minutes
  });
  // generate refresh token
  const refresh_token = jwt.sign(req.user, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "1d", // token will expires in 1 day
  });
  return res.status(200).json({
    message: "Refresh Token Generated",
    access_token,
    refresh_token,
  });
};

module.exports = {
  refreshToken,
};
