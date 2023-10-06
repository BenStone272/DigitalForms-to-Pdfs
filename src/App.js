import React from "react";
import { useState, createContext, useContext } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Route, Routes } from "react-router-dom";
import { PDFDocument, rgb } from "pdf-lib";
import Navbar from "./NavBar";
import FormA from "./FormA";
import FormB from "./FormB";
import FormC from "./FormC";
export const UserContext = createContext();
function App() {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentform, setcurrentform] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");

  const [value1, setvalue1] = useState("testing value");
  const [value2, setvalue2] = useState("");
  const [value3, setvalue3] = useState("");
  const [value4, setvalue4] = useState("");
  const [value5, setvalue5] = useState("");
  const [value6, setvalue6] = useState("");
  const [value7, setvalue7] = useState("");
  const [value8, setvalue8] = useState("");
  const [value9, setvalue9] = useState("");
  const [value10, setvalue10] = useState("");

  const handleFileChange1 = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const pdfBytes = new Uint8Array(reader.result);

      try {
        const loadedPdfDoc = await PDFDocument.load(pdfBytes);
        setPdfDoc(loadedPdfDoc);
        console.log("PDF loaded successfully.");
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };
  const handleFileChange = async () => {
    const pdfPath = process.env.PUBLIC_URL + "/PDFForm.pdf";

    const response = await fetch(pdfPath);
    const pdfBytes = new Uint8Array(await response.arrayBuffer());

    try {
      const loadedPdfDoc = await PDFDocument.load(pdfBytes);
      setPdfDoc(loadedPdfDoc);
      console.log("PDF loaded successfully.");
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  const fillFormField = async () => {
    if (!pdfDoc) {
      console.error("PDF not loaded.");
      return;
    }

    console.log(currentform);
    const form = pdfDoc.getForm();

    if (currentform == "a") {
      let value1Field = form.getField("value12");
      let value2Field = form.getField("value23");
      let value3Field = form.getField("value35");
      let value4Field = form.getField("value46");
      let value5Field = form.getField("value58");
      let value6Field = form.getField("value67");
      value1Field.setText(value1);
      value2Field.setText(value2);
      value3Field.setText(value3);
      value4Field.setText(value4);
      value5Field.setText(value5);
      value6Field.setText(value6);
      console.log("Field 'name6' filled with 'Ben'");

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      downloadPDF(modifiedPdfBytes, "modified_pdf.pdf");
    }
    if (currentform == "b") {
      let value1Field = form.getField("value12");
      let value2Field = form.getField("value23");
      let value4Field = form.getField("value45");
      let value6Field = form.getField("value67");
      let value7Field = form.getField("value76");
      let value8Field = form.getField("value88");
      value1Field.setText(value1);
      value2Field.setText(value2);
      value4Field.setText(value4);
      value6Field.setText(value6);
      value7Field.setText(value7);
      value8Field.setText(value8);

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      downloadPDF(modifiedPdfBytes, "modified_pdf.pdf");
    }
    if (currentform == "c") {
      let value1Field = form.getField("value12");
      let value2Field = form.getField("value23");
      let value4Field = form.getField("value45");
      let value6Field = form.getField("value67");
      let value9Field = form.getField("value96");
      let value10Field = form.getField("value108");
      value1Field.setText(value1);
      value2Field.setText(value2);
      value4Field.setText(value4);
      value6Field.setText(value6);
      value9Field.setText(value9);
      value10Field.setText(value10);

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      downloadPDF(modifiedPdfBytes, "modified_pdf.pdf");
    }
  };

  const downloadPDF = (pdfBytes, filename) => {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const getPDFFieldNames = () => {
    if (!pdfDoc) {
      console.error("PDF not loaded.");
      return;
    }

    const form = pdfDoc.getForm();
    const fieldNames = form.getFields().map((field) => field.getName());
    console.log("Field Names:", fieldNames);
  };

  function handleFormChange(e, func) {
    func(e.target.value);
  }

  return (
    <UserContext.Provider
      value={{
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
      }}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Dropdown
              setSelectedAccount={setSelectedAccount}
              selectedAccount={selectedAccount}
            />
          }
        />
        <Route
          path="/FormA"
          element={
            <FormA
              handleFileChange1={handleFileChange1}
              handleFileChange={handleFileChange}
              getPDFFieldNames={getPDFFieldNames}
              fillFormField={fillFormField}
            />
          }
        />
        <Route
          path="/FormB"
          element={
            <FormB
              handleFileChange1={handleFileChange1}
              handleFileChange={handleFileChange}
              getPDFFieldNames={getPDFFieldNames}
              fillFormField={fillFormField}
            />
          }
        />
        <Route
          path="/FormC"
          element={
            <FormC
              handleFileChange1={handleFileChange1}
              handleFileChange={handleFileChange}
              getPDFFieldNames={getPDFFieldNames}
              fillFormField={fillFormField}
            />
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  let items = [
    //this will be changed when data is loaded to be all names from DB
    "Account1",
    "Account2",
    "Account3",
    "Account4",
    "Account5",
    "Account6",
    "Account7",
    "Account8",
    "Account9",
    "Account10",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Clicked item: ${item}`);
    props.setSelectedAccount(item);
    console.log(props.selectedAccount);
    setIsOpen(false);
  };

  const filterItems = () => {
    return items.filter((item) =>
      item.toUpperCase().includes(search.toUpperCase())
    );
  };

  return (
    <div className="centered-container">
      <h2>Dropdown</h2>

      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          Select Account
        </button>
        <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
          <input
            type="text"
            placeholder="Search.."
            id="myInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filterItems().map((item, index) => (
            <a key={index} onClick={() => handleItemClick(item)}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
