import React, { useContext, useState } from "react";
import {
  Stack,
  Button,
  TextField,
  Autocomplete,
  Alert,
  Grid2,
  Typography,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExams } from "@/api/ExaminationAPI";
import { examsScoreValidationSchema } from "@/config/validationSchema";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { generateCustomGrade } from "@/config/generateCustomGrade";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "@/context/providers/UserProvider";
import useLevelById from "@/components/hooks/useLevelById";
import ExamsScoreTable from "@/components/tables/ExamsScoreTable";

const ExamsScoreInput = ({ setTab, scores }) => {
  const { session } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const { levelId } = useParams();
  const [searchParams] = useSearchParams();

  const [msgs, setMsgs] = useState({ severity: "", text: "" });

  const [scoreList, setScoreList] = useState(scores || []);
  const { gradeSystem, subjects } = useLevelById(levelId);

  //Score preference
  const scorePreference = session?.exams?.scorePreference?.split("/");
  const classScorePreference = scorePreference?.[0] ?? 50;
  const examsScorePreference = scorePreference?.[1] ?? 50;

  //React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      examsScoreValidationSchema(classScorePreference, examsScorePreference)
    ),
    defaultValues: {
      subject: null,
      classScore: "",
      examsScore: "",
    },
  });

  //Add Score Handler
  const onSubmit = (values) => {
    const total = Number(values.classScore) + Number(values.examsScore);
    const summary = generateCustomGrade(total, gradeSystem?.ratings);

    const score = {
      _id: values?.subject?._id,
      subject: values?.subject?.name,
      classScore: Number(values.classScore),
      examsScore: Number(values.examsScore),
      ...summary,
    };

    //Optimized merge: overrides matching subject score
    const merged = { ..._.keyBy(scoreList, "_id"), [score._id]: score };
    setScoreList(Object.values(merged));

    reset();
  };

  //SAVE RESULTS
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateExams,
  });

  const handleSaveResults = () => {
    const data = {
      session: {
        levelId,
        studentId: searchParams.get("sid"),
        sessionId: session.sessionId,
        termId: session.termId,
      },
      scores: scoreList,
    };

    mutateAsync(data, {
      onSettled: () => {
        queryClient.invalidateQueries(["exams-by-id", searchParams.get("eid")]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setTab("1");
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  //CLOSE FORM
  const handleClose = () =>
    schoolSessionDispatch({
      type: "openAddExamsScore",
      payload: { open: false, data: {} },
    });

  return (
    <>
      {msgs.text && (
        <Alert
          sx={{ marginY: 1 }}
          severity={msgs.severity}
          onClose={() => setMsgs({ text: "" })}
        >
          {msgs.text}
        </Alert>
      )}

      <Box sx={{ bgcolor: "#fff", borderRadius: "12px", p: 2 }}>
        {/* HEADER */}
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "flex-start", md: "flex-end" }}
          pb={2}
        >
          <Typography
            variant="h6"
            color="primary.main"
            p={1}
            sx={{ fontWeight: "bold", width: "100%" }}
          >
            Results Entry
          </Typography>

          <Stack direction="row">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              disabled={scoreList.length === 0}
              onClick={handleSaveResults}
              loading={isPending}
            >
              Save Results
            </Button>
          </Stack>
        </Stack>

        <Grid2 container spacing={2} sx={{ minHeight: "60svh" }}>
          {/* LEFT PANEL (INPUT FORM) */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Typography
                variant="h6"
                color="primary.main"
                bgcolor="lightgray"
                p={1}
                sx={{ fontWeight: "bold", width: "100%" }}
              >
                Add Subject Score
              </Typography>

              {/* SUBJECT AUTOCOMPLETE */}
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={subjects}
                    getOptionLabel={(option) => option?.name || ""}
                    value={field.value}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subject"
                        size="small"
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                      />
                    )}
                  />
                )}
              />

              {/* CLASS SCORE */}
              <Controller
                name="classScore"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Class Score"
                    size="small"
                    error={!!errors.classScore}
                    helperText={errors.classScore?.message}
                  />
                )}
              />

              {/* EXAMS SCORE */}
              <Controller
                name="examsScore"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Exams Score"
                    size="small"
                    error={!!errors.examsScore}
                    helperText={errors.examsScore?.message}
                  />
                )}
              />

              <Button
                variant="contained"
                disabled={!isValid || !isDirty}
                onClick={handleSubmit(onSubmit)}
              >
                Add Score
              </Button>
            </Stack>
          </Grid2>

          {/* RIGHT PANEL (PREVIEW TABLE) */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Typography
              variant="h6"
              color="primary.main"
              bgcolor="lightgray"
              p={1}
              sx={{ fontWeight: "bold", width: "100%" }}
            >
              Scores Preview
            </Typography>

            <Box
              sx={{
                maxWidth: { xs: 300, sm: "100%" },
                overflowX: "auto",
              }}
            >
              <ExamsScoreTable data={scoreList} setData={setScoreList} />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default ExamsScoreInput;

// import React, { useContext, useState } from "react";
// import {
//   Stack,
//   Button,
//   TextField,
//   Autocomplete,
//   Alert,
//   Grid2,
//   Typography,
//   Box,
// } from "@mui/material";
// import _ from "lodash";
// import { Formik } from "formik";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateExams } from "@/api/ExaminationAPI";
// import { examsScoreValidationSchema } from "@/config/validationSchema";
// import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
// import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
// import { generateCustomGrade } from "@/config/generateCustomGrade";
// import { useParams, useSearchParams } from "react-router-dom";
// import { UserContext } from "@/context/providers/UserProvider";
// import useLevelById from "@/components/hooks/useLevelById";
// import ExamsScoreTable from "@/components/tables/ExamsScoreTable";

// const ExamsScoreInput = ({ setTab, scores }) => {
//   const { session } = useContext(UserContext);
//   const { schoolSessionDispatch } = useContext(SchoolSessionContext);
//   const { levelId } = useParams();
//   const queryClient = useQueryClient();
//   const [searchParams] = useSearchParams();

//   const [msgs, setMsgs] = useState({
//     severity: "",
//     text: "",
//   });

//   const [scoreList, setScoreList] = useState(scores || []);
//   const { gradeSystem, subjects } = useLevelById(levelId);

//   const scorePreference = session?.exams?.scorePreference?.split("/");
//   const classScorePreference = !_.isUndefined(scorePreference)
//     ? scorePreference[0]
//     : 50;
//   const examsScorePreference = !_.isUndefined(scorePreference)
//     ? scorePreference[1]
//     : 50;

//   const initialValues = {
//     subject: {
//       _id: "",
//       name: "",
//     },
//     classScore: 0,
//     examsScore: 0,
//   };

//   const onSubmit = (values, option) => {
//     const total = Number(values.classScore) + Number(values.examsScore);

//     const summary = generateCustomGrade(total, gradeSystem?.ratings);

//     const score = {
//       _id: values?.subject?._id,
//       subject: values?.subject?.name,
//       classScore: values.classScore,
//       examsScore: values.examsScore,
//       ...summary,
//     };

//     const filteredScoreList = _.merge(_.keyBy([...scoreList, score], "_id"));
//     setScoreList(_.values(filteredScoreList));

//     option.resetForm();
//   };

//   const { mutateAsync, isPending } = useMutation({
//     mutationFn: updateExams,
//   });

//   //Handle Save Results
//   const handleSaveResults = () => {
//     const data = {
//       session: {
//         levelId,
//         studentId: searchParams.get("sid"),
//         sessionId: session.sessionId,
//         termId: session.termId,
//       },
//       scores: scoreList,
//     };

//     mutateAsync(data, {
//       onSettled: () => {
//         queryClient.invalidateQueries(["exams-by-id", searchParams.get("eid")]);
//       },
//       onSuccess: (data) => {
//         schoolSessionDispatch(alertSuccess(data));
//         setTab("1");
//       },
//       onError: (error) => {
//         schoolSessionDispatch(alertError(error));
//       },
//     });
//   };

//   //CLOSE FORM
//   const handleClose = () =>
//     schoolSessionDispatch({
//       type: "openAddExamsScore",
//       payload: {
//         open: false,
//         data: {},
//       },
//     });

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={examsScoreValidationSchema(
//         classScorePreference,
//         examsScorePreference
//       )}
//       onSubmit={onSubmit}
//     >
//       {({
//         values,
//         errors,
//         isValid,
//         dirty,
//         handleChange,
//         handleSubmit,
//         setFieldValue,
//       }) => {
//         return (
//           <>
//             {msgs.text && (
//               <Alert
//                 sx={{
//                   marginY: 1,
//                 }}
//                 severity={msgs.severity}
//                 onClose={() =>
//                   setMsgs({
//                     text: "",
//                   })
//                 }
//               >
//                 {msgs.text}
//               </Alert>
//             )}
//             <Box sx={{ bgcolor: "#fff", borderRadius: "12px", p: 2 }}>
//               <Stack
//                 spacing={2}
//                 direction={{ xs: "column", md: "row" }}
//                 justifyContent={{ xs: "flex-start", md: "flex-end" }}
//                 pb={2}
//               >
//                 <Typography
//                   variant="h6"
//                   color="primary.main"
//                   p={1}
//                   sx={{ fontWeight: "bold", width: "100%" }}
//                 >
//                   Results Entry
//                 </Typography>
//                 <Stack direction="row">
//                   <Button onClick={handleClose}>Cancel</Button>
//                   <Button
//                     variant="contained"
//                     disabled={scoreList.length === 0}
//                     onClick={handleSaveResults}
//                     loading={isPending}
//                   >
//                     Save Results
//                   </Button>
//                 </Stack>
//               </Stack>
//               <Grid2 container spacing={2} sx={{ minHeight: "60svh" }}>
//                 <Grid2 size={{ xs: 12, md: 5 }}>
//                   <Stack spacing={2}>
//                     <Typography
//                       variant="h6"
//                       color="primary.main"
//                       bgcolor="lightgray"
//                       p={1}
//                       sx={{ fontWeight: "bold", width: "100%" }}
//                     >
//                       Add Subject Score
//                     </Typography>

//                     <Autocomplete
//                       // freeSolo
//                       options={subjects}
//                       loadingText="Loading Subjects.Please Wait..."
//                       getOptionLabel={(option) => option?.name || ""}
//                       value={values.subject}
//                       onChange={(e, value) => setFieldValue("subject", value)}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Subject"
//                           size="small"
//                           error={Boolean(errors.subject)}
//                           helperText={errors.subject}
//                         />
//                       )}
//                     />
//                     <TextField
//                       type="number"
//                       label="Class Score"
//                       size="small"
//                       value={values.classScore}
//                       onChange={handleChange("classScore")}
//                       error={Boolean(errors.classScore)}
//                       helperText={errors.classScore}
//                     />
//                     <TextField
//                       type="number"
//                       label="Exams Score"
//                       size="small"
//                       value={values.examsScore}
//                       onChange={handleChange("examsScore")}
//                       error={Boolean(errors.examsScore)}
//                       helperText={errors.examsScore}
//                     />
//                     <Button
//                       variant="contained"
//                       onClick={handleSubmit}
//                       disabled={!isValid || !dirty}
//                     >
//                       Add Score
//                     </Button>
//                   </Stack>
//                 </Grid2>
//                 <Grid2 size={{ xs: 12, md: 7 }}>
//                   <Typography
//                     variant="h6"
//                     color="primary.main"
//                     bgcolor="lightgray"
//                     p={1}
//                     // mb={2}
//                     sx={{ fontWeight: "bold", width: "100%" }}
//                   >
//                     Scores Preview
//                   </Typography>

//                   <Box
//                     sx={{
//                       maxWidth: { xs: 300, sm: "100%" },
//                       overflowX: "auto",
//                     }}
//                   >
//                     <ExamsScoreTable data={scoreList} setData={setScoreList} />
//                   </Box>
//                 </Grid2>
//               </Grid2>
//             </Box>
//           </>
//         );
//       }}
//     </Formik>
//   );
// };

// export default ExamsScoreInput;
