import { TextField } from "@mui/material";

function FormDisplayItem({ label, value }) {
  return (
    <TextField
      label={label}
      value={value}
      fullWidth
      slotProps={{
        input: {
          readOnly: true,
          sx: {
            backgroundColor: "whitesmoke",
            // backgroundColor: "#D9DEEF",
            color: "var(--primary)",
            fontWeight: "bold",
            textTransform: "capitalize",
          },
        },
      }}
    />
  );
}

export default FormDisplayItem;
