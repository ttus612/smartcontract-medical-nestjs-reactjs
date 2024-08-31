import React from "react";
import "./data.css";
import { useDispatch, useSelector } from "react-redux";
import { dataBookSelector } from "../../store/selectors";
import { deleteData } from "../../store/interactions";

const Data = () => {
  const account = useSelector((state) => state.provider.account);
  const orderData = useSelector(dataBookSelector);
  const medical = useSelector((state) => state.medical.contract);
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);

  const deleteHandler = (e, data) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteData(medical, data.recordId, dispatch, provider);
    } else {
      console.log("Record not deleted");
    }
  };
  return (
    <div>
      {account ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Date and Time</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Type</th>
                <th>Allergies</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orderData &&
                orderData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.formattedTimestamp}</td>
                      <td>{data.name}</td>
                      <td>{data.ageNew}</td>
                      <td>{data.gender}</td>
                      <td>{data.bloodType}</td>
                      <td>{data.allergies}</td>
                      <td>{data.diagnosis}</td>
                      <td>{data.treatment}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={(e) => deleteHandler(e, data)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Connect to account</h1>
      )}
    </div>
  );
};

export default Data;
