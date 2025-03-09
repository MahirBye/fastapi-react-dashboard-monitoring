import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from ".Dashboard";

function App() {
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/sheets")
      .then((res) => setSheets(res.data.sheets))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedSheet) {
      axios.get(`http://127.0.0.1:8000/data/${selectedSheet}`)
        .then((res) => setData(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [selectedSheet]);

  return (
    <div>
      <h1>📊 Google Sheets Dashboard</h1>
      <select onChange={(e) => setSelectedSheet(e.target.value)}>
        <option value="">Pilih Sheet</option>
        {sheets.map((sheet) => (
          <option key={sheet} value={sheet}>{sheet}</option>
        ))}
      </select>
      {selectedSheet && <Dashboard data={data} />}
    </div>
  );
}

export default App;
