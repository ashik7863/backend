const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
require("dotenv").config();
const playlists = require("./playlists");
const tblAdmission = require("./schema/admissionSchema");
const tblInstallment = require("./schema/installmentSchema");
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  const { user, email, mobile, designation, password, cpassword } = req.body;
  const userNameCheck = await playlists.findOne({ user: user });
  if (userNameCheck) {
    return res.json({ msg: "Username already used", status: false });
  }
  const emailCheck = await playlists.findOne({ email: email });
  if (emailCheck) {
    return res.json({ msg: "Email already used", status: false });
  }
  let data = new playlists({
    user,
    email,
    mobile,
    designation,
    password,
    cpassword,
  });
  await data.save();
  return res.json({
    msg: "Account Successfully Created, Please Login Now",
    status: true,
  });
});
app.post("/login", async (req, res) => {
  const { user, password } = req.body;
  const userCheck = await playlists.findOne({ user: user });
  if (!userCheck) {
    return res.json({ msg: "Incorrect Username", status: false });
  }
  let isMatch = await bcrypt.compare(password, userCheck.password);
  if (!isMatch) {
    return res.json({ msg: "Incorrect Password", status: false });
  }
  return res.json({
    status: true,
  });
});

app.post("/admission", async (req, res) => {
  const {
    admdate,
    formno,
    course,
    session,
    batch,
    studentname,
    fathername,
    village,
    postoffice,
    policestation,
    block,
    panchayet,
    district,
    pin,
    caste,
    dob,
    gender,
    stdcontact,
    guardcontact,
    stdaadhaar,
    stdwhatsapp,
    email,
  } = req.body;
  let data = new tblAdmission({
    admdate,
    formno,
    course,
    session,
    batch,
    studentname,
    fathername,
    village,
    postoffice,
    policestation,
    block,
    panchayet,
    district,
    pin,
    caste,
    dob,
    gender,
    stdcontact,
    guardcontact,
    stdaadhaar,
    stdwhatsapp,
    email,
  });
  await data.save();
  return res.json({
    msg: "Student Successfully Registered",
    status: true,
  });
});
app.get("/read", async (req, res) => {
  let data = await tblAdmission.find();
  res.send(data);
});
app.get("/viewstudent", async (req, res) => {
  let data = await tblAdmission.find();
  res.send(data);
});
app.get("/installment", async (req, res) => {
  let data = await tblAdmission.find();
  res.send(data);
});
app.post("/installment", async (req, res) => {
  const {
    formno,
    course,
    session,
    batch,
    studentname,
    instno,
    billno,
    instdate,
    instpay,
    instdue,
    instfine,
  } = req.body;
  let data = new tblInstallment({
    formno,
    course,
    session,
    batch,
    studentname,
    instno,
    billno,
    instdate,
    instpay,
    instdue,
    instfine,
  });
  await data.save();
  return res.json({
    msg: "Payment Successful",
    status: true,
  });
});
app.get("/viewinstallment", async (req, res) => {
  let data = await tblInstallment.find();
  res.send(data);
});

app.listen(process.env.PORT || 4000);
