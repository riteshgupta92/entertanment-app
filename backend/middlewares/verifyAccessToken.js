const jwt = require("jsonwebtoken");

const accessToken = (handler) => {
  return (req, res, next) => {
    console.log("re", req.headers);
    if (req.headers["authorization"].includes("Bearer")) {
      token = req.headers["authorization"].split(" ")[1];
    } else {
      token = req.headers["authorization"];
    }
    console.log("toke", token)
    if (!token) {
      return res.status(404).json({ message: "Token Not Found" });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      req.user = decoded;
      return handler(req, res, next); // Call the actual route handler
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
};

module.exports = accessToken;
