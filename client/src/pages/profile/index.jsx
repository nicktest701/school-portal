import React, { useContext } from "react";
import { Avatar, Container, Typography, Stack, Button } from "@mui/material";
import { UserContext } from "../../context/providers/UserProvider";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import FormDisplayItem from "../../components/inputs/FormDisplayItem";
import { Edit } from "@mui/icons-material";
import CustomTitle from "../../components/custom/CustomTitle";
import { useSearchParams } from "react-router-dom";
import UpdateUserProfile from "../../components/dialog/UpdateUserProfile";

function Profile() {
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(user)

  const handleOpenEdit = () => {
    setSearchParams((params) => {
      params.set("e_p", true);
      return params;
    });
  };

  return (
    <Container>
      <CustomTitle
        title="Profile"
        subtitle="View and update your personal information to keep your profile accurate and current."
        color="text.main"
        backColor="#012e54"
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          py: 4,
          gap: 4,
          bgcolor:'#fff' 
        }}
      >
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={handleOpenEdit}
          sx={{ alignSelf: "flex-end" }}
        >
          Edit Profile
        </Button>
        <Stack
          width="100%"
          justifyContent="center"
          alignItems="center"
          rowGap={2}
        >
          <Stack
            sx={{ p: 1, border: "1px solid lightgray", borderRadius: "50%" }}
          >
            <Avatar
              src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                user?.profile
              }`}
              sx={{ height: 120, width: 120 }}
            />
          </Stack>
          <Typography
            variant="h6"
            color="primary"
            sx={{ paddingTop: 2, textTransform: "capitalize" }}
          >
            {user?.fullname}
          </Typography>
          {/* <Typography variant="body2">@{user?.username}</Typography>
          <Typography variant="caption">{user?.email}</Typography> */}
        </Stack>

        <Stack spacing={3} width="100%">
          {/* <Typography variant="h3">Details</Typography>{" "} */}
          <CustomFormControl>
            <FormDisplayItem label="Firstname" value={user.firstname || ""} />
            <FormDisplayItem label="Lastname" value={user.lastname || ""} />
          </CustomFormControl>
          <FormDisplayItem label="Username" value={user.username || ""} />
          <FormDisplayItem label="Email" value={user.email || ""} />
          <CustomFormControl>
            <FormDisplayItem label="Date of Birth" value={user.dob || ""} />

            <FormDisplayItem label="Gender" value={user.gender || ""} />
          </CustomFormControl>
          <FormDisplayItem label="Role" value={user.role || ""} />
        </Stack>
      </Container>
      <UpdateUserProfile />
    </Container>
  );
}

export default Profile;
