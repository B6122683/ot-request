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
import axios from "axios";
import "./upload.css";

function Upload() {
  const [previewImg, setPreviewImg] = useState(null);
  const [previewImgError, setPreviewImgError] = useState("");

  const [displayImg, setDisplaayImg] = useState(null);

  const imgType = ["image/png", "image/jpeg"];
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

  return (
    <>
      <div className="wrapper">
        <form className="form-group form" onSubmit={handleSubmit}>
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
        </div>
      </div>
    </>
  );
}

export default Upload;
