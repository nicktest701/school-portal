import React from "react";
import PropTypes from "prop-types";

const ReportItemUnderline = ({ title, text }) => {
  return (
    <div>
      <span
        style={{ fontWeight: "bold", fontSize: "13px", paddingRight: "5px" }}
      >
        {title}:
      </span>
      <span
        style={{
          borderBottom: "1px #333 dashed",
          fontSize: "13px",
    
        }}
      >
        {text}
      </span>
    </div>
  );
};

ReportItemUnderline.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ReportItemUnderline;
