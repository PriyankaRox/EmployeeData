import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import moment from "moment";

export default function deleteEmployee() {
  const deleteTask = (taskID) => {
    axios
      .delete(`http://${process.env.REACT_APP_HOST}/delete-employee`)
      .then((res) => {
        console.log(res);
      });
    window.location.reload(true);
  };

  return (
    <div className={styles.background}>
      <div className={styles.formDisplay}>
        <h1 className={styles.h1}>My Tasks</h1>
        <table>
          <tr>
            <th className={styles.text}>Task Title</th>
            <th className={styles.text}>Due Date</th>
            <th className={styles.text}>Priority Level</th>
            <th></th>
          </tr>
          {props.tasks.map((task, idx) => {
            var inputDate = task.due;
            var outputDate = moment(inputDate).format("dddd, MMM DD");
            if (task.priority == "3High")
                  return (
                    <>
                      <tr key={idx}>
                        <td className={styles.tbtext}>
                          <Link
                            to={"/tasks/" + task._id}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {task.title}
                          </Link>
                        </td>
                        <td className={styles.tbtext}>{outputDate}</td>
                        <td className={styles.High}>{task.priority.slice(1,5)}</td>
                        <td>
                          <button
                            onClick={(e) => {
                              deleteTask(task._id);
                            }}
                            className={styles.btn}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                  
          })}
        </table>
      </div>
    </div>
  );
};
