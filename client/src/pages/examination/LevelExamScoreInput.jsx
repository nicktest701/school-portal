import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSubjectsForLevel } from "../../api/levelAPI";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { readXLSX } from "../../config/readXLSX";
import { readCSV } from "../../config/readCSV";
import { NoteRounded } from "@mui/icons-material";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { EMPTY_IMAGES } from "../../config/images";
import { postBulkExams } from "../../api/ExaminationAPI";
import { generateCustomGrade } from "../../config/generateCustomGrade";
import { UserContext } from "../../context/providers/UserProvider";
import Back from "../../components/Back";
import CustomTitle from "../../components/custom/CustomTitle";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";

const LevelExamScoreInput = () => {
  const CSV_FILE_TYPE = "text/csv";
  const XLSX_FILE_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const XLS_FILE_TYPE = "application/vnd.ms-excel";

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userState: { session },
  } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { levelId } = useParams();
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [mainError, setMainError] = useState("");
  const [subject, setSubject] = useState(searchParams.get("sub"));

  const levelOptions = useQuery({
    queryKey: ["subjects", levelId],
    queryFn: () => getSubjectsForLevel(levelId),
    enabled: !!levelId,
    select: ({ subjects, grades }) => {
      return {
        subjects,
        grades,
      };
    },
  });

  useEffect(() => {
    if (data?.length > 0) {
      const modifiedData = data?.map((item) => {
        return {
          ...item,
          subject,
        };
      });
      setData(modifiedData);
    }
  }, [subject]);

  //LOAD Results from file excel,csv
  function handleLoadFile(e) {
    if (subject === "") {
      setFieldError("Please select a Subject!");
      setIsLoading(false);
      return;
    }
    setMainError(false);
    setIsLoading(true);
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = async function (event) {
        let results = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          results = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          results = readCSV(event.target.result);
        }

        // console.log(results)
        if (results.length !== 0) {
          const modifiedResults = results.map((item) => {
            const classScore = Number(Object.values(item)[2] || 0);
            const examsScore = Number(Object.values(item)[3] || 0);

            if (classScore > 50 || examsScore > 50) {
              setMainError(
                "It seems there is some inconsistencies in your results.Class score or Exams score cannot be more than 50 marks!"
              );
              setIsLoading(false);
              setData([]);
              throw "It seems there is some inconsistencies in your results.Class score or Exams score cannot be more than 50";
            }

            return {
              indexnumber: _.toString(Object.values(item)[0]),
              student: Object.values(item)[1],
              subject,
              classScore,
              examsScore,
              ...generateCustomGrade(
                Number(+classScore + +examsScore),
                levelOptions?.data?.grades
              ),
              // session: session?.sessionId,
              // term: session?.termId,
              // level: levelId,
            };
          });

          const values = await Promise.all(modifiedResults);
          setData(values);
        }
      };
    } catch (error) {
      setMainError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // //CLOSE File Dialog
  // const discardChanges = () => {
  //   Swal.fire({
  //     title: "Discarding",
  //     text: "Discard Changes?",
  //     showCancelButton: true,
  //     backdrop: false,
  //     // background:'#ccc'
  //   }).then(({ isConfirmed }) => {
  //     if (isConfirmed) {
  //       setData([]);
  //     }
  //   });
  // };

  const { mutateAsync } = useMutation({
    mutationFn: postBulkExams,
  });

  const handlePostResults = () => {
    setFieldError("");

    Swal.fire({
      title: "Importing results",
      text: `Do you want to import results in ${subject}?`,
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setIsLoading(true);
        const students = {
          session: session?.sessionId,
          term: session?.termId,
          level: levelId,
          results: data,
        };

        mutateAsync(students, {
          onSettled: () => {
            queryClient.invalidateQueries(["all-results"]);
            queryClient.invalidateQueries([
              "subject-score",
              levelId,
              searchParams.get("sub"),
            ]);
            setIsLoading(false);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
            navigate(state?.prevPath);
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };
  const columns = [
    {
      title: "Index Number",
      field: "indexnumber",
    },
    {
      title: "Student",
      field: "student",
    },
    {
      title: "Subject",
      field: "subject",
      hidden: subject || searchParams.get("sub"),
    },
    {
      title: "Class Score(50%)",
      field: "classScore",
    },
    {
      title: "Exams Score(50%)",
      field: "examsScore",
    },
    {
      title: "Total Score(100%)",
      field: "totalScore",
    },
    {
      title: "Grade",
      field: "grade",
    },
    {
      title: "Remarks",
      field: "remarks",
    },
  ];

  return (
    <>
      <Back to={state?.prevPath} color="primary.main" />
      <CustomTitle
        title="Exams Scores"
        subtitle="Import Student exams results from excel or csv files."
        color="primary.main"
      />

      <Stack spacing={2} py={4} px={2} my={4} border="1px solid lightgray">
        <Typography>
          Select an <b>EXCEL</b> OR <b>CSV</b> file containing student results
          information. Make sure the columns matches the accepted fields.
        </Typography>
        <Stack direction="row" spacing={3} pt={2}>
          <Autocomplete
            options={
              searchParams.get("sub") !== null
                ? [searchParams.get("sub")]
                : levelOptions?.data?.subjects
            }
            loading={levelOptions?.isLoading}
            getOptionLabel={(option) => option || ""}
            isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || value === option
            }
            defaultValue={searchParams.get("sub")}
            value={subject}
            onChange={(e, value) => setSubject(value)}
            sx={{ minWidth: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Subject"
                size="small"
                error={fieldError !== ""}
                helperText={fieldError}
                required
                FormHelperTextProps={{
                  sx: {
                    color: "error.main",
                  },
                }}
              />
            )}
          />

          <Button
            variant="contained"
            sx={{
              width: 300,
              cursor: "pointer",
            }}
            startIcon={<NoteRounded />}
          >
            <label
              style={{ color: "#fff" }}
              htmlFor="resultFile"
              title="Import results"
            >
              {isLoading ? "Please Wait..." : "Upload File"}
            </label>

            <Input
              type="file"
              id="resultFile"
              name="resultFile"
              hidden
              inputProps={{
                accept: ".xlsx,.xls,.csv",
              }}
              onChange={(event) => handleLoadFile(event)}
              onClick={(e) => {
                e.target.value = null;
                e.currentTarget.value = null;
              }}
            />
          </Button>
        </Stack>
      </Stack>

      <Box>
        <>
          {mainError && (
            <FormHelperText sx={{ color: "red" }}>{mainError}</FormHelperText>
          )}

          <CustomizedMaterialTable
            icon={EMPTY_IMAGES.score}
            search={true}
            exportFileName={`${subject} - `}
            isLoading={isLoading}
            title={subject}
            columns={columns}
            data={data}
            actions={[]}
            autoCompleteComponent={
              <>
                {data?.length > 0 && (
                  <Stack direction="row" spacing={3} justifyContent="flex-end">
                    <Button>Cancel</Button>
                    <LoadingButton
                      variant="contained"
                      onClick={handlePostResults}
                    >
                      Save Results
                    </LoadingButton>
                  </Stack>
                )}
              </>
            }
          />
        </>
      </Box>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default LevelExamScoreInput;
