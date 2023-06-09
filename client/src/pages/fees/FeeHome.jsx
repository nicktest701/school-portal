import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, ListItemText, Stack, Typography } from '@mui/material';
import FeesDashboardCard from '../../components/cards/FeesDashboardCard';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import {
  getAllCurrentFeesSummary,
  getAllRecentlyPaidFees,
} from '../../api/currentFeeAPI';
import { UserContext } from '../../context/providers/userProvider';
import { EMPTY_IMAGES } from '../../config/images';
import teacher_icon from '../../assets/images/header/teacher_ico.svg';
import moment from 'moment';
const FeeHome = () => {
  const {
    userState: {
      session: { sessionId, termId, from, to },
    },
  } = useContext(UserContext);

  const [todayFee, setTodayFee] = useState(0);
  const [monthFee, setMonthFee] = useState(0);
  const [termFee, setTermFee] = useState(0);

  useQuery({
    queryKey: ['current-fees-summary'],
    queryFn: () =>
      getAllCurrentFeesSummary({ session: sessionId, term: termId, from, to }),
    enabled: !!sessionId && !!termId,
    onSuccess: (feeSummary) => {
      setTodayFee(feeSummary?.today);
      setMonthFee(feeSummary?.month);
      setTermFee(feeSummary?.term);
    },
  });

  const recentFees = useQuery({
    queryKey: ['recent-fees'],
    queryFn: () => getAllRecentlyPaidFees({ session: sessionId, term: termId }),
    enabled: !!sessionId && !!termId,
  });

  return (
    <Box
      bgcolor='primary.main'
      sx={{
        position: 'relative',
        height: 300,
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Stack color='primary.contrastText' sx={{ paddingY: 4 }}>
          <Typography variant='h5'>Fees Payment</Typography>
          <Typography>
            Access,manage and control payment of school fees
          </Typography>
        </Stack>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            paddingY: 2,
          }}
        >
          <FeesDashboardCard text='Today' value={todayFee} />
          <FeesDashboardCard text='Month' value={monthFee} />
          <FeesDashboardCard text='Term' value={termFee} />
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <StudentDashboardCard />
          <StudentDashboardCard />
          <StudentDashboardCard />
        </Box> */}
        <CustomizedMaterialTable
          isLoading={recentFees.isLoading}
          title='Recent Fee Payment'
          icon={teacher_icon}
          columns={[
            {
              title: 'Date of Payment',
              field: 'date',
              type: 'date',
              render: ({ date }) => (
                <ListItemText
                  primary={moment(date).format('ddd, Do MMMM YYYY')}
                  secondary={moment(date).format('hh:mm a')}
                />
              ),
            },
            {
              title: 'Student',
              field: 'student',
            },
            {
              title: 'Level',
              field: 'level',
            },
            {
              title: 'Amount Paid',
              field: 'paid',
            },
            {
              title: 'Outstanding',
              field: 'outstanding',
            },
          ]}
          data={recentFees.data}
          actions={[]}
          showAddButton={false}
          addButtonImg={EMPTY_IMAGES.level}
          addButtonMessage=' No recent fee payment !'
          handleRefresh={recentFees.refetch}
        />
      </Container>
    </Box>
  );
};

export default FeeHome;
