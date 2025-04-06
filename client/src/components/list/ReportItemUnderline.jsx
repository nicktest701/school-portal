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

export default ReportItemUnderline;
