import { getStudent } from "@/api/studentAPI";
import Title from "@/components/custom/Title";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import StudentProfile from "@/components/tabs/student/StudentProfile";
import { useAuth } from "@/context/AuthProvider";
import { Avatar, Box, Container, Typography } from "@mui/material";
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
      <Title
        title="Personal Information"
        subtitle="Welcome to your profile page! Here you can view and edit your profile
          information."
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
