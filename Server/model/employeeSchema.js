const mongoose = require("mongoose");

// Employee Name , Employee Address , Employee Email , Employee DOB , 
// Employee Gender , Employee Date of joining , Employee Martial status , Employee Contact No
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    doj: {
      type: Date,
      required: true,
    },
    martialStatus: {
      type: String,
      required:true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee };
