const ReportItem = ({ title, text }) => {
  return (
    <div>
      <span
        style={{
          fontWeight: 'bold',
          fontSize: '12px',
          paddingRight: '5px',
          textTransform: 'capitalize',
        }}
      >
        {title}:
      </span>
      <span style={{ fontSize: '12px', textTransform: 'capitalize' }}>
        {text || ''}
      </span>
    </div>
  );
};

export default ReportItem;
