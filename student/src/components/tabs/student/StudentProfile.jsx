import React, { useState } from "react";
import {
  AccountBoxRounded,
  EditRounded,
  MedicalInformationRounded,
  Person,
  PersonRounded,
  PhoneRounded,
  Report,
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import moment from "moment";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProfileItem from "@/components/typo/ProfileItem";
import ChipItem from "@/components/list/ChipItem";
import ViewPreviousReport from "@/pages/profile/ViewPreviousReport";
import ViewParent from "@/pages/profile/ViewParent";
import MedicalInformationEdit from "@/pages/profile/MedicalInformationEdit";
import {
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const StudentProfile = ({ levelName, student, parents, medical }) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [openViewParent, setOpenViewParent] = useState(false);
  const [openViewPreviousReport, setOpenViewPreviousReport] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.up("md"));

  const handleOpenMedicalHistory = () => {
    setSearchParams({
      mi: true,
    });
  };

  //EDIT Student Info
  const openStudentEdit = () => {
    navigate("/profile/edit");
  };

  const openPreviousReport = () => {
    setOpenViewPreviousReport(true);
  };

  // console.log(student)

  return (
    <>
      <Box>
        <Stack
          sx={{
            pb: 2,
          }}
          alignItems={{ xs: "center", md: "start" }}
        >
          <Avatar
            src={student?.profile}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Stack></Stack>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          columnGap={2}
          pt={2}
        >
          {matches ? (
            <>
              <Button startIcon={<EditRounded />} onClick={openStudentEdit}>
                Edit
              </Button>
              <Button
                startIcon={<Person />}
                onClick={() => setOpenViewParent(true)}
              >
                Parent Info
              </Button>
              <Button
                startIcon={<MedicalInformationRounded />}
                onClick={handleOpenMedicalHistory}
              >
                Medical History
              </Button>
            </>
          ) : (
            <>
              <Tooltip title="Edit Profile">
                <IconButton onClick={openStudentEdit}>
                  <EditRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Parent Info">
                <IconButton onClick={() => setOpenViewParent(true)}>
                  <Person />
                </IconButton>
              </Tooltip>
              <Tooltip title="Medical History">
                <IconButton onClick={handleOpenMedicalHistory}>
                  <MedicalInformationRounded />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>

        <ChipItem divider={true} label="Basic Info" icon={<PersonRounded />} />
        <Stack py={2} xs={{ bgcolor: "#fff", borderRadius: "12px" }}>
          <ProfileItem label="ID" text={student?.indexnumber} />
          <ProfileItem label="Name" text={student?.fullName} />
          <ProfileItem
            label="Date of Birth"
            text={moment(new Date(student?.dateofbirth)).format(
              "Do MMMM, YYYY."
            )}
          />
          <ProfileItem label="Gender" text={student?.gender} />
        </Stack>

        <ChipItem
          divider={true}
          label="Contact Info."
          icon={<PhoneRounded />}
        />
        <Stack py={2}>
          <ProfileItem label="Email Address" text={student?.email} />
          <ProfileItem label="Telephone Number" text={student?.phonenumber} />
          <ProfileItem label="Address" text={student?.address} />
          <ProfileItem label="Residence" text={student?.residence} />
          <ProfileItem label="Nationality" text={student?.nationality} />
        </Stack>

        <ChipItem
          divider={true}
          label="Academic Info."
          icon={<EditRounded />}
        />
        <Stack py={2}>
          <ProfileItem
            label="Department"
            // text={student?.academic?.department || "Not Available"}
          />
          <ProfileItem label="Current Level" text={type || levelName} />
          <ProfileItem
            label="Department"
            // text={student?.academic?.house || "Not Available"}
          />
          <ProfileItem
            label="Previous School"
            text={`${
              student?.academic?.previousSchool?.name || "Not Available"
            } `}
          />
          <Button
            startIcon={<Report />}
            onClick={openPreviousReport}
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
          >
            Previous Report
          </Button>
        </Stack>
        <ChipItem
          divider={true}
          label="Account Info."
          icon={<AccountBoxRounded />}
        />
        <ProfileItem
          label="Account Status"
          text={student?.active ? "Active" : "Disabled"}
        />
      </Box>

      <ViewParent
        parents={parents}
        open={openViewParent}
        setOpen={setOpenViewParent}
      />

      <MedicalInformationEdit medical={{ ...medical, id: student?._id }} />

      <ViewPreviousReport
        report={student?.academic?.previousSchool?.report}
        open={openViewPreviousReport}
        setOpen={setOpenViewPreviousReport}
      />
    </>
  );
};

export default StudentProfile;
