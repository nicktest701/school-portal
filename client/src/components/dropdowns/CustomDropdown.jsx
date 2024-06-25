const CustomDropdown = ({ titleContent, children }) => {
  return (
    <details className="dropdown">
      <summary role="button">
        <a className="button">{titleContent}</a>
      </summary>
      <ul>{children}</ul>
    </details>
  );
};

export default CustomDropdown;
