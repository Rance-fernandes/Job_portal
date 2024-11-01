const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
   const token = req.header("Authorization");

   if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

   try {
      const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
     
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      res.status(401).json({ msg: "Token is not valid" });
   }
};

module.exports = auth;
