"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label = "Meal Image", name = "image" }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);

  const handlePickImage = () => {
    const fileInput = imageInputRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!selectedImage && <p>No image picked yet.</p>}
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected Meal"
              // style={{ width: "100%", heigth: "auto" }}
              fill
            />
          )}
        </div>
        <input
          onChange={handleImageChange}
          className={classes.input}
          type="file"
          id={name}
          ref={imageInputRef}
          name={name}
          accept="image/png, image/jpeg, image/jpg"
          hidden
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickImage}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
