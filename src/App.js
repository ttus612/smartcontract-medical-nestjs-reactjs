import "./App.css";
import { useEffect } from "react";
import { loadAllData, loadMedical, loadNetwork, loadProvider, subscribeToEvent } from "./store/interactions";
import { useDispatch } from "react-redux";
import { Alert, Data, Form, Navbar, Option } from "./components";
import config from "./config.json";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    const medical_config = config[chainId].MedicalRecord;
    const medical = await loadMedical(
      provider,
      medical_config.address,
      dispatch
    );
    loadAllData(provider, medical, dispatch);
    subscribeToEvent(medical, dispatch);
    // console.log(medical);
    // console.log(provider);
  };

  useEffect(() => {
    loadBlockchainData();
  });
  return (
    <div className="App">
      <Navbar />
      <Option />
      <Routes>
        <Route path="/" exact element={<Form />} />
        <Route path="/Data" exact element={<Data />} />
      </Routes>
      <Alert />
    </div>
  );
}

export default App;
