import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { NavLink } from "react-router-dom";

const DrawerItem = ({ title, icon, to }) => {
  const { palette } = useTheme();

  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: "none",
      color: isActive ? `${palette.secondary.main}` : "#fff",
      // color: `${palette.text.primary}`,
      backgroundColor: isActive ? "rgba(255,255,255,0.3)" : null,
      fontWeight: isActive ? "bold" : "400",
      whiteSpace: "nowrap",
      borderRadius: 4,
    };
  };

  return (
    <Tooltip title={title} placement="right">
      <NavLink to={to} style={myLinkStyles}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            py: { xs: 1, sm: "12px" },
            px: { xs: 1, sm: "16px" },
            cursor: "pointer",
            width: { xs: "inherit", md: 150 },

            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "4px",
              width: "100%",
            },
          }}
          spacing={1}
        >
          <Tooltip
            title={to?.split("/")[1]}
            placement="right"
            
            slotProps={{
              tooltip: {
                sx: {
                  textTransform: "capitalize",
                },
              },
            }}
          >
            {icon}
          </Tooltip>
          <Typography
            variant="caption"
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              whiteSpace: "noWrap",
              // color: 'white',
              transition: "all 300ms ease-in-out",
            }}
          >
            {title}
          </Typography>
        </Stack>
      </NavLink>
    </Tooltip>
  );
};

export default DrawerItem;
