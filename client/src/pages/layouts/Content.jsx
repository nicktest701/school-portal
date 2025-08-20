import Box from "@mui/material/Box";
function Content({ children }) {
  return (
    <Box
      sx={{
        py: 2,
        flex: 1,
        minHeight: "100svh",
        bgcolor: "#f5f5f5",
      }}
    >
      {children}
    </Box>
  );
}

export default Content;
