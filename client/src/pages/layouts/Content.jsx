import Box from "@mui/material/Box";
function Content({ children }) {
  return (
    <Box
      sx={{
        py: 2,
        minHeight: "100svh",
        bgcolor: "whitesmoke",
      }}
    >
      {children}
    </Box>
  );
}

export default Content;
