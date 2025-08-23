import React, { useContext, useState } from "react";
import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Alert,
  List,
  Typography,
  FormHelperText,
  InputAdornment,
  Divider,
  Box,
} from "@mui/material";
import _ from "lodash";
import { Formik } from "formik";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import { FEES_OPTIONS } from "@/mockup/columns/sessionColumns";
import { getAllFees, postFee } from "@/api/feeAPI";
import FeesItem from "./FeeItem";
import { feeValidationSchema } from "@/config/validationSchema";
import { currencyFormatter } from "@/config/currencyFormatter";
import useLevel from "@/components/hooks/useLevel";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { UserContext } from "@/context/providers/UserProvider";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

const AddFee = ({ open, setOpen }) => {
  const { session } = useContext(UserContext);

  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [currentLevel, setCurrentLevel] = useState({ _id: "", type: "" });

  const [fee, setFee] = useState("");
  const [feeList, setFeeList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [msg, setMsg] = useState({
    severity: "",
    text: "",
  });

  //Find all existing level
  const { levelsOption } = useLevel();

  const allFees = useQuery({
    queryKey: ["fees", session?.sessionId],
    queryFn: () => getAllFees(session),
    enabled: !!session?.sessionId,
  });

  const initialValues = {
    level: currentLevel,
    fee: feeList,
  };

  //ADD Fee item to list
  const handleAddFee = () => {
    if (fee === "" || amount === "") {
      return;
    }
    setFeeList((prev) => {
      return prev !== undefined
        ? _.values(
            _.merge(_.keyBy([...prev, { fee, amount: Number(amount) }], "fee"))
          )
        : [{ fee, amount: Number(amount) }];
    });

    setFee("");
    setAmount("");
  };

  //REMOVE fee item from list
  const handleRemoveFee = (searchFee) => {
    setFeeList((prev) => {
      const filteredFees = prev.filter(({ fee }) => fee !== searchFee);
      return filteredFees;
    });
  };

  const totalFees = currencyFormatter(_.sumBy(feeList, "amount"));

  const { mutateAsync, isPending } = useMutation({ mutationFn: postFee });

  const onSubmit = (values, options) => {
    setMsg({ text: "" });

    const newValues = {
      session: session.sessionId,
      term: session.termId,
      level: values.level._id,
      levelType: values.level.type,
      amount: values.fee,
    };

    //Check if fees for class already exist
    const isLevelAvailable = allFees?.data.find(
      ({ _id }) => _id === newValues.level
    );

    if (!_.isEmpty(isLevelAvailable)) {
      setMsg({
        severity: "error",
        text: `Fees for ${newValues.levelType} already exists.Please try updating it.`,
      });
      return;
    }

    // //console.log(newValues);
    mutateAsync(newValues, {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["fees", session?.sessionId, session?.termId],
        });
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setOpen(false);
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <CustomDialogTitle title="New Fees" onClose={handleClose} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={feeValidationSchema}
        enableReinitialize={true}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => {
          return (
            <>
              {msg.text && (
                <Alert
                  sx={{
                    my: 1,
                  }}
                  severity={msg.severity}
                  onClose={() =>
                    setMsg({
                      text: "",
                    })
                  }
                >
                  {msg.text}
                </Alert>
              )}
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <Autocomplete
                    fullWidth
                    options={levelsOption}
                    isOptionEqualToValue={(option, value) =>
                      value._id === undefined ||
                      value._id === "" ||
                      option._id === value._id
                    }
                    getOptionLabel={(option) => option.type || ""}
                    value={currentLevel}
                    onChange={(e, value) => setCurrentLevel(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Level"
                        size="small"
                        error={Boolean(
                          touched?.level?.type && errors?.level?.type
                        )}
                        helperText={touched?.level?.type && errors?.level?.type}
                      />
                    )}
                  />

                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={FEES_OPTIONS}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined || value === "" || option === value
                    }
                    getOptionLabel={(option) => option || ""}
                    value={fee}
                    onInputChange={(e, value) => setFee(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Fee Type"
                        size="small"
                        error={Boolean(touched?.fee && errors?.fee)}
                        helperText={
                          touched?.fee &&
                          errors?.fee &&
                          "Enter a least one fee type*"
                        }
                      />
                    )}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      type="number"
                      label="Enter Fee Amount"
                      size="small"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              GHS
                            </InputAdornment>
                          ),

                          endAdornment: (
                            <InputAdornment position="end">p</InputAdornment>
                          ),
                        },
                      }}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      error={Boolean(touched?.fee && errors?.fee)}
                      helperText={touched?.fee && errors?.fee && "Required*"}
                      disabled={_.isEmpty(fee)}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleAddFee}
                      disabled={_.isEmpty(amount)}
                    >
                      Add
                    </Button>
                  </Box>

                  <List
                    sx={{ maxHeight: 400 }}
                    subheader={
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Fees
                      </Typography>
                    }
                  >
                    {_.isEmpty(feeList) ? (
                      <Typography>No Fee Available</Typography>
                    ) : (
                      feeList.map((fee) => {
                        return (
                          <FeesItem
                            key={fee.fee}
                            data={fee}
                            removeFee={handleRemoveFee}
                          />
                        );
                      })
                    )}
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total Fees
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {totalFees}
                      </Typography>
                    </Stack>
                  </List>
                  {errors.fee && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.fee}
                    </FormHelperText>
                  )}
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  loading={isSubmitting || isPending}
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={_.isEmpty(feeList)}
                >
                  Save Fee
                </Button>
              </DialogActions>
              {(isPending || isSubmitting) && (
                <LoadingSpinner value="Adding New Fee..." />
              )}
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddFee;
