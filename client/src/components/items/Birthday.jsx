import { Card, List, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import BirthdayItem from "./BirthdayItem";
import { useQuery } from "@tanstack/react-query";
import { getTodaysBirth } from "../../api/levelAPI";
import db from "../../assets/images/header/bd1.svg";
import BirthdaySkeleton from "../skeleton/BirthdaySkeleton";
const Birthday = () => {


  const students = useQuery({
    queryKey: ["birthday"],
    queryFn: getTodaysBirth,
    initialData: [],
  });

  if (students.isPending) return <BirthdaySkeleton />;

  return (
    <Card sx={{ p: 2, flexGrow: 1 }}>
      <List
        subheader={
          <Stack direction="row" spacing={2}>
            <img alt="db" src={db} style={{ width: 30, height: 30 }} />
            <Typography>Today&lsquo;s Birthday</Typography>
          </Stack>
        }
      >
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
