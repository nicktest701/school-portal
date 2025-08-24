import { getStudent } from "@/api/studentAPI";
import CustomTitle from "@/components/custom/CustomTitle";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import StudentProfile from "@/components/tabs/student/StudentProfile";
import { useAuth } from "@/context/AuthProvider";
import {  Container } from "@mui/material";
import student_ico from "../../assets/images/header/student_ico.svg";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Profile = () => {
  const { user } = useAuth();

  const {
    data: student,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["student-profile", user?._id],
    queryFn: () => getStudent(user?._id),
    enabled: !!user?._id,
    initialData: {
      profile: user,
    },
  });

  if (isPending || isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <Container>
      <CustomTitle
        title="Profile Details"
        subtitle="Here you can view and edit your profile information."
        color="text.main"
        img={student_ico}
      />

      {/* Add your profile details here */}
      <StudentProfile
        levelName={"1"}
        parents={student?.parents}
        student={student?.profile}
        medical={student?.medical}
      />
    </Container>
  );
};

export default Profile;
