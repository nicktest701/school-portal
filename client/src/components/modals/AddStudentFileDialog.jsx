import React, { useContext, useState } from "react";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { postManyStudents } from "@/api/studentAPI";
import useLevel from "../hooks/useLevel";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { UserContext } from "@/context/providers/UserProvider";
import { IMPORT_STUDENT_COLUMNS } from "@/mockup/columns/studentColumns";
import CustomizedMaterialTable from "../tables/CustomizedMaterialTable";
import { EMPTY_IMAGES } from "@/config/images";
import CustomDialogTitle from "../dialog/CustomDialogTitle";
import CustomTitle from "../custom/CustomTitle";
import { ImportExport } from "@mui/icons-material";
import LoadingSpinner from "../spinners/LoadingSpinner";
function AddStudentFileDialog() {
  const { session } = useContext(UserContext);

  //Params
  const queryClient = useQueryClient();

  const [fieldError, setFieldError] = useState("");
  const [fieldValue, setFieldValue] = useState({ _id: "", type: "" });

  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const fileData = schoolSessionState.addStudentFileData;

  //Get All levels
  const { levelsOption } = useLevel();
  // console.log(levelsOption)

  //CLOSE File Dialog
  const handleCloseDialog = () => {
    Swal.fire({
      title: "Exiting",
      text: "Unsaved Changes will be lost. Are you sure?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        schoolSessionDispatch({ type: "closeAddStudentFileDialog" });
      }
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postManyStudents,
  });
  const handlePostStudents = () => {
    setFieldError("");

    if (fieldValue._id === "") {
      setFieldError("Please select a level!");

      return;
    }

    const studentInfo = {
      students: fileData?.data,
      session: {
        sessionId: session.sessionId,
        termId: session.termId,
        levelId: fieldValue._id,
      },
      type: fileData.type,
    };

    // return;

    Swal.fire({
      title: "Importing students",
      text: `Do you want to import students in ${fieldValue.type}?`,
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(studentInfo, {
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
            schoolSessionDispatch({ type: "closeAddStudentFileDialog" });
            queryClient.invalidateQueries(["all-students"]);
            setFieldValue({ _id: "", type: "" });
          },
          onError: (error) => {
            if (error?.isDuplicateError) {
              Swal.fire({
                title: "Duplicate Student ID",
                icon: "error",
                html: `<div> ${error?.message} ${JSON.stringify(
                  error?.data
                )} </div>`,
                showCancelButton: false,
                backdrop: false,
              });
            } else {
              schoolSessionDispatch(alertError(error));
            }
          },
        });
      }
    });
  };

  return (
    <Dialog open={fileData.open} fullScreen fullWidth>
      <CustomDialogTitle onClose={handleCloseDialog} />

      <DialogContent sx={{ px: 4 }}>
        <CustomTitle
          title="Import Students"
          subtitle="Enroll new students by adding their personal and academic details to the system for accurate record-keeping and future reference by importing Student data from excel or csv files."
          color="primary.main"
        />

        <Stack spacing={2} py={4} px={2} my={4} border="1px solid lightgray">
          <Typography>
            Select an <b>EXCEL</b> OR <b>CSV</b> file containing students
            information. Make sure the columns matches the accepted fields.
          </Typography>
        </Stack>

        {fileData.data?.length === 0 ? (
          <Typography>No data available</Typography>
        ) : (
          <CustomizedMaterialTable
            title={fieldValue?.type || "Students"}
            icon={EMPTY_IMAGES.student}
            columns={IMPORT_STUDENT_COLUMNS}
            data={fileData?.data}
            search={true}
            actions={[]}
            autoCompleteComponent={
              <Autocomplete
                size="small"
                options={levelsOption}
                noOptionsText="No Level available"
                getOptionLabel={(option) => option.type || ""}
                isOptionEqualToValue={(option, value) =>
                  value?._id === undefined ||
                  value?._id === "" ||
                  value?._id === option?._id
                }
                value={fieldValue}
                onChange={(e, value) => setFieldValue(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Level"
                    size="small"
                    error={Boolean(fieldError)}
                    helperText={fieldError}
                    required
                    FormHelperTextProps={{
                      sx: {
                        color: "error.main",
                      },
                    }}
                  />
                )}
                sx={{ width: 250, marginLeft: 3 }}
              />
            }
            showAddButton
            addButtonText="Import Students"
            addButtonIcon={<ImportExport />}
            onAddButtonClicked={handlePostStudents}
          />
        )}
      </DialogContent>
      {isPending && <LoadingSpinner />}
    </Dialog>
  );
}

export default AddStudentFileDialog;
