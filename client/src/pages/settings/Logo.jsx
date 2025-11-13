import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import React, { use, useState } from "react";
import CustomImageChooser from "@/components/inputs/CustomImageChooser";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { useQueryClient } from "@tanstack/react-query";
import { updateSchoolLogo } from "@/api/schoolAPI";
import { UserContext } from "@/context/providers/UserProvider";

function Logo() {
  const { school_info } = use(UserContext);

  const [badge, setBadge] = useState(school_info?.badge);
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();

  const uploadProfile = async (e) => {
    const badge = e.target?.files[0];
    if (!badge) return;

    try {
      const updatedBadge = await updateSchoolLogo({
        id: school_info?.code,
        badge,
      });
      schoolSessionDispatch(alertSuccess("School Badge Uploaded"));

      queryClient.invalidateQueries(["school"]);
      setBadge(updatedBadge);
      school_info.badge = updatedBadge;
      localStorage.setItem("@school_info", JSON.stringify(school_info));
    } catch (error) {
      schoolSessionDispatch(alertError("Error updating School Badge"));
    }
  };

  return (
    <Container
      // maxWidth="md"
      sx={{
        borderRadius: "12px",
        bgcolor: "#fff",
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ placeSelf: "start" }}>
        <Typography variant="h6" color="primary">
          School Logo
        </Typography>
        <Typography variant="caption" color="text.secondary" fontStyle="italic">
          Upload or change your school's official logo or badge.
        </Typography>
        <Divider />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomImageChooser handleImageUpload={uploadProfile}>
          <Avatar
            src={badge}
            sx={{
              width: { xs: 150, sm: 200, md: 280 },
              height: { xs: 150, sm: 200, md: 280 },
              justifySelf: "center",
              alignSelf: "center",
            }}
          />
        </CustomImageChooser>
      </Box>
    </Container>
  );
}

export default Logo;
