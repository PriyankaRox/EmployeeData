const { Employee } = require("../model/employeeSchema");

//create employees
const createEmployee = async (req, res, next) => {
  try {
    const { name, address, email, dob, gender, doj, martialStatus, contactNo } =
      req.body;
    const newData = new Employee({
      name,
      address,
      email,
      dob,
      gender,
      doj,
      martialStatus,
      contactNo
    });
    const savedData = await newData.save();
    if (!savedData) {
      res.json({ message: "New Employee Not Saved" });
    } else {
      const returnData = JSON.parse(JSON.stringify(savedData));
      returnData.id = returnData._id;
      delete returnData._id;
      delete returnData.__v;
      res.json({
        message: "New Employee added successfully",
        Employee: returnData
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(400).json({ message: "Error occured" });
  }
};

//fetch employees
const viewEmployee = async (req, res) => {
  try {
    const fetchEmployee = await Employee.find({ id: req.params._id });
    if (!fetchEmployee) {
      res.status(400).json({ error: "Employee does not exists" });
    } else {
      res.send(fetchEmployee);
    }
  } catch (err) {
    console.error("Error occurred:", error);
    res.status(400).send({ err: "server error" });
  }
};

//update employee
const updateEmployee = (req, res) => {
  try {
    let updatedtask = Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
      console.log(err)
    res.status(400).send({ err: "server error" });
  }
};

//delete employee
const deleteEmployee = (req, res) => {
   Employee.deleteOne({ _id: req.params.id })
    .then((data) =>{
      res.status(200).json({ message: "Employee deleted successfully" })
      console.log("data",data)}
    )
    .catch((err) =>{
      res.status(400).json(err, { message: "Employee deletion failed" })
      console.log("err",err)
    }
    );
    
};

const getEmployee = (req, res) => {
  Employee
    .findOne({ _id: req.params.id })
    .then((onetask) => res.json(onetask))
    .catch((err) => res.json(err));
};

module.exports = {
  createEmployee,
  viewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
};
