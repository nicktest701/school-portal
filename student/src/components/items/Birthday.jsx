import { Card, List, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import BirthdayItem from "./BirthdayItem";
import { useQuery } from "@tanstack/react-query";
import { getTodaysBirth } from "../../api/levelAPI";
import BirthdaySkeleton from "../skeleton/BirthdaySkeleton";
const Birthday = () => {
  const students = useQuery({
    queryKey: ["birthday"],
    queryFn: getTodaysBirth,
    initialData: [],
  });

  if (students.isPending) return <BirthdaySkeleton />;

  return (
    <Card sx={{ flexGrow: 1 }}>
      <List>
        {students.isPending && <Typography>Loading...</Typography>}

        {students?.data?.length !== 0 ? (
          students?.data?.map((student) => (
            <BirthdayItem key={student?._id} {...student} />
          ))
        ) : (
          <Stack
            sx={{ minHeight: 250 }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography>No Birthday Today</Typography>
          </Stack>
        )}
      </List>
    </Card>
  );
};

export default memo(Birthday);
