import asyncWrapper from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc  -   Login user data
// @Route  -   GET /api/v1
// @Access -   Public
export const signInUserController = asyncWrapper(async (req, res) => {
  //Get user credintials
  const { email, password } = req.body;

  //Find the user email
  const user = await User.findOne({ email });

  //Compare password and hash password
  const checkPassword = await user.matchPassword(password);

  //Check the user
  if (user && checkPassword) {
    //generate jwt token
    generateToken(res, user._id);

    res
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
      .status(200);
  } else {
    res.status(401);
    throw new Error("Invalid email or password! Please try again.");
  }
});

// @desc  -   Login user data
// @Route  -   GET /api/v1
// @Access -   Public
export const logOutUserController = (req, res) => {
  //Remove tokein in cookie jar
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ msg: "Logged out successfully!" });
};

// @desc  -   Register user
// @Route  -   POST /api/v1
// @Access -   Public
export const postUserController = asyncWrapper(async (req, res) => {
  // Get user data
  const { name, email, password } = req.body;

  //Search if user exist
  const userExist = await User.findOne({ email });

  //Throw an user exist error
  if (userExist) {
    res.status(400);
    throw new Error("User already exist!");
  }

  //create new user and save to db
  const user = await User.create({
    name,
    email,
    password,
  });

  //Check User
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invaild User!");
  }
});

// @desc  -   Update user data
// @Route  -   PUT /api/v1/:id
// @Access -   Private
export const updateUserController = asyncWrapper(async (req, res) => {
  res.status(200).json({ msg: "Update User" });
});

// @desc  -   Delete user data
// @Route  -   DELETE /api/v1/:id
// @Access -   Private
export const deleteUserController = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    res.status(400);
    throw new Error(`User ID of ${id} does not exist!`);
  }

  res.status(200).json({ _id: user._id });
});
