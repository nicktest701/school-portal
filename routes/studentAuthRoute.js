// server.js
require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const StudentAuth = require("../models/studentAuthModel");
const { sendVerificationEmail } = require("../config/mail/mails");
const Student = require("../models/studentModel");
const expressAsyncHandler = require("express-async-handler");

// Helper functions
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, user: user?.studentId, school: user?.school },
    process.env.JWT_SECRET,
    {
      // expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      expiresIn: "30d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, user: user?.studentId, school: user?.school },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Generate token helpers
const generateResetToken = () => crypto.randomBytes(20).toString("hex");

//@GET student by student id
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    //Personal Info
    const student = await Student.findById(id).populate("school");

    if (_.isEmpty(student)) {
      return res.status(400).json("No Such Student exists");
    }

    const { school, ...rest } = student;

    res.status(200).json({
      student: rest?._doc,
      school: student?.school,
    });
  })
);

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { studentId, password } = req.body;

  const student = await StudentAuth.findOne({ indexnumber: studentId });
  if (!student)
    return res.status(401).json({ message: "Invalid student ID or password" });

  const isMatch = await bcrypt.compare(password, student?.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid student ID or password" });
  const school = await Student.findById(student.studentId).select("school");

  const data = {
    ...student?._doc,
    school: school.school,
  };

  const accessToken = generateAccessToken(data);
  const refreshToken = generateRefreshToken(data);

  req.user = data;

  // Send refresh token in HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken, studentId: student.studentId });
});

// ✅ REFRESH TOKEN
router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const student = await StudentAuth.findById(decoded.id).select("-password");

    if (!student) return res.status(401).json({ message: "Invalid token" });
    const school = await Student.findById(decoded.studentId).select("school");

    const data = {
      ...student?._doc,
      school: school.school,
    };
    const newAccessToken = generateAccessToken(data);
    req.user = data;

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", { path: "/refresh" });
  res.sendStatus(204);
});

// ✅ Request reset
router.post("/reset-password-request", async (req, res) => {
  const { studentId } = req.body;

  const student = await StudentAuth.findOne({ indexnumber: studentId });
  if (!student) return res.status(404).json({ message: "Student not found" });

  const resetToken = generateResetToken();
  const expiry = new Date(Date.now() + 15 * 60 * 1000);

  student.resetToken = resetToken;
  student.resetTokenExpiry = expiry;
  await student.save();

  const sent = await sendVerificationEmail(student.email, resetToken);
  if (!sent) return res.status(500).json({ message: "Failed to send email" });

  res.json({ message: "Reset code sent" });
});

// ✅ Confirm code
router.post("/confirm-reset-code", async (req, res) => {
  const { studentId, code } = req.body;

  const student = await StudentAuth.findOne({
    indexnumber: studentId,
    resetToken: code,
  });
  if (!student || new Date() > student.resetTokenExpiry)
    return res.status(400).json({ message: "Invalid or expired token" });

  res.json({ message: "Code confirmed" });
});

// ✅ Reset password
router.post("/reset-password", async (req, res) => {
  const { studentId, newPassword } = req.body;

  const student = await StudentAuth.findOne({ indexnumber: studentId });
  if (!student) return res.status(404).json({ message: "Student not found" });

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  student.password = hashedPassword;
  student.resetToken = null;
  student.resetTokenExpiry = null;

  await student.save();
  res.json({ message: "Password reset successful" });
});

module.exports = router;
