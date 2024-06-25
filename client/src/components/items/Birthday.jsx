import { Card, List, Stack, Typography } from '@mui/material';
import React, { memo, useContext } from 'react';
import BirthdayItem from './BirthdayItem';
import { useQuery } from '@tanstack/react-query';
import { getTodaysBirth } from '../../api/levelAPI';
import { UserContext } from '../../context/providers/UserProvider';
import db from '../../assets/images/header/bd1.svg';
import BirthdaySkeleton from '../skeleton/BirthdaySkeleton';
const Birthday = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const students = useQuery({
    queryKey: ['birthday', session?.sessionId, session?.termId],
    queryFn: () => getTodaysBirth(session?.sessionId, session?.termId),
    enabled: !!session?.sessionId && !!session?.termId,
  });

  if (students.isLoading) return <BirthdaySkeleton />;

  return (
    <Card sx={{ p: 2,flexGrow:1 }}>
      <List
        subheader={
          <Stack direction='row' spacing={2}>
            <img alt='db' src={db} style={{ width: 30, height: 30 }} />
            <Typography>Today&lsquo;s Birthday</Typography>
          </Stack>
        }
      >
        {students.isLoading && <Typography>Loading...</Typography>}

        {students?.data?.length !== 0 ? (
          students?.data?.map((student) => (
            <BirthdayItem key={student?._id} {...student} />
          ))
        ) : (
          <Stack
            sx={{ minHeight: 250 }}
            justifyContent='center'
            alignItems='center'
          >
            <Typography>No Birthday Today</Typography>
          </Stack>
        )}
      </List>
    </Card>
  );
};

export default memo(Birthday);
