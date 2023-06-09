import {
  Check,
  HistoryRounded,
  MonetizationOnRounded,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllStudentsForSearch } from '../../api/studentAPI';
import StudentFeeSkeleton from '../../components/skeleton/StudentFeeSkeleton';
import { getAllFeesByCurrentLevel } from '../../api/feeAPI';
import {
  getCurrentFeeForStudent,
  postCurrentFee,
} from '../../api/currentFeeAPI';
import { currencyFormatter } from '../../config/currencyFormatter';
import { StudentContext } from '../../context/providers/StudentProvider';
import StudentFeesHistory from './StudentFeesHistory';
import { Link, useNavigate } from 'react-router-dom';
import FeePaymentHistory from './FeePaymentHistory';
import { UserContext } from '../../context/providers/userProvider';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
const FeeMakePayment = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  //Get Session id
  const {
    userState: { user, session },
  } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const { studentDispatch } = useContext(StudentContext);
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  //States
  const [msg, setMsg] = useState({ severity: '', text: '' });
  const [openFeesHistory, setOpenFeesHistory] = useState(false);
  const [openStudentFeesHistory, setOpenStudentFeesHistory] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});
  const [levelOption, setLevelOption] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({
    levelId: '',
    levelType: '',
    feesId: '',
    fees: 0,
  });
  const [currentStudents, setCurrentStudents] = useState([]);
  const [searchValue, setSearchValue] = useState({
    id: '',
    profile: '',
    fullName: '',
    label: '',
    level: '',
    levelType: '',
  });

  //fee info
  const [totalFees, setTotalFees] = useState(Number(0));
  const [currentFeesPaid, setCurrentFeesPaid] = useState(Number(0));
  const [totalArreas, setTotalArreas] = useState(Number(0));
  const [totalAmountPaid, setTotalAmountPaid] = useState(Number(0));
  const [currentAmount, setCurrentAmount] = useState(Number(0));

  useQuery(
    ['all-level-fees'],
    () =>
      getAllFeesByCurrentLevel({
        session: session.sessionId,
        term: session.termId,
      }),
    {
      onSuccess: (fees) => {
        setLevelOption(fees);
      },
    }
  );

  useEffect(() => {
    setCurrentStudents([]);
    setSearchValue({
      id: '',
      profile: '',
      fullName: '',
      label: '',
      level: '',
      levelType: '',
    });
    setStudentInfo({});
  }, [currentLevel]);

  //Get All Students for search
  useQuery(
    ['all-students-for-search', currentLevel?.levelId],
    () =>
      getAllStudentsForSearch({
        session: session.sessionId,
        term: session.termId,
        level: currentLevel.levelId,
      }),
    {
      enabled: !!currentLevel?.levelId,
      onSuccess: (students) => {
        if (students.length === 0) {
          setCurrentStudents([]);
          return;
        }
        setCurrentStudents(students);
      },
    }
  );

  //Search Student
  useEffect(() => {
    startTransition(() => {
      if (searchValue?.fullName === '') {
        setStudentInfo({});
        return;
      }

      const student = currentStudents.filter(({ fullName }) => {
        return (
          fullName
            ?.toLowerCase()
            ?.lastIndexOf(searchValue?.fullName?.toLowerCase()) > -1
        );
      });
      setStudentInfo(student[0]);
    });
  }, [searchValue, currentStudents]);

  ///Get Student fees info
  useQuery(
    ['student-fees', studentInfo?.id, studentInfo?.level],
    () =>
      getCurrentFeeForStudent({
        session: session.sessionId,
        term: session.termId,
        student: studentInfo?.id,
        level: studentInfo?.level,
      }),
    {
      enabled: !!studentInfo?.id && !!studentInfo?.level,
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
  const { mutateAsync } = useMutation({
    mutationFn: postCurrentFee,
  });

  function onSubmit(values, options) {
    setMsg({ severity: 'info', text: '' });
    const payment = {
      session: session.sessionId,
      term: session.termId,
      level: studentInfo?.level,
      student: studentInfo?.id,
      fee: currentLevel?.feesId,
      payment: [feeCalculation],
    };
    Swal.fire({
      title: 'Making Payment',
      text: 'Do you want to proceed with the payment?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed, isDenied, isDismissed }) => {
      if (isConfirmed) {
        mutateAsync(payment, {
          onSettled: () => {
            queryClient.invalidateQueries(['student-fees']);
            queryClient.invalidateQueries(['current-fees-summary']);
            options.setSubmitting(false);
          },
          onSuccess: async () => {
            setMsg({ severity: 'info', text: 'Payment made successfully!!!' });

            // console.log(payment);

            await schoolSessionDispatch({
              type: 'printFees',
              payload: {
                fullName: studentInfo.fullName,
                levelType: studentInfo.levelType,
                payment: payment.payment[0],
              },
            });
            navigate('/fee/print');
            options.resetForm();
          },
          onError: () => {
            setMsg({
              severity: 'error',
              text: 'Couldnt make payment.Try again',
            });
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
      type: 'setCurrentStudentFeeInfo',
      payload: {
        id: studentInfo?.id,
        level: studentInfo?.level,
      },
    });
    setOpenStudentFeesHistory(true);
  };

  //View Fees History
  const handleOpenPaymentHistory = () => setOpenFeesHistory(true);

  return (
    <Container sx={{ paddingY: 2 }} maxWidth='md'>
      <Typography variant='h4'>Fees Payment</Typography>
      <Typography>Access,manage and control payment of school fees</Typography>
      <Divider />
      <Stack paddingY={4} spacing={2}>
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems='center'
        >
          <Autocomplete
            sx={{ width: 250 }}
            fullWidth
            options={levelOption}
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
              setCurrentStudents([]);
            }}
            onClose={() => {
              setSearchValue({});
              setStudentInfo({});
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
          options={currentStudents}
          disableClearable
          closeText=' '
          noOptionsText='No Student found'
          isOptionEqualToValue={(option, value) =>
            value.id === undefined || value.id === '' || option.id === value.id
          }
          getOptionLabel={(option) => option.fullName || ''}
          value={searchValue}
          onChange={(e, value) => {
            setStudentInfo({});
            setSearchValue(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // size="small"
              placeholder='Search for student'
            />
          )}
        />
      </Stack>

      <Grid container spacing={4} paddingY={2}>
        {isPending ? (
          <Grid item xs={12} md={6} paddingY={4}>
            <StudentFeeSkeleton />
          </Grid>
        ) : (
          <Grid item xs={12} md={6} paddingY={4}>
            <Typography variant='h6'>Personal Details</Typography>
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
                    : `${import.meta.env.VITE_BASE_URL}/images/students/${
                        studentInfo?.profile
                      }`
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
                label='Level'
                value={studentInfo?.levelType || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
          </Grid>
        )}

        <Grid item xs={12} md={6} paddingY={2}>
          <Typography variant='h6'>Fees Details</Typography>
          <Divider />
          <Paper elevation={1} sx={{ marginTop: 2 }}>
            <Stack spacing={2} padding={2}>
              <Button
                variant='outlined'
                size='small'
                onClick={handleViewStudentFeeHistory}
                disabled={_.isEmpty(studentInfo) ? true : false}
              >
                Payment Details
              </Button>
              <Stack direction='row' justifyContent='space-between'>
                <Typography fontWeight='bold'>Fees</Typography>
                {!_.isEmpty(studentInfo) && totalOutStanding === 0 ? (
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
                  {_.isEmpty(studentInfo)
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
                  {_.isEmpty(studentInfo)
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
                  {_.isEmpty(studentInfo)
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
                  {_.isEmpty(studentInfo)
                    ? 'GHS 0.00'
                    : currencyFormatter(totalOutStanding)}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
          <Stack spacing={2} paddingY={2}>
            <TextField
              type='number'
              inputMode='number'
              label='Amount'
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
          </Stack>
        </Grid>
      </Grid>
      <Divider />
      <Stack direction='row' justifyContent='flex-end' paddingY={1} spacing={2}>
        <Button>Cancel</Button>
        <LoadingButton
          disabled={_.isEmpty(studentInfo) ? true : false}
          variant='contained'
          startIcon={<MonetizationOnRounded />}
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          Make Payment
        </LoadingButton>
      </Stack>
      {/*View  Student fee History */}
      <FeePaymentHistory open={openFeesHistory} setOpen={setOpenFeesHistory} />

      <StudentFeesHistory
        open={openStudentFeesHistory}
        setOpen={setOpenStudentFeesHistory}
      />
    </Container>
  );
};

export default FeeMakePayment;
