import { Stack } from "@mui/material";
import React from "react";
import ProfileItem from "../../components/typo/ProfileItem";
import moment from "moment";

function TeacherProfile({ teacher }) {
  return (
    <Stack>
      <ProfileItem label="Name" text={teacher?.fullName} />
      <ProfileItem
        label="Date Of Birth"
        tex
        text={moment(new Date(teacher?.dateofbirth)).format("Do MMMM, YYYY.")}
      />
      <ProfileItem label="Gender" text={teacher?.gender} />
      <ProfileItem label="Email Address" text={teacher?.email} />
      <ProfileItem label="Telephone No." text={teacher?.phonenumber} />
      <ProfileItem label="Address" text={teacher?.address} />
      <ProfileItem label="Residence" text={teacher?.residence} />

      <ProfileItem label="Nationality" text={teacher?.nationality} />
    </Stack>
  );
}

export default TeacherProfile;
