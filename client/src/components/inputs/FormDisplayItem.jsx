import { Box, Typography, Stack, SvgIcon } from "@mui/material";
import { styled } from "@mui/material/styles";

// Icon mapping for different field types
const iconMap = {
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  calendar_today: "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z",
  alternate_email: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
  wc: "M5.5 22v-7.5H4V9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v5.5H9.5V22h-4zM18 22v-6h3l-2.54-7.63C18.18 7.55 17.42 7 16.56 7h-.12c-.86 0-1.63.55-1.9 1.37L12 16h3v6h3zM7.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm9 0c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2z",
  email: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z",
  badge: "M14 12h4v1.5h-4zm0 3h4v1.5h-4z",
  default: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
};

const FieldContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: "50%",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.contrastText
}));

const ValueText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontSize: "1rem",
  textTransform: "capitalize"
}));

const LabelText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  fontSize: "0.875rem"
}));

function FormDisplayItem({ label, value, icon = "default" }) {
  const iconPath = iconMap[icon] || iconMap.default;
  
  return (
    <FieldContainer direction="row" spacing={2} alignItems="center">
      <IconContainer>
        <SvgIcon sx={{ fontSize: 20 }}>
          <path d={iconPath} fill="currentColor" />
        </SvgIcon>
      </IconContainer>
      
      <Stack>
        <LabelText variant="body2">{label}</LabelText>
        <ValueText variant="body1">{value || "-"}</ValueText>
      </Stack>
    </FieldContainer>
  );
}

export default FormDisplayItem;

// import { TextField } from "@mui/material";

// function FormDisplayItem({ label, value }) {
//   return (
//     <TextField
//       label={label}
//       value={value}
//       fullWidth
//       slotProps={{
//         input: {
//           readOnly: true,
//           sx: {
//             backgroundColor: "whitesmoke",
//             // backgroundColor: "#D9DEEF",
//             color: "var(--primary)",
//             fontWeight: "bold",
//             textTransform: "capitalize",
//           },
//         },
//       }}
//     />
//   );
// }

// export default FormDisplayItem;
