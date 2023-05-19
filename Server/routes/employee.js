const router = require("express").Router();
const { createEmployee, viewEmployee, updateEmployee, deleteEmployee, getEmployee } = require("../controller/employeeController");

//route to create new employee
router.post("/add-employee", createEmployee); 

//route to get employee
router.get("/fetch-employee", viewEmployee); 

//route to update employee
router.put("/update-employee/:id", updateEmployee);

//router to delete employee
router.delete("/delete-employee/:id/delete", deleteEmployee);

//router to get each employee
router.get("/employee/:id", getEmployee);

module.exports = router;

