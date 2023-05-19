import React, { useState, useEffect } from "react";
import axios from "axios";
import "./emp.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { navigate, Link } from "@reach/router";
import moment from "moment";

export default function ViewEmployee() {
  const [userList, setUserlist] = useState([]);
  const [pagesize, setpagesize] = useState(6);
  const [currentpage, setcurrentpage] = useState(1);

  const fetchEmployee = () => {
    const usertoken = localStorage.getItem("token");
    axios
      .get(`http://${process.env.REACT_APP_HOST}/fetch-employee`, {
        headers: { token: usertoken }
      })
      .then((res) => {
        setUserlist(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const deleteEmployee = (employeeID) => {
    let result = axios
      .delete(
        `http://${process.env.REACT_APP_HOST}/delete-employee/` +
          employeeID +
          `/delete`
      )
      .then((res) => {
        console.log(res);
      });
    window.location.reload(true);
    // navigate("/view");
  };

  return (
    <span>
      <h3
        className="text-center font-weight-bold textEmp"
        style={{ padding: "0.5em" }}
      >
        Employee Table
      </h3>
      <h5>
        {" "}
        <Link to={"/"}>
          <button className="table-button" style={{ marginLeft: "70em" }}>
            Add Employee
          </button>
        </Link>
      </h5>
      <MDBTable>
        <MDBTableHead color="special-color" textWhite>
          <tr>
            <th>Slno</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Date of Joining</th>
            <th>Martial Status</th>
            <th>Contact No</th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {userList?.length &&
            userList?.map((v, index) => (
              <tr key={v.id}>
                <td>{index + (currentpage - 1) * pagesize + 1}</td>
                <td>{v.name}</td>
                <td>{v.address}</td>
                <td>{v.email}</td>
                <td>{moment(v.dob).format("YYYY-MM-DD")}</td>
                <td>{v.gender}</td>
                <td>{moment(v.doj).format("YYYY-MM-DD")}</td>
                <td>{v.martialStatus}</td>
                <td>{v.contactNo}</td>
                <td>
                  <Link
                    to={"/update/" + v._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <button className="table-button">Update</button>
                  </Link>
                  <span style={{ marginLeft: "5px" }}></span>
                  <Link
                    to={"/view" + v._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <button
                      className="table-button"
                      type="submit"
                      onClick={(e) => {
                        deleteEmployee(v._id);
                      }}
                    >
                      Delete
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    </span>
  );
}
