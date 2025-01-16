import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  Container,
  MenuItem,
  Link,
  Autocomplete,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { readXLSX } from "../../config/readXLSX";
import { readCSV } from "../../config/readCSV";
import { Add, AddAPhoto, UploadFileRounded } from "@mui/icons-material";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { EMPTY_IMAGES, IMAGES } from "../../config/images";
import { UserContext } from "../../context/providers/UserProvider";
import CustomTitle from "../../components/custom/CustomTitle";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";
import { Formik } from "formik";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import { downloadTemplate } from "../../api/userAPI";
import { switchColumns } from "../../config/columns";
import { putBulkData } from "../../api/sessionAPI";
import useLevel from "../../components/hooks/useLevel";
import GlobalSpinner from "../../components/spinners/GlobalSpinner";
import { LoadingButton } from "@mui/lab";

const Uploads = () => {
  const CSV_FILE_TYPE = "text/csv";
  const XLSX_FILE_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const XLS_FILE_TYPE = "application/vnd.ms-excel";
  const FILE_TYPES = `".csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`;

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userState: { session },
  } = useContext(UserContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [levelValue, setLevelValue] = useState({ _id: "", type: "" });
  const [dataCategory, setDataCategory] = useState("students");
  const [dataType, setDataType] = useState("personal-data");
  const [gradeName, setGradeName] = useState("");
  const [bulkData, setBulkData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [mainError, setMainError] = useState("");

  //Get All levels
  const { levelsOption } = useLevel();

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 20,
    accept:
      dataType === "personal-data"
        ? FILE_TYPES
        : {
            "image/*": [".jpeg", ".png", ".webp"],
          },
    maxSize: 200000,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setLoadingData(true);

      if (!_.isEmpty(acceptedFiles)) {
        if (dataType === "personal-data") {
          handleLoadFile(acceptedFiles[0]);
        }

        if (dataType === "photos") {
          handleLoadImages(acceptedFiles);
          // setBulkData(personalData);
          // console.log(personalData);
        }
      }

      setLoadingData(false);
    },
  });

  const fileType = acceptedFiles[0]?.type;
  //  type: 'text/csv'
  // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  // type: 'image/png'
  const initialValues = {
    dataCategory,
    dataType,
    levelValue,
    data: bulkData,
    gradeName,
  };

  //LOAD Results from file excel,csv
  function handleLoadFile(files) {
    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = async function (event) {
        let results = [];
        if ([XLSX_FILE_TYPE, XLS_FILE_TYPE].includes(files.type)) {
          results = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          results = readCSV(event.target.result);
        }

        setBulkData([]);
        if (dataCategory === "grades") {
          const modifiedResults = results?.map((result) => {
            return {
              id: uuid(),
              ...result,
            };
          });
          setBulkData(modifiedResults);
          return;
        }
        if (dataCategory === "subjects") {
          const modifiedResults = results?.map((result) => {
            return {
              ...result,
              isCore: ["Yes", "True", true].includes(result?.isCore)
                ? true
                : false,
            };
          });
          setBulkData(modifiedResults);
          return;
        }
        setBulkData(results);

        // if (results.length !== 0) {

        // }
      };
    } catch (error) {
      setMainError(error);
    } finally {
      setIsLoading(false);
    }
  }
  //LOAD Photos
  function handleLoadImages(imagefiles) {
    const files = Array.from(imagefiles);

    const imagePromises = files.map(async (file) => {
      const src = () =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            resolve(event.target.result);
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(file);
        });
      const imageSrc = await src();

      return {
        id: file.name?.split(".")[0],
        src: imageSrc,
      };
    });

    Promise.all(imagePromises)
      .then((imagesDataUrls) => {
        setBulkData([]);
        setBulkData(imagesDataUrls);
      })
      .catch((error) => {
        console.error("Error reading files: ", error);
      });
  }

  const { mutateAsync, isLoading: isDataImporting } = useMutation({
    mutationFn: putBulkData,
  });

  const onSubmit = () => {
    Swal.fire({
      title: "Importing results",
      text: `You are about to import ${dataCategory} ${dataType}.Proceed with import?`,
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setIsLoading(true);
        let payload;

        if (["students", "teachers"].includes(dataCategory)) {
          payload = {
            dataCategory,
            dataType,
            data: {
              session: {
                sessionId: session?.sessionId,
                termId: session?.termId,
                levelId: levelValue?._id,
              },
              students: bulkData,
              type: "file",
            },
          };
          console.log(payload);
        }

        if (dataCategory === "grades") {
          payload = {
            dataCategory,
            dataType,
            data: { name: gradeName, ratings: bulkData },
          };
        }
        if (dataCategory === "subjects") {
          payload = { dataCategory, dataType, data: bulkData };
        }

        mutateAsync(payload, {
          onSettled: () => {
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

  const handleDownloadTemplate = async () => {
    await downloadTemplate(dataCategory);
  };
  const columns = switchColumns(dataCategory);

  return (
    <Container>
      <CustomTitle
        title="Data Uploads (Bulk Data Management)"
        subtitle="Upload large sets of data, such as student information,teacher information,subjects, grades, and attendance records, to streamline data entry and management processes."
        color="primary.main"
      />

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        // validationSchema={eventValidationSchema}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <>
              <Stack
                spacing={2}
                py={4}
                px={2}
                my={4}
                border="1px solid lightgray"
              >
                <Typography>
                  Select an <b>EXCEL</b> OR <b>CSV</b> file containing student
                  the data. Make sure the <b>columns</b> matches the accepted
                  fields. You can download a <b>sample template</b> for your
                  data.
                </Typography>
                <>
                  <Stack py={2}>
                    <CustomFormControl>
                      <div style={{ width: "inherit" }}>
                        <TextField
                          label="Choose Data Category"
                          select
                          fullWidth
                          size="small"
                          value={dataCategory}
                          onChange={(e) => {
                            setDataCategory(e.target.value);
                            setBulkData([]);
                          }}
                          error={Boolean(
                            touched.dataCategory && errors.dataCategory
                          )}
                          helperText={
                            touched.dataCategory && errors.dataCategory
                          }
                        >
                          <MenuItem value="students">Students</MenuItem>
                          <MenuItem value="teachers">Teachers</MenuItem>
                          <MenuItem value="subjects">Subjects</MenuItem>
                          <MenuItem value="grades">Grades</MenuItem>
                        </TextField>
                      </div>
                      {dataCategory === "students" && (
                        <Autocomplete
                          size="small"
                          fullWidth
                          options={levelsOption}
                          noOptionsText="No Level available"
                          getOptionLabel={(option) => option.type || ""}
                          isOptionEqualToValue={(option, value) =>
                            value._id === undefined ||
                            value._id === "" ||
                            value._id === option._id
                          }
                          value={levelValue}
                          onChange={(e, value) => setLevelValue(value)}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label="Select Level"
                              size="small"
                              error={Boolean(
                                touched.levelValue?._id &&
                                  errors.levelValue?._id
                              )}
                              helperText={
                                touched.levelValue?._id &&
                                errors.levelValue?._id
                              }
                              required
                              FormHelperTextProps={{
                                sx: {
                                  color: "error.main",
                                },
                              }}
                            />
                          )}
                        />
                      )}

                      {["students", "teachers"].includes(dataCategory) && (
                        <TextField
                          label="Choose Data Type to Upload"
                          select
                          fullWidth
                          size="small"
                          value={dataType}
                          onChange={(e) => setDataType(e.target.value)}
                          error={Boolean(touched.dataType && errors.dataType)}
                          helperText={touched.dataType && errors.dataType}
                        >
                          <MenuItem value="personal-data">
                            Personal Data
                          </MenuItem>
                          <MenuItem value="photos">Photos</MenuItem>
                        </TextField>
                      )}
                      {dataCategory === "grades" && (
                        <TextField
                          label="Name of Grade System"
                          fullWidth
                          size="small"
                          value={gradeName}
                          onChange={(e) => setGradeName(e.target.value)}
                          error={Boolean(touched.gradeName && errors.gradeName)}
                          helperText={touched.gradeName && errors.gradeName}
                        />
                      )}
                    </CustomFormControl>
                    <Link
                      sx={{ cursor: "pointer", width: 180 }}
                      onClick={handleDownloadTemplate}
                      variant="caption"
                    >
                      Download {dataCategory} template here
                    </Link>
                  </Stack>

                  <Box pt={2}>
                    <Stack
                      border="1px dotted #333"
                      p={2}
                      {...getRootProps({ className: "dropzone" })}
                      justifyContent="center"
                      alignItems="center"
                      // sx={{
                      //   borderRadius: 1,
                      //   border:
                      //     touched.album && errors.album
                      //       ? "1px solid #B72136"
                      //       : "1px dotted lightgray",
                      //   py: 8,
                      //   px: 4,
                      // }}
                    >
                      {/* )} */}

                      <input {...getInputProps()} />
                      {fileType === CSV_FILE_TYPE ? (
                        <img
                          alt="csv file"
                          src={IMAGES.csv}
                          style={{ width: 48, height: 48 }}
                        />
                      ) : [XLSX_FILE_TYPE, XLS_FILE_TYPE].includes(fileType) ? (
                        <img
                          alt="excel file"
                          src={IMAGES.excel}
                          style={{ width: 48, height: 48 }}
                        />
                      ) : (
                        <Add
                          sx={{ width: 36, height: 36, alignSelf: "center" }}
                        />
                      )}

                      <Typography
                        variant="body2"
                        textAlign="center"
                        pt={4}
                        paragraph
                      >
                        Drag & drop your{" "}
                        {dataType === "personal-data" ? "data File" : "photos"}{" "}
                        here
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={open}
                        startIcon={
                          dataType === "personal-data" ? (
                            <UploadFileRounded />
                          ) : (
                            <AddAPhoto />
                          )
                        }
                      >
                        Upload{" "}
                        {dataType === "personal-data" ? "File" : "Photos"}
                      </Button>
                    </Stack>
                    {/* {touched.album && errors.album && (
                  <FormHelperText
                    sx={{
                      color: "#B72136",
                    }}
                  >
                    {errors.album}
                  </FormHelperText>
                )} */}
                  </Box>
                </>
              </Stack>
              {bulkData?.length > 0 && (
                <Stack direction="row" justifyContent="flex-end" width='50%'>
                  <Button>Cancel</Button>
                  <LoadingButton variant="contained" onClick={handleSubmit}>
                    Import Data
                  </LoadingButton>
                </Stack>
              )}
            </>
          );
        }}
      </Formik>

      <>
        {mainError && (
          <FormHelperText sx={{ color: "red" }}>{mainError}</FormHelperText>
        )}

        {dataType === "personal-data" ? (
          <CustomizedMaterialTable
            icon={EMPTY_IMAGES.score}
            search={true}
            // isLoading={isLoading}
            title={dataCategory}
            columns={columns}
            data={bulkData}
            actions={[]}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              // gridTemplateColumns: "repeat(auto-fit,minmax(80px,1fr))",
              gap: 2,
              py: 4,
              width: "100%",
            }}
          >
            {bulkData?.map((image) => {
              return (
                <Stack
                  key={image?.id}
                  border="1px solid #ccc"
                  alignItems="center"
                  p={1}
                  spacing={1}
                >
                  <img
                    src={image?.src}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                  <Typography>{image?.id}</Typography>
                </Stack>
              );
            })}
          </Box>
        )}
      </>

      {(isLoading || loadingData) && <LoadingSpinner />}
      {isDataImporting && <GlobalSpinner />}
    </Container>
  );
};

export default Uploads;
