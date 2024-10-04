import "./App.css";
import React, { useState } from "react";
import CheckboxGroup from "./components/CheckboxGroup";

const App: React.FC = () => {
  const options = [
    { label: "選項1", value: "option1" },
    { label: "選項2", value: "option2" },
    { label: "選項3", value: "option3" },
    { label: "選項4", value: "option4" },
    { label: "選項5", value: "option5" },
    { label: "選項6", value: "option6" },
  ];

  const [columns, setColumns] = useState<number>(3);

  const handleChange = (selected: string[]) => {
    console.log("選中的項目:", selected);
  };

  // 增加欄數
  const increaseColumns = () => {
    setColumns((prev) => (prev < options.length ? prev + 1 : prev));
  };

  // 減少欄數
  const decreaseColumns = () => {
    setColumns((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="App">
      <h1>複選框組件</h1>

      {/* 欄數控制區域 */}
      <div
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        欄數：
        <button
          onClick={decreaseColumns}
          style={{ padding: "5px 10px", marginRight: "10px" }}
        >
          -
        </button>
        <label style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "20px", margin: "0 10px" }}>{columns}</span>
        </label>
        <button
          onClick={increaseColumns}
          style={{ padding: "5px 10px", marginLeft: "10px" }}
        >
          +
        </button>
      </div>

      {/* 複選框組件 */}
      <CheckboxGroup
        options={options}
        columns={columns}
        defaultSelected={["option1", "option3"]}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
