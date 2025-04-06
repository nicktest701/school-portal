import Check from "@mui/icons-material/Check";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import MonetizationOnRounded from "@mui/icons-material/MonetizationOnRounded";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { use, useMemo } from "react";
import Swal from "sweetalert2";
import _ from "lodash";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentFeeForStudent, postCurrentFee } from "@/api/currentFeeAPI";
import { currencyFormatter } from "@/config/currencyFormatter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "@/context/providers/UserProvider";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomTitle from "@/components/custom/CustomTitle";
import { EMPTY_IMAGES } from "@/config/images";
import { MonetizationOn, Person2Sharp } from "@mui/icons-material";
import useLevelById from "@/components/hooks/useLevelById";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import useLevel from "@/components/hooks/useLevel";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/inputs/Input";
import FeesDetailsSkeleton from "@/components/skeleton/FeesDetailsSkeleton";

const schema = yup.object().shape({
  // _id: yup.string().required("ID is required"),
  level: yup.object().shape({
    levelId: yup.string().required("Level ID is required"),
    levelName: yup.string().required("Level Name is required"),
  }),
  student: yup.object().shape({
    _id: yup.string().required("Student ID is required"),
    fullName: yup.string().required("Full Name is required"),
    profile: yup.string().url("Profile must be a valid URL").optional(),
  }),
  amount: yup
    .number()
    .min(0, "Amount cannot be negative")
    .required("Amount is required"),
});

const FeeMakePayment = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams, setSearchParams] = useSearchParams();
  const { fees, levelLoading: feesLoading } = useLevel();
  const { session } = use(UserContext);
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      level: {
        levelId: searchParams.get("level_id") || "",
        levelName: searchParams.get("level_name") || "",
      },
      student: {
        _id: "",
        fullName: "",
        profile: "",
      },
      amount: "",
    },
  });

  const currentAmount = watch("amount");
  const currentLevel = watch("level");
  const studentInfo = watch("student");

  ///Get Student fees info
  const studentFees = useQuery({
    queryKey: ["student-fees", studentInfo?._id, searchParams.get("level_id")],
    queryFn: () =>
      getCurrentFeeForStudent({
        session: session?.sessionId,
        term: session?.termId,
        student: studentInfo?._id,
        level: searchParams.get("level_id"),
      }),

    enabled: !!studentInfo?._id && !!searchParams.get("level_id"),
    initialData: {
      current: {
        fees: 0,
        paid: 0,
        remaining: 0,
      },
      previous: { fees: 0, paid: 0, remaining: 0 },
      totalFees: 0,
      totalOutstanding: 0,
    },
  });

  const { students, levelLoading } = useLevelById(currentLevel?.levelId);

  const currentFees = useMemo(() => {
    const selectedFee = fees?.find(
      (fee) => fee?.levelId === searchParams.get("level_id")
    );
    return selectedFee?.fees || 0;
  }, [searchParams.get("level_id")]);

  //Add fees to database
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postCurrentFee,
  });

  function onSubmit(values) {
    const payment = {
      _id: studentFees?.data?.current?._id,
      payment: {
        paid: values.amount,
        outstanding:
          Number(studentFees?.data?.totalOutstanding) - Number(values.amount),
      },
    };
    Swal.fire({
      title: "Making Payment",
      text: "Do you want to proceed with the payment?",
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(payment, {
          onSettled: () => {
            setValue("amount", "");
            queryClient.invalidateQueries([
              "student-fees",
              studentInfo?._id,
              searchParams.get("level_id"),
            ]);
          },
          onSuccess: async () => {
            schoolSessionDispatch(alertSuccess("Payment Done!"));

            // navigate("/fee/print", {
            //   state: {
            //     feePrintData: {
            //       fullName: studentInfo.fullName,
            //       levelType: currentLevel?.levelName,
            //       payment: payment.payment[0],
            //     },
            //   },
            // });
          },
          onError: () => {
            schoolSessionDispatch(alertError("An unknown error has occurred!"));
          },
        });
      }
    });
  }

  //View Student Current fee info
  const handleViewStudentFeeHistory = () => {
    navigate(
      `/fee/payment/${studentInfo?.fullName}?level_id=${searchParams.get(
        "level_id"
      )}&_id=${studentInfo?._id}`,
      {
        state: {
          prevPath: `/fee/payment?level_id=${searchParams.get(
            "level_id"
          )}&level_name=${searchParams.get("level_name")}`,
        },
      }
    );
  };

  //View Fees History
  const handleOpenPaymentHistory = () => navigate("/fee/history");

  return (
    <>
      <CustomTitle
        title="Fees Payment"
        subtitle="Access,manage and control payment of school fees"
        img={EMPTY_IMAGES.assessment}
        color="primary.main"
        right={
          <Button
            startIcon={<HistoryRounded />}
            variant="contained"
            onClick={handleOpenPaymentHistory}
          >
            {matches ? "" : "Payment History"}
          </Button>
        }
      />

      <Stack p={2} spacing={2} bgcolor="#fff" my={2} borderRadius="12px">
        <Stack
          direction="row"
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
          gap={2}
        >
          <Autocomplete
            sx={{ width: { xs: "100%", sm: 300 } }}
            fullWidth
            options={fees || []}
            loading={feesLoading}
            disableClearable
            closeText=" "
            noOptionsText="No Level Available"
            isOptionEqualToValue={(option, value) =>
              value?.levelId === undefined ||
              value?.levelId === "" ||
              option?.levelId === value?.levelId
            }
            getOptionLabel={(option) => option?.levelName || ""}
            value={currentLevel}
            onChange={(e, value) => {
              setValue("level", value);
              setSearchParams((params) => {
                params.set("level_id", value?.levelId);
                params.set("level_name", value?.levelName);
                return params;
              });
            }}
            onClose={() => {}}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Level"
                error={errors?.level}
                helperText={errors?.level?.levelId?.message}
              />
            )}
          />
        </Stack>

        {/* search */}
        <Autocomplete
          fullWidth
          options={students ? students : []}
          loading={levelLoading}
          disableClearable
          closeText=" "
          noOptionsText="No Student found"
          isOptionEqualToValue={(option, value) =>
            value?._id === undefined ||
            value?._id === "" ||
            option?._id === value?._id
          }
          getOptionLabel={(option) => option?.fullName || ""}
          value={studentInfo}
          onChange={(e, value) =>
            setValue("student", {
              _id: value?.id,
              fullName: value?.fullName,
              profile: value?.profile,
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for student"
              error={errors?.student}
              helperText={errors?.student?._id?.message}
            />
          )}
        />
      </Stack>

      <Grid container spacing={4} p={2} bgcolor="#fff" borderRadius="12px">
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <div style={{ display: "flex", gap: "4px", paddingBottom: "4px" }}>
            <Person2Sharp color="secondary" />
            <Typography variant="h6">Personal Details</Typography>
          </div>
          <Divider />

          <Paper elevation={1} sx={{ marginTop: 2, p: 1 }}>
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="center"
              py={2}
            >
              <Avatar
                src={studentInfo?.profile}
                sx={{ width: 80, height: 80 }}
              />
            </Stack>
            <Stack spacing={2} py={2}>
              <TextField
                size="small"
                label="Student's Name"
                InputProps={{
                  readOnly: true,
                }}
                value={studentInfo?.fullName || ""}
              />

              <TextField
                size="small"
                // label='Level'
                value={
                  currentLevel?.levelName || searchParams.get("level_name")
                }
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              <Input
                control={control}
                name="amount"
                type="number"
                inputMode="numeric"
                label="Amount"
                size="small"
                placeholder="Enter Amount here"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">GHS</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">p</InputAdornment>
                  ),
                }}
              />

              <Button
                disabled={
                  _.isEmpty(studentInfo?._id) ||
                  studentFees?.data?.totalOutstanding === 0
                }
                size="large"
                variant="contained"
                startIcon={<MonetizationOnRounded />}
                loading={isPending}
                onClick={handleSubmit(onSubmit)}
              >
                Make Payment
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <div style={{ display: "flex", gap: "4px", paddingBottom: "4px" }}>
            <MonetizationOn color="secondary" />
            <Typography variant="h6">Fees Details</Typography>
          </div>
          <Divider />
          {studentFees.isPending ? (
            <FeesDetailsSkeleton />
          ) : (
            <Paper elevation={1} sx={{ marginTop: 2 }}>
              <Stack spacing={2} padding={2}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleViewStudentFeeHistory}
                  disabled={_.isEmpty(studentInfo?._id)}
                >
                  Payment Details
                </Button>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="bold">Fees</Typography>
                  {!_.isEmpty(studentInfo?._id) &&
                  studentFees?.data?.totalOutstanding === 0 ? (
                    <Chip
                      label="Full Payment"
                      color="success"
                      size="medium"
                      sx={{ color: "white" }}
                      icon={<Check />}
                    />
                  ) : null}
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2">Fees For Term</Typography>
                  <Typography variant="body2">
                    {currencyFormatter(
                      studentFees?.data?.current?.fees || currentFees
                    )}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2">Arreas </Typography>
                  <Typography variant="body2">
                    {currencyFormatter(studentFees?.data?.previous?.remaining)}
                  </Typography>
                </Stack>
                <Divider flexItem />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="bold">Total </Typography>
                  <Typography variant="body2">
                    {currencyFormatter(studentFees?.data?.totalFees)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="bold">Fees Paid </Typography>
                  <Typography variant="body2">
                    {currencyFormatter(studentFees?.data?.current?.paid)}
                  </Typography>
                </Stack>
                <Divider flexItem />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="bold">Outstanding Fees </Typography>
                  <Typography variant="body2">
                    {currencyFormatter(studentFees?.data?.totalOutstanding)}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default FeeMakePayment;
