import React, { useEffect, useRef, useState } from "react";
import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const fileRef = useRef();

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const uploadedHandler = (event) => {
    let uploadedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, uploadedFile, fileIsValid);
  };

  const uploadImageHandler = () => {
    fileRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={fileRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={uploadedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alit="Preview" />
          ) : (
            <p>이미지를 선택하세요.</p>
          )}
        </div>
        <Button type="button" onClick={uploadImageHandler}>
          이미지 업로드
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
