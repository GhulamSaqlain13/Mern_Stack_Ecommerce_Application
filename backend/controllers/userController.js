import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide name, email, password " });
    }

    const alreadyExistingUser = await User.findOne({ email });
    if (alreadyExistingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists!" });
    }

    const user = await User.create({
      name,
      email,
      password,
      // role,
    });
    // generate JWT token and set it in cookie
    const token = user.getJWTToken();
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(201).json({
      success: true,
      user,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password!" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }
    // generate JWT token and set it in cookie
    const token = user.getJWTToken();
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ success: true, user, token, message: "User Login successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      // expires: new Date(Date.now()),
      expires: new Date(0),
      httpOnly: true,
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({ success: true, user, message: "User get successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
