function GlobalSpinner() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "var(--primary)",
        zIndex: "9999999",
        display: "grid",
        placeItems: "center",
        minWidth: "100svw",
        overflow: "hidden",
      }}
    >
      <div className="spinner2"></div>
    </div>
  );
}

export default GlobalSpinner;
