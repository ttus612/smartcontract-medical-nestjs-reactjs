import React, { useState } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { submitRecord } from "../../store/interactions";

const Form = () => {
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const dispatch = useDispatch();
  const medical = useSelector((state) => state.medical.contract);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    await submitRecord(
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      provider,
      medical,
      dispatch
    );
    setName(0);
    setAge(0);
    setGender(0);
    setBloodType(0);
    setAllergies(0);
    setDiagnosis(0);
    setTreatment(0);
    
  };

  const [name, setName] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(0);
  const [bloodType, setBloodType] = useState(0);
  const [allergies, setAllergies] = useState(0);
  const [diagnosis, setDiagnosis] = useState(0);
  const [treatment, setTreatment] = useState(0);
  return (
    <div className="login-container">
      {account ? (
        <form onSubmit={submitHandler}>
          <h1>Patient Detail</h1>
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name === 0 ? "" : name}
            placeholder="Enter Patient Name"
          />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            required
            onChange={(e) => setAge(e.target.value)}
            value={age === 0 ? "" : age}
            placeholder="Enter Patient Age"
          />
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            required
            onChange={(e) => setGender(e.target.value)}
            value={gender === 0 ? "" : gender}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="bloodType">Blood type:</label>
          <input
            type="text"
            name="bloodType"
            id="bloodType"
            required
            onChange={(e) => setBloodType(e.target.value)}
            value={bloodType === 0 ? "" : bloodType}
            placeholder="Enter Patient bloodType"
          />
          <label htmlFor="allergies">Allergies:</label>
          <input
            type="text"
            name="allergies"
            id="allergies"
            required
            onChange={(e) => setAllergies(e.target.value)}
            value={allergies === 0 ? "" : allergies}
            placeholder="Enter Patient allergies"
          />
          <label htmlFor="diagnosis">Diagnosis</label>
          <input
            type="text"
            name="diagnosis"
            id="diagnosis"
            required
            onChange={(e) => setDiagnosis(e.target.value)}
            value={diagnosis === 0 ? "" : diagnosis}
            placeholder="Enter Patient diagnosis"
          />
          <label htmlFor="treatment">Treatment:</label>
          <input
            type="text"
            name="treatment"
            id="treatment"
            required
            onChange={(e) => setTreatment(e.target.value)}
            value={treatment === 0 ? "" : treatment}
            placeholder="Enter Patient treatment"
          />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <h1>Connect the account first</h1>
      )}
    </div>
  );
};

export default Form;
