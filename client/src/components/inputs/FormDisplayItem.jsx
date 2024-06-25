import { TextField } from "@mui/material";

function FormDisplayItem({ label, value }) {
  return (
    <TextField
      label={label}
      value={value}
      fullWidth
      inputProps={{
        style: {
          backgroundColor: "#D9DEEF",
          color: "var(--primary)",
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}

export default FormDisplayItem;
