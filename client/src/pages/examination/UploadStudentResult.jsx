import {
  Box,
  FormHelperText,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import _ from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { EMPTY_IMAGES } from "@/config/images";
import { postBulkExams } from "@/api/ExaminationAPI";
import { generateCustomGrade } from "@/config/generateCustomGrade";
import { UserContext } from "@/context/providers/UserProvider";
import Back from "@/components/Back";
import CustomTitle from "@/components/custom/CustomTitle";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import useLevelById from "@/components/hooks/useLevelById";

const UploadStudentResult = () => {
  const uploadedData = sessionStorage.getItem("course-upload-data");
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userState: { session },
  } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { levelId } = useParams();
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const [data, setData] = useState(
    !_.isNull(uploadedData) ? JSON.parse(uploadedData) : []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [mainError, setMainError] = useState("");

  const { gradeSystem, subjects } = useLevelById(levelId);

  //LOAD Results from file excel,csv
  function handleLoadFile(e) {
    setIsLoading(true);
    if (searchParams.get("sub") === null) {
      setFieldError("Please select a Subject!");
      setIsLoading(false);
      return;
    }
    setMainError(false);

    try {
      const files = e.target.files?.[0];
      if (files) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const binaryStr = e.target?.result;
          if (binaryStr) {
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const results = XLSX.utils.sheet_to_json(sheet, { header: 0 });

            const selectedSubject = subjects?.find(
              (sub) => sub?.name === searchParams.get("sub")
            );

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
                  throw "It seems there is some inconsistencies in your results.Class score or Exams score cannot be more than 50 marks";
                }

                return {
                  indexnumber: _.toString(Object.values(item)[0]),
                  student: Object.values(item)[1],
                  _id: selectedSubject?._id,
                  subject: searchParams.get("sub") || selectedSubject?.name,
                  classScore,
                  examsScore,
                  ...generateCustomGrade(
                    Number(+classScore + +examsScore),
                    gradeSystem?.ratings
                  ),
                };
              });

              const values = await Promise.all(modifiedResults);
              setData(values);

              sessionStorage.setItem(
                "course-upload-data",
                JSON.stringify(values)
              );
            }
          }
        };
        reader.readAsBinaryString(files);
      }
    } catch (error) {
      setMainError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postBulkExams,
  });

  const handlePostResults = () => {
    setFieldError("");

    Swal.fire({
      title: "Importing results",
      text: `Do you want to import results in ${searchParams.get("sub")}?`,
      showCancelButton: true,
      backdrop: false,
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
            sessionStorage.removeItem("course-upload-data");
            navigate(state?.prevPath);
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //CLOSE File Dialog
  const handleCancelUploads = () => {
    Swal.fire({
      title: "Cancel Uploads",
      text: "Unsaved Changes will be lost. Are you sure?",
      showCancelButton: true,
      allowOutsideClick: false,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setData([]);
        sessionStorage.removeItem("course-upload-data");
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
      // hidden: searchParams.get("sub"),
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
          <TextField
            value={searchParams.get("sub")}
            contentEditable={false}
            error={fieldError !== ""}
            helperText={fieldError}
            required
            slotProps={{
              formHelperText: {
                sx: {
                  color: "error.main",
                },
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              width: 300,
              cursor: "pointer",
            }}
          >
            <label
              style={{ color: "#fff", display: "block" }}
              htmlFor="resultFile"
              title="Import results"
            >
              {isLoading ? "Please Wait..." : "Upload Results"}
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
            exportFileName={`${searchParams.get("sub")} - `}
            title={searchParams.get("sub")}
            columns={columns}
            data={data}
            actions={[]}
            autoCompleteComponent={
              <>
                {data?.length > 0 && (
                  <Stack direction="row" spacing={3} justifyContent="flex-end">
                    <Button onClick={handleCancelUploads}>Cancel</Button>
                    <Button variant="contained" onClick={handlePostResults}>
                      Save Results
                    </Button>
                  </Stack>
                )}
              </>
            }
          />
        </>
      </Box>
      {(isPending || isLoading) && <LoadingSpinner value="Please Wait..." />}
    </>
  );
};

export default UploadStudentResult;
