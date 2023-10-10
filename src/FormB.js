import React from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "./App";
export default function FormB(props) {
  const {
    setcurrentform,
    selectedAccount,
    data,
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
    props.loadForm("https://benstone272formsbucket.s3.amazonaws.com/FormB.pdf");
  }, []);
  function handleFormChange(e, func) {
    func(e.target.value);
  }
  function AddData() {
    const lambdaEndpoint =
      "https://4n3jkaie80.execute-api.us-east-1.amazonaws.com/dev"; // Replace with your Lambda API endpoint URL

    const requestData = {
      ID: selectedAccount,
      value1: value1,
      value2: value2,
      value3: value3,
      value4: value4,
      value5: value5,
      value6: value6,
      value7: value7,
      value8: value8,
      value9: value9,
      value10: value10,
    };

    fetch(lambdaEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed.");
        }
      })
      .then((data) => {
        console.log("Lambda Response:", data);
        // Handle the Lambda response here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  }

  return (
    <div className="forms">
      {/* <input type="file" accept=".pdf" onChange={props.handleFileChange1} />*/}
      {/*<input type="button" onClick={props.handleFileChange} />*/}
      <br></br>
      <h3>Form B</h3>
      <h3>{selectedAccount}</h3>
      <div className="formsflex">
        <label htmlFor="Value1input">Value1</label>

        <input
          id="Value1input"
          type="text"
          value={value1}
          onChange={(e) => handleFormChange(e, setvalue1)}
        />
        <label htmlFor="Value2input">Value2</label>
        <input
          id="Value2input"
          type="text"
          value={value2}
          onChange={(e) => handleFormChange(e, setvalue2)}
        />
        <label htmlFor="Value4input">Value4</label>
        <input
          id="Value4input"
          type="text"
          value={value4}
          onChange={(e) => handleFormChange(e, setvalue4)}
        />
      </div>
      <label htmlFor="Value6input">Value6</label>
      <input
        id="Value6input"
        type="text"
        value={value6}
        onChange={(e) => handleFormChange(e, setvalue6)}
      />
      <div className="formsflex">
        <label htmlFor="Value7input">Value7 </label>
        <input
          id="Value7input"
          type="text"
          value={value7}
          onChange={(e) => handleFormChange(e, setvalue7)}
        />
        <label htmlFor="Value8input">Value8</label>
        <input
          id="Value8input"
          type="text"
          value={value8}
          onChange={(e) => handleFormChange(e, setvalue8)}
        />
      </div>

      <br></br>
      <button onClick={AddData}>Save Data</button>
      <button onClick={props.fillFormField}>Download Pdf</button>
    </div>
  );
}
