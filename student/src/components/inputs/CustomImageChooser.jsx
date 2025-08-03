import Edit from "@mui/icons-material/Edit";
import { FormLabel } from "@mui/material";
import React from "react";

function CustomImageChooser({ children, handleImageUpload }) {
  return (
    <>
      <FormLabel
        htmlFor="profile"
        sx={{
          position: "relative",
          border: "2px solid lightgray",
          borderRadius: "50%",
          p: 1,
          cursor: "pointer",
        }}
      >
        {children}
        <Edit
          sx={{
            width: 36,
            height: 36,
            position: "absolute",
            bottom: -10,
            right: 25,
            zIndex: 9999999,
            transform: "rotate(-10deg)",
          }}
        />
      </FormLabel>
      <input
        type="file"
        accept=".png, .jpg ,.webp"
        name="profile"
        id="profile"
        onChange={(e) => handleImageUpload(e)}
        hidden
      />
    </>
  );
}

export default CustomImageChooser;
