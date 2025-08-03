import React from "react";

function FormStep({ children }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        paddingBlock: "12px",
      }}
    >
      {children}
    </div>
  );
}

export default FormStep;
