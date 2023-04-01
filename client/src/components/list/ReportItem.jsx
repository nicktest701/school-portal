const ReportItem = ({ title, text }) => {
  return (
    <div>
      <span
        style={{
          fontWeight: "bold",
          fontSize: "13px",
          paddingRight: "5px",
          textTransform: "capitalize",
        }}
      >
        {title}:
      </span>
      <span style={{ fontSize: "13px", textTransform: "capitalize" }}>
        {text}
      </span>
    </div>
  );
};

export default ReportItem;
