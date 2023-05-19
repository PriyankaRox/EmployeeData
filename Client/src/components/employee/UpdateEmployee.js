import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios";
import moment from "moment";

export default function UpdateEmployee(props) {
  const { id } = props;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [doj, setDoj] = useState("");
  const [martialStatus, setMartialStatus] = useState("");
  const [contactNo, setContactNo] = useState("");

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_HOST}/employee/` + id)
      .then((res) => {
        setName(res.data.name);
        setAddress(res.data.address);
        setEmail(res.data.email);
        setDob(res.data.dob);
        setGender(res.data.gender);
        setDoj(res.data.doj);
        setMartialStatus(res.data.martialStatus);
        setContactNo(res.data.contactNo);
      });
  }, []);

  const updateEmployee = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      address: address,
      email: email,
      dob: dob,
      gender: gender,
      doj: doj,
      martialStatus: martialStatus,
      contactNo: contactNo
    };
    axios
      .put(
        `http://${process.env.REACT_APP_HOST}/update-employee/` + id,
        formData
      )
      .then((res) => {
        console.log(res);
      });
    navigate("/view");
  };

  return (
    <div>
      <div>
        <h1
          className="text-center font-weight-bold textEmp"
          style={{ padding: "0.5em" }}
        >
          {" "}
          Employee update{" "}
        </h1>
        <h5>
          {" "}
          <Link to={"/"}>
            <button className="table-button" style={{ marginLeft: "40em" }}>
              Add Employee
            </button>
          </Link>
        </h5>
        <form onSubmit={updateEmployee}>
          <p>
            <label>Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </p>
          <p>
            <label>Address</label>
            <br />
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </p>
          <p>
            <label>Email</label> <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </p>
          <p>
            <label>Date of Birth</label> <br />
            <input
              type="date"
              name="dob"
              value={moment(dob).format("YYYY-MM-DD")}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </p>
          <p>
            <label>Gender</label>
            <br />
            <select onChange={(e) => setGender(e.target.value)}>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
          </p>
          <p>
            <label>Date of Joining</label> <br />
            <input
              type="date"
              name="doj"
              value={moment(doj).format("YYYY-MM-DD")}
              onChange={(e) => {
                setDoj(e.target.value);
              }}
            />
          </p>
          <p>
            <label>Martial Status</label>
            <br />
            <select onChange={(e) => setMartialStatus(e.target.value)}>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
          </p>
          <p>
            <label>Contact Number</label> <br />
            <input
              type="number"
              name="contactNo"
              value={contactNo}
              onChange={(e) => {
                setContactNo(e.target.value);
              }}
            />
          </p>
          <div>
            <Link to={"/view"}>
              <button className="table-button">Cancel</button>
            </Link>
            <div
              style={{ width: "4px", height: "auto", display: "inline-block" }}
            ></div>
            <button
              type="submit"
              value="updateEmployee"
              className="table-button"
              onClick={(e) => updateEmployee(e)}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
