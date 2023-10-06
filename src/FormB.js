import React from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "./App";
export default function FormB(props) {
  const {
    setcurrentform,
    selectedAccount,
    value1,
    setvalue1,
    value2,
    setvalue2,
    value3,
    setvalue3,
    value4,
    setvalue4,
    value5,
    setvalue5,
    value6,
    setvalue6,
    value7,
    setvalue7,
    value8,
    setvalue8,
    value9,
    setvalue9,
    value10,
    setvalue10,
  } = useContext(UserContext);
  useEffect(() => {
    setcurrentform("b");
  }, []);
  function handleFormChange(e, func) {
    func(e.target.value);
  }

  return (
    <div className="forms">
      <input type="file" accept=".pdf" onChange={props.handleFileChange1} />
      <input type="button" onClick={props.handleFileChange} />
      <br></br>
      <h3>Form B</h3>
      <h3>{selectedAccount}</h3>
      <div className="formsflex">
        <label for="Value1input">Value1</label>

        <input
          id="Value1input"
          type="text"
          value={value1}
          onChange={(e) => handleFormChange(e, setvalue1)}
        />
        <label for="Value2input">Value2</label>
        <input
          id="Value2input"
          type="text"
          value={value2}
          onChange={(e) => handleFormChange(e, setvalue2)}
        />
        <label for="Value4input">Value4</label>
        <input
          id="Value4input"
          type="text"
          value={value4}
          onChange={(e) => handleFormChange(e, setvalue4)}
        />
      </div>
      <label for="Value6input">Value6</label>
      <input
        id="Value6input"
        type="text"
        value={value6}
        onChange={(e) => handleFormChange(e, setvalue6)}
      />
      <div className="formsflex">
        <label for="Value7input">Value7 </label>
        <input
          id="Value7input"
          type="text"
          value={value7}
          onChange={(e) => handleFormChange(e, setvalue7)}
        />
        <label for="Value8input">Value8</label>
        <input
          id="Value8input"
          type="text"
          value={value8}
          onChange={(e) => handleFormChange(e, setvalue8)}
        />
      </div>

      <br></br>
      <button onClick={props.getPDFFieldNames}>Get Field Names</button>
      <button onClick={props.fillFormField}>Fill Form Field</button>
    </div>
  );
}