import React, { use } from "react";
import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import _ from "lodash";
import { Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LEVEL_OPTIONS,
  LEVEL_TYPE_OPTIONS,
} from "@/mockup/columns/sessionColumns";
import { levelValidationSchema } from "@/config/validationSchema";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import useLevel from "@/components/hooks/useLevel";
import { postLevel } from "@/api/levelAPI";
import { levelInitialValues } from "@/config/initialValues";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { UserContext } from "@/context/providers/UserProvider";
import { getAllTeachers } from "@/api/teacherAPI";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

const AddLevel = ({ open, setOpen }) => {
  const { session } = use(UserContext);

  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const { levelsOption } = useLevel();

  const teachers = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
    initialData: [],
    select: (teachers) => {
      const modifiedTeachers = teachers?.map((teacher) => {
        return {
          _id: teacher?._id,
          fullName: teacher?.fullname,
        };
      });
      // console.log(modifiedTeachers);
      return modifiedTeachers;
    },
  });

  //ADD New Level
  const { mutateAsync, isPending } = useMutation({ mutationFn: postLevel });

  const onSubmit = (values, options) => {
    const newType = `${values.level}${values.type}`;
    const isMatch = levelsOption.find(
      ({ type }) => type === newType.toUpperCase()
    );

    if (!_.isEmpty(isMatch)) {
      schoolSessionDispatch(alertError("Level already exists!!!"));
      options.setSubmitting(false);
      return;
    }

    const newLevel = {
      session: session.sessionId,
      term: session.termId,
      level: {
        name: values.level,
        type: values.type,
      },
    };
    if (values?.teacher?._id) {
      newLevel.teacher = values?.teacher?._id;
    }

    mutateAsync(newLevel, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(["levels"]);
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

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <CustomDialogTitle title="New Level" onClose={() => setOpen(false)} />
      <Formik
        initialValues={levelInitialValues}
        onSubmit={onSubmit}
        validationSchema={levelValidationSchema}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent sx={{ p: 1 }}>
                <Stack spacing={2} paddingY={2}>
                  <Autocomplete
                    freeSolo
                    options={LEVEL_OPTIONS}
                    getOptionLabel={(option) => option || ""}
                    value={values.level}
                    onInputChange={(e, value) => setFieldValue("level", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Level"
                        size="small"
                        error={Boolean(touched.level && errors.level)}
                        helperText={touched.level && errors.level}
                      />
                    )}
                  />
                  <Autocomplete
                    freeSolo
                    options={LEVEL_TYPE_OPTIONS}
                    getOptionLabel={(option) => option || ""}
                    value={values.type}
                    onInputChange={(e, value) => setFieldValue("type", value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Type" size="small" />
                    )}
                  />
                  <Autocomplete
                    options={teachers?.data}
                    loading={teachers.isPending}
                    getOptionLabel={(option) => option?.fullName || ""}
                    value={values?.teacher}
                    onChange={(e, value) => setFieldValue("teacher", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Assign Teacher"
                        size="small"
                      />
                    )}
                  />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button
                  loading={isPending}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Add Level
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>

      {isPending && (
        <LoadingSpinner value="Creating New Level. Please wait..." />
      )}
    </Dialog>
  );
};

export default AddLevel;
