import React, { useState, useEffect, Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import account from "../images/account.png";
import Axios from "axios";
//import axios from "axios";
import "./upload.css";

function Upload() {
  const [previewImg, setPreviewImg] = useState(null);
  const [previewImgError, setPreviewImgError] = useState("");

  const [displayImg, setDisplaayImg] = useState(null);

  const imgType = ["image/png", "image/jpeg"];

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleImgChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && imgType.includes(selectedFile.type)) {
        setPreviewImg(URL.createObjectURL(selectedFile));
        setPreviewImgError("");
        console.log(selectedFile.name);
      } else {
        setPreviewImg(null);
        setPreviewImgError("please select vlid image type jpeg or png");
      }
    } else {
      console.log("select your file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplaayImg(previewImg);
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await Axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      console.log(filePath);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  return (
    <>
      <div className="wrapper">
        {/* <form className="form-group form" onSubmit={handleSubmit}>
          <input
            type="file"
            className="form-control"
            onChange={handleImgChange}
          />
          <br></br>

          <button type="submit" className="btn btn-success btn-md">
            Upload
          </button>
        </form>

        <div className="display-and-preview-box">
          <div className="preview-box">
            {previewImg && <img src={previewImg} alt="preview" />}
          </div>
          <div className="display-box">
            {displayImg && <img src={displayImg} alt="display" />}
          </div>
        </div> */}
        <form onSubmit={onSubmit}>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>

          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>
        {uploadedFile ? (
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h3 className="text-center">{uploadedFile.fileName}</h3>
              <img
                style={{ width: "100%" }}
                src={uploadedFile.filePath}
                alt=""
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Upload;
