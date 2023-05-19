import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import "./candidate.css";

function AddEmployee() {
  const [formName, setName] = useState("");
  const [formAddress, setAddress] = useState("");
  const [formEmail, setEmail] = useState("");
  const [formDob, setDob] = useState("");
  const [formGender, setGender] = useState("");
  const [formDoj, setDoj] = useState("");
  const [formMartialStatus, setMartialStatus] = useState("");
  const [formContactNo, setContactNo] = useState("");
  const [emptyposition, setemptyposition] = useState(false);
  const [emailempty, setemailempty] = useState(false);
  const [label, setlabel] = useState(false);
  const [empty, setempty] = useState(false);
  const [emptyName, setemptyName] = useState(false);
  const [emptyAddress, setemptyAddress] = useState(false);
  const [emptyEmail, setemptyEmail] = useState(false);
  const [emptyDob, setemptyDob] = useState(false);
  const [emptyGender, setemptyGender] = useState(false);
  const [emptyDoj, setemptyDoj] = useState(false);
  const [evalid, setevalid] = useState(false);
  const [emptyMartialStatus, setemptyMartialStatus] = useState(false);
  const [emptyContactNo, setemptyContactNo] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const addEmployee = async (e) => {
    try {
      e.preventDefault();
      if (
        formName &&
        formAddress &&
        formEmail &&
        formDob &&
        formGender &&
        formDoj &&
        formMartialStatus &&
        formContactNo
      ) {
        const usertoken = localStorage.getItem("token");
        setFormStatus("loading");
        const formData = {
          name: formName,
          address: formAddress,
          email: formEmail,
          dob: formDob,
          gender: formGender,
          doj: formDoj,
          martialStatus: formMartialStatus,
          contactNo: formContactNo
        };
        const apiData = await axios.post(
          `http://${process.env.REACT_APP_HOST}/add-employee`,
          formData,
          { headers: { token: usertoken } }
        );
        window.alert(apiData.data.message);
        if (apiData.status === 200) {
          console.log("employee added successfull");
          navigate("/view");
        }
      }
    } catch (err) {
      console.log(err);
      setFormStatus("error");
    }
  };
  function Validate() {
    var e = document.getElementById("dropdownMenu1"); //gender
    var v = document.getElementById("dropdownMenu2"); //status
    var strUser = e.options[e.selectedIndex].value;
    var strUser1 = v.options[v.selectedIndex].value;
    if (strUser === "Select here") {
      setemptyGender(true);
    } else {
      setemptyGender(false);
    }
    if (strUser1 === "Choose here") {
      setemptyposition(true);
    } else {
      setemptyposition(false);
    }
  }
  return (
    <form style={{ marginTop: "2em" }}>
      <div className="form-style p-4 mb-8 bg-white">
        <div className="form-group border-info mb-3">
          <h3 className="text-center font-weight-bold textEmp">Add Employee</h3>
          <h5>
            {" "}
            <Link to={"/view"}>
              <button className="table-button" style={{ marginLeft: "65em" }}>
                View Employee Table
              </button>
            </Link>
          </h5>
        </div>
        <div className="mb-3 row">
          <h6 className="col-2  textEmp required">Name </h6>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={formName}
              onChange={(e) => setName(e.target.value)}
              required={true}
              onBlur={(e) => {
                if (e.target.value !== "") {
                  setempty(false);
                  if (e.target.value.match(/(.*[a-zA-Z]){3}([^0-9]*)$/i)) {
                    setlabel(false);
                  } else {
                    setlabel(true);
                  }
                } else {
                  setempty(true);
                }
              }}
            />

            {empty === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {label === true ? (
              <p style={{ color: "red" }}> Please Enter Valid String </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-2  textEmp required">Address </h6>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={formAddress}
              onChange={(e) => setAddress(e.target.value)}
              required={true}
              onBlur={(e) => {
                if (e.target.value !== "") {
                  setemptyAddress(false);
                  if (e.target.value.match(/(.*[a-zA-Z]){3}([^0-9]*)$/i)) {
                    setlabel(false);
                  } else {
                    setlabel(true);
                  }
                } else {
                  setemptyAddress(true);
                }
              }}
            />
            {emptyAddress === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {label === true ? (
              <p style={{ color: "red" }}> Please Enter Valid String </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-2  textEmp required">Emailid</h6>
          <div className="col-sm-8">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="email"
              value={formEmail}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                if (e.target.value !== "") {
                  setemailempty(false);
                  if (
                    e.target.value.match(
                      /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/
                    )
                  ) {
                    setevalid(false);
                  } else {
                    setevalid(true);
                  }
                } else {
                  setemailempty(true);
                }
              }}
            />
            {emailempty === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}

            {evalid === true ? (
              <p style={{ color: "red" }}> Please Enter Valid Email Address </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-2  textEmp required">Date of Birth </h6>
          <div className="col-sm-8">
            <input
              type="Date"
              className="form-control"
              placeholder="Date of birth"
              value={formDob}
              onChange={(e) => setDob(e.target.value)}
              required={true}
              onBlur={(e) => {
                if (e.target.value !== "") {
                  setemptyDob(false);
                  if (
                    e.target.value.match(
                      /^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/
                    )
                  ) {
                    setlabel(false);
                  } else {
                    setlabel(true);
                  }
                } else {
                  setemptyDob(true);
                }
              }}
            />

            {emptyDob === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {label === true ? (
              <p style={{ color: "red" }}> Please Enter Valid Date </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row dropdown">
          <h6 className="col-2  textEmp required">Gender </h6>
          <div className="col-sm-8">
            <select
              className="select form-select form-select"
              style={{ width: "64em", height: "2.3em" }}
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onChange={(e) => setGender(e.target.value)}
              onBlur={(e) => Validate(e)}
            >
              <option>Select here</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {emptyGender === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-2  textEmp required">Date of Joining </h6>
          <div className="col-sm-8">
            <input
              type="Date"
              className="form-control"
              placeholder="Date of joining"
              value={formDoj}
              onChange={(e) => setDoj(e.target.value)}
              required={true}
              onBlur={(e) => {
                if (e.target.value !== "") {
                  setemptyDoj(false);
                  if (
                    e.target.value.match(
                      /^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/
                    )
                  ) {
                    setlabel(false);
                  } else {
                    setlabel(true);
                  }
                } else {
                  setemptyDoj(true);
                }
              }}
            />

            {emptyDoj === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {label === true ? (
              <p style={{ color: "red" }}> Please Enter Valid String </p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row dropdown">
          <h6 className="col-2  textEmp required">Martial Status </h6>
          <div className="col-sm-8">
            <select
              className="select form-select form-select"
              style={{ width: "64em", height: "2.3em" }}
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onChange={(e) => setMartialStatus(e.target.value)}
              onBlur={(e) => Validate(e)}
            >
              <option>Choose here</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {emptyposition === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <h6 className="col-2  textEmp required">Contact Number</h6>
          <div className="col-sm-8">
            <input
              type="Number"
              className="form-control"
              placeholder="Contact number"
              value={formContactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required={true}
              onBlur={(e) => {
                if (e.target.value !== "") {
                  setemptyContactNo(false);
                  if (e.target.value.match(/^\d{10}$/)) {
                    setlabel(false);
                  } else {
                    setlabel(true);
                  }
                } else {
                  setemptyContactNo(true);
                }
              }}
            />

            {emptyContactNo === true ? (
              <p style={{ color: "#F1C40F" }}>Empty field is not allowed</p>
            ) : (
              false
            )}
            {label === true ? (
              <p style={{ color: "red" }}> Please Enter Valid String </p>
            ) : (
              false
            )}
          </div>
        </div>

        <div className="d-grid gap-2 col-2 mx-auto">
          <p> </p>
          <button
            className="btn btn-primary btn-sm"
            type="submit"
            variant="info"
            onClick={(e) => addEmployee(e)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddEmployee;
