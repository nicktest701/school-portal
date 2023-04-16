import { Card, CardContent, List, Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import BirthdayItem from './BirthdayItem';
import { useQuery } from '@tanstack/react-query';
import { getTodaysBirth } from '../../api/levelAPI';
import { UserContext } from '../../context/providers/userProvider';
import db from '../../assets/images/header/bd1.svg';
const Birthday = () => {
  const {
    userState: {
      session: { sessionId, termId },
    },
  } = useContext(UserContext);

  const students = useQuery({
    queryKey: ['birthday'],
    queryFn: () => getTodaysBirth(sessionId, termId),
    enabled: !!sessionId && !!termId,
  });

  return (
    <Card>
      <CardContent>
        <List
          subheader={
            <Stack direction='row'>
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
      </CardContent>
    </Card>
  );
};

export default Birthday;
