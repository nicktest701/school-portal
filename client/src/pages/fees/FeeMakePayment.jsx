import Check from '@mui/icons-material/Check';
import HistoryRounded from '@mui/icons-material/HistoryRounded';
import MonetizationOnRounded from '@mui/icons-material/MonetizationOnRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useContext, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAllFeesByCurrentLevel } from '../../api/feeAPI';
import {
  getCurrentFeeForStudent,
  postCurrentFee,
} from '../../api/currentFeeAPI';
import { currencyFormatter } from '../../config/currencyFormatter';
import { StudentContext } from '../../context/providers/StudentProvider';
import StudentFeesHistory from './StudentFeesHistory';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FeePaymentHistory from './FeePaymentHistory';
import { UserContext } from '../../context/providers/UserProvider';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import CustomTitle from '../../components/custom/CustomTitle';
import { EMPTY_IMAGES } from '../../config/images';
import { MonetizationOn, Person2Sharp } from '@mui/icons-material';
import useLevelById from '../../components/hooks/useLevelById';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';

const FeeMakePayment = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //Get Session id
  const {
    user,
    userState: { session },
  } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { studentDispatch } = useContext(StudentContext);
  const queryClient = useQueryClient();

  //States
  const [msg, setMsg] = useState({ severity: '', text: '' });
  const [openFeesHistory, setOpenFeesHistory] = useState(false);
  const [openStudentFeesHistory, setOpenStudentFeesHistory] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    _id: '',
    fullName: '',
    profile: '',
  });
  const [currentLevel, setCurrentLevel] = useState({
    levelId: '',
    levelType: '',
    feesId: '',
    fees: 0,
  });

  //fee info
  const [totalFees, setTotalFees] = useState(Number(0));
  const [currentFeesPaid, setCurrentFeesPaid] = useState(Number(0));
  const [totalArreas, setTotalArreas] = useState(Number(0));
  const [totalAmountPaid, setTotalAmountPaid] = useState(Number(0));
  const [currentAmount, setCurrentAmount] = useState(Number(0));

  const levelOptions = useQuery({
    queryKey: ['all-level-fees', session.sessionId, session.termId],
    queryFn: () =>
      getAllFeesByCurrentLevel({
        session: session.sessionId,
        term: session.termId,
      }),
    enabled: !!session?.sessionId && !!session?.termId,
  });

  const { students, levelLoading } = useLevelById(currentLevel?.levelId);

  ///Get Student fees info
  useQuery(
    ['student-fees', studentInfo?._id, searchParams.get('level_id')],
    () =>
      getCurrentFeeForStudent({
        session: session.sessionId,
        term: session.termId,
        student: studentInfo?._id,
        level: searchParams.get('level_id'),
      }),
    {
      enabled: !!studentInfo?._id && !!searchParams.get('level_id'),
      onSuccess: (data) => {
        setTotalAmountPaid(data?.totalAmountPaid);
        setTotalArreas(data?.totalArreas);
        setCurrentFeesPaid(data?.current?.amountPaid || 0);
        setTotalFees(data?.totalFees);
      },
    }
  );

  //Calculate total fees to pay
  const totalFeesToBePaid = useMemo(() => {
    const toBePaid = currentLevel?.fees + totalArreas;

    return toBePaid;
  }, [totalArreas, currentLevel?.fees]);

  //Calculate outstanding Fees
  const totalOutStanding = useMemo(() => {
    const remainingFees = totalFeesToBePaid - currentFeesPaid;

    return remainingFees;
  }, [currentFeesPaid, totalFeesToBePaid]);

  //Total fees calculations
  const feeCalculation = useMemo(() => {
    //ADD total fees to arreas

    const remainingFees = totalFees - (totalAmountPaid + Number(currentAmount));

    if (remainingFees < 0) {
      return {
        date: new Date().toISOString(),
        paid: totalOutStanding,
        outstanding: Number(0),
        balance: Math.abs(remainingFees),
        issuer: user?.fullname,
      };
    }

    return {
      date: new Date().toISOString(),
      paid: currentAmount,
      outstanding: remainingFees,
      balance: 0,
      issuer: user?.fullname,
    };
  }, [currentAmount, totalOutStanding, totalAmountPaid, totalFees]);

  //Add fees to database
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: postCurrentFee,
  });

  function onSubmit(values, options) {
    setMsg({ severity: 'info', text: '' });
    const payment = {
      session: session.sessionId,
      term: session.termId,
      level: currentLevel.levelId,
      student: studentInfo?._id,
      fee: currentLevel?.feesId,
      payment: [feeCalculation],
    };
    Swal.fire({
      title: 'Making Payment',
      text: 'Do you want to proceed with the payment?',
      showCancelButton: true,
    }).then(({ isConfirmed, isDenied, isDismissed }) => {
      if (isConfirmed) {
        mutateAsync(payment, {
          onSettled: () => {
            queryClient.invalidateQueries(['student-fees']);
            queryClient.invalidateQueries(['current-fees-summary']);
            options.setSubmitting(false);
          },
          onSuccess: async () => {
            // setMsg({ severity: 'info', text: 'Payment made successfully!!!' });
            schoolSessionDispatch(alertSuccess('Payment Done!'));

            navigate('/fee/print', {
              state: {
                feePrintData: {
                  fullName: studentInfo.fullName,
                  levelType: currentLevel?.levelType,
                  payment: payment.payment[0],
                },
              },
            });
          },
          onError: () => {
            schoolSessionDispatch(alertError('An unknown error has occurred!'));
          },
        });
      }
      if (isDenied || isDismissed) {
        setMsg({ severity: 'info', text: '' });
        options.setSubmitting(false);
      }
    });
  }

  //forms
  const formik = useFormik({
    initialValues: { amount: {} },
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  //View Student Current fee info
  const handleViewStudentFeeHistory = () => {
    studentDispatch({
      type: 'viewStudentFeeHistory',
      payload: {
        open: true,
        data: {
          id: studentInfo?._id,
          level: searchParams.get('level_id'),
          // feeId: currentLevel?.feesId,
        },
      },
    });
    setOpenStudentFeesHistory(true);
  };

  //View Fees History
  const handleOpenPaymentHistory = () => setOpenFeesHistory(true);

  return (
    <>
      <CustomTitle
        title='Fees Payment'
        subtitle='Access,manage and control payment of school fees'
        img={EMPTY_IMAGES.assessment}
        color='primary.main'
      />

      <Stack paddingY={4} spacing={2}>
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems='center'
        >
          <Autocomplete
            sx={{ width: 250 }}
            fullWidth
            options={levelOptions?.data ? levelOptions.data : []}
            loading={levelOptions?.isLoading}
            disableClearable
            closeText=' '
            noOptionsText='No Level Available'
            isOptionEqualToValue={(option, value) =>
              value.levelId === undefined ||
              value.levelId === '' ||
              option.levelId === value.levelId
            }
            getOptionLabel={(option) => option.levelType || ''}
            value={currentLevel}
            onChange={(e, value) => {
              setCurrentLevel(value);
              setSearchParams((params) => {
                params.set('level_id', value?.levelId);
                params.set('level_name', value?.levelType);
                return params;
              });
            }}
            onClose={() => {
              setStudentInfo({
                // _id: '',
                // fullName: '',
                // profile: '',
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label='Select Level' size='small' />
            )}
          />
          <Button
            startIcon={<HistoryRounded />}
            variant='contained'
            onClick={handleOpenPaymentHistory}
          >
            Payment History
          </Button>
        </Stack>

        {/* search */}
        <Autocomplete
          fullWidth
          options={students ? students : []}
          loading={levelLoading}
          disableClearable
          closeText=' '
          noOptionsText='No Student found'
          isOptionEqualToValue={(option, value) =>
            value?._id === undefined ||
            value?._id === '' ||
            option?._id === value?._id
          }
          getOptionLabel={(option) => option?.fullName || ''}
          value={studentInfo}
          onChange={(e, value) => setStudentInfo(value)}
          renderInput={(params) => (
            <TextField {...params} placeholder='Search for student' />
          )}
        />
      </Stack>

      <Grid container spacing={4} paddingY={2}>
        <Grid item xs={12} md={6} paddingY={6}>
          <div style={{ display: 'flex', gap: '4px', paddingBottom: '4px' }}>
            <Person2Sharp color='secondary' />
            <Typography variant='h6'>Personal Details</Typography>
          </div>
          <Divider />

          <Stack
            spacing={1}
            justifyContent='center'
            alignItems='center'
            paddingY={2}
          >
            <Avatar
              src={
                studentInfo?.profile === undefined ||
                studentInfo?.profile === ''
                  ? null
                  : studentInfo?.profile
                // : `${import.meta.env.VITE_BASE_URL}/images/students/${
                //     studentInfo?.profile
                //   }`
              }
              sx={{ width: 80, height: 80 }}
            />
          </Stack>
          <Stack spacing={2} paddingY={2}>
            <TextField
              size='small'
              label="Student's Name"
              InputProps={{
                readOnly: true,
              }}
              value={studentInfo?.fullName || ''}
            />

            <TextField
              size='small'
              // label='Level'
              value={currentLevel?.levelType || searchParams.get('level_name')}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
          <Stack spacing={2} paddingY={2}>
            <TextField
              type='number'
              inputMode='numeric'
              label='Amount'
              size='small'
              placeholder='Enter Amount here'
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.valueAsNumber)}
              error={formik.errors.amount}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>GHS</InputAdornment>
                ),
                endAdornment: <InputAdornment position='end'>p</InputAdornment>,
              }}
            />

            {/* <Button>Cancel</Button> */}
            <LoadingButton
              disabled={_.isEmpty(studentInfo?._id)}
              size='large'
              variant='contained'
              startIcon={<MonetizationOnRounded />}
              loading={isLoading}
              onClick={formik.handleSubmit}
            >
              Make Payment
            </LoadingButton>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} paddingY={6}>
          <div style={{ display: 'flex', gap: '4px', paddingBottom: '4px' }}>
            <MonetizationOn color='secondary' />
            <Typography variant='h6'>Fees Details</Typography>
          </div>
          <Divider />
          <Paper elevation={1} sx={{ marginTop: 2 }}>
            <Stack spacing={2} padding={2}>
              <Button
                variant='outlined'
                size='small'
                onClick={handleViewStudentFeeHistory}
                disabled={_.isEmpty(studentInfo?._id)}
              >
                Payment Details
              </Button>
              <Stack direction='row' justifyContent='space-between'>
                <Typography fontWeight='bold'>Fees</Typography>
                {!_.isEmpty(studentInfo?._id) && totalOutStanding === 0 ? (
                  <Chip
                    label='Full Payment'
                    color='success'
                    size='medium'
                    sx={{ color: 'white' }}
                    icon={<Check />}
                  />
                ) : null}
              </Stack>
              {msg.text && (
                <Alert severity={msg.severity}>
                  {msg.text}

                  {msg.text.startsWith('No') && (
                    <Link to='/fee/new'>Add New Fee</Link>
                  )}
                </Alert>
              )}
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='body2'>Fees For Term</Typography>
                <Typography variant='body2'>
                  {_.isEmpty(studentInfo?._id)
                    ? 'GHS 0.00'
                    : currencyFormatter(currentLevel?.fees || 0)}
                </Typography>
              </Stack>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='body2'>Arreas </Typography>
                <Typography variant='body2'>
                  {currencyFormatter(totalArreas)}
                </Typography>
              </Stack>
              <Divider flexItem />
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography fontWeight='bold'>Total </Typography>
                <Typography variant='body2'>
                  {_.isEmpty(studentInfo?._id)
                    ? 'GHS 0.00'
                    : currencyFormatter(totalFeesToBePaid)}
                </Typography>
              </Stack>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography fontWeight='bold'>Fees Paid </Typography>
                <Typography variant='body2'>
                  {_.isEmpty(studentInfo?._id)
                    ? 'GHS 0.00'
                    : currencyFormatter(currentFeesPaid)}
                </Typography>
              </Stack>
              <Divider flexItem />
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography fontWeight='bold'>Outstanding Fees </Typography>
                <Typography variant='body2'>
                  {_.isEmpty(studentInfo?._id)
                    ? 'GHS 0.00'
                    : currencyFormatter(totalOutStanding)}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/*View  Student fee History */}
      <FeePaymentHistory open={openFeesHistory} setOpen={setOpenFeesHistory} />

      <StudentFeesHistory
        open={openStudentFeesHistory}
        setOpen={setOpenStudentFeesHistory}
      />
    </>
  );
};

export default FeeMakePayment;
