import React, { useContext, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  DialogActions,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { assignTeacherLevel } from "../../api/levelAPI";
import { currentLevelValidationSchema } from "../../config/validationSchema";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import useLevel from "../../components/hooks/useLevel";
import CustomTitle from "../../components/custom/CustomTitle";
import Back from "../../components/Back";
import { getTeacher } from "../../api/teacherAPI";
import TeacherLevels from "./TeacherLevels";

const TeacherAssignLevel = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [currentLevel, setCurrentLevel] = useState({
    _id: "",
    type: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const { levelsOption, levelLoading } = useLevel();

  const teacher = useQuery({
    queryKey: ["teacher", id],
    queryFn: () => getTeacher(id),
    initialData: queryClient
      .getQueryData(["teachers", id])
      ?.find((teacher) => teacher?._id === id),
    enabled: !!id,
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: assignTeacherLevel,
  });
  const onSubmit = (values, options) => {
    const info = {
      _id: values?._id,
      teacher: {
        _id: id,
        fullName: teacher?.data?.fullName,
      },
    };

    mutateAsync(info, {
      onSettled: () => {
        queryClient.invalidateQueries(["levels"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  // const handleClose = () => setOpen(false);

  return (
    <Container>
      <Back to={`/teacher/${id}`} color="primary.main" />
      <CustomTitle
        title="Assign New Level"
        subtitle="Assign management of a level to teacher"
        color="primary.main"
      />

      <Formik
        initialValues={currentLevel}
        validationSchema={currentLevelValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched, handleSubmit, handleReset }) => {
          return (
            <>
              <Box
                sx={{
                  mt: 4,
                  py: 4,
                  px: 2,
                  border: "1px solid lightgray",
                  // borderRadius: 2,
                  bgcolor: "#fff",
                }}
              >
                <Autocomplete
                  size="small"
                  options={levelsOption}
                  loading={levelLoading}
                  loadingText="Loading levels.Please wait..."
                  getOptionLabel={(option) => option?.type || ""}
                  isOptionEqualToValue={(option, value) =>
                    value._id === undefined ||
                    value._id === "" ||
                    value._id === option._id
                  }
                  value={currentLevel}
                  onChange={(e, value) => setCurrentLevel(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a level"
                      error={Boolean(touched.type && errors.type)}
                      helperText={touched.type && errors.type}
                    />
                  )}
                  sx={{ marginY: 2 }}
                />
                <DialogActions>
                  <Button onClick={handleReset}>Cancel</Button>
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={currentLevel?._id === ""}
                  >
                    Assign Level
                  </LoadingButton>
                </DialogActions>
              </Box>
            </>
          );
        }}
      </Formik>

      <TeacherLevels />
    </Container>
  );
};

export default React.memo(TeacherAssignLevel);
