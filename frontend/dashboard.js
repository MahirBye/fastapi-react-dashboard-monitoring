import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Dashboard = ({ data }) => {
  if (!data.length) return <p>Data tidak tersedia</p>;

  const keys = Object.keys(data[0]);
  const xKey = keys[0];
  const yKey = keys[1];

  return (
    <div>
      <h2>📈 Data dari Google Sheets</h2>
      <table border="1">
        <thead>
          <tr>{keys.map((key) => <th key={key}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>{keys.map((key) => <td key={key}>{row[key]}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <h3>📊 Grafik</h3>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
