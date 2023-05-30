import jwt from "jsonwebtoken";
import asychHandler from "express-async-handler";
import User from "../model/userModel.js";

//Protection middleware
const protect = asychHandler(async (req, res, next) => {
  //Token variable
  let token;

  //Get jwt from cookie jar
  token = req.cookies.jwt;

  //Check token
  if (token) {
    try {
      //Decode jwt token into readable payload
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      //find user in the database and get all data except the password
      req.user = await User.findById(decoded.userId).select("-password");

      //go to next middleware
      next();
    } catch (error) {
      console.log(error);

      //Catch error
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

export { protect };
