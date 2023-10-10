import React from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "./App";
export default function FormA(props) {
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
  } = useContext(UserContext);

  useEffect(() => {
    setcurrentform("a");
    props.loadForm("https://benstone272formsbucket.s3.amazonaws.com/FormA.pdf");
    console.log(data);
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
      <h3>Form A</h3>
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
        <label htmlFor="Value3input">Value3</label>
        <input
          id="Value3input"
          type="text"
          value={value3}
          onChange={(e) => handleFormChange(e, setvalue3)}
        />
      </div>
      <div className="formsflex">
        <label htmlFor="Value4input">Value4 </label>
        <input
          id="Value4input"
          type="text"
          value={value4}
          onChange={(e) => handleFormChange(e, setvalue4)}
        />
        <label htmlFor="Value5input">Value5</label>
        <input
          id="Value5input"
          type="text"
          value={value5}
          onChange={(e) => handleFormChange(e, setvalue5)}
        />
      </div>
      <label htmlFor="Value6input">Value6</label>
      <input
        id="Value6input"
        type="text"
        value={value6}
        onChange={(e) => handleFormChange(e, setvalue6)}
      />

      <br></br>
      <button onClick={AddData}>Save Data</button>
      <button onClick={props.fillFormField}>Download Pdf</button>
    </div>
  );
}
