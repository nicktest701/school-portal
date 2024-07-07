import { FormHelperText, FormLabel } from "@mui/material";
import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor({ label, value, setValue, touched, errors }) {
  const quillRef = useRef(null);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    // [{ header: 1 }, { header: 2 }], // custom button values
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    //   ["undo", "redo"],
    ["clean"], // remove formatting button
  ];

  return (
    <div
      style={{
        marginBottom: "32px",
        width: "100%",
      }}
    >
      {label && (
        <FormLabel
          sx={{
            color: touched && errors ? "#B72136" : "primary",
          }}
        >
          {label}
        </FormLabel>
      )}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
        placeholder={label}
        style={{
          width: "100%",
        //   borderRadius: '8px',
          // height: "250px",
          border: touched && errors ? "1px solid #B72136" : "none",
        }}
        modules={{
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
          },

          toolbar: {
            container: toolbarOptions,

            handlers: {
              //  image: imageHandler,
            },
            ImageResize: {
              modules: ["Resize", "DisplaySize"],
            },
            imageCompress: {
              quality: 0.5, // default
              maxWidth: 1000, // default
              maxHeight: 1000, // default
              imageType: "image/jpeg", // default
              debug: true, // default
            },
          },
        }}
      />
      {touched && errors && (
        <FormHelperText
          sx={{
            color: "#B72136",
            pl: 2,
          }}
        >
          {errors}
        </FormHelperText>
      )}
    </div>
  );
}

export default TextEditor;
