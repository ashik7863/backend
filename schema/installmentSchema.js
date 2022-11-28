const mongoose = require("mongoose");
const tblInstallment = new mongoose.Schema({
  formno: Number,
  course: String,
  session: String,
  batch: String,
  studentname: String,
  instno: String,
  billno: Number,
  instdate: Date,
  instpay: Number,
  instdue: Number,
  instfine: Number,
});
module.exports = mongoose.model("installment", tblInstallment);
