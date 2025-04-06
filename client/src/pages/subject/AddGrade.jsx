import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormLabel,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import { v4 as uuid } from "uuid";
import React, { useContext, useState } from "react";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { Formik } from "formik";
import { gradesValidationSchema } from "@/config/validationSchema";
import { GRADES, REMARKS } from "@/mockup/columns/sessionColumns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postGrades } from "@/api/gradeAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import _ from "lodash";
import { Download, NoteRounded } from "@mui/icons-material";
import { downloadTemplate } from "@/api/userAPI";
import GradeTable from "@/components/tables/GradeTable";
import { UserContext } from "@/context/providers/UserProvider";

function AddGrade({ open, setOpen }) {
  const { session } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [grades, setGrades] = useState([]);
  const [name, setName] = useState(uuid());
  const initialValues = {
    lowestMark: 0,
    highestMark: 0,
    grade: "",
    remarks: "",
  };

  const onSubmit = (values, option) => {
    values.id = uuid();

    setGrades((prev) => [...prev, values]);
    option.resetForm();
  };

  const handleRemoveGrade = (gradeId) => {
    const filteredGrades = grades.filter(({ id }) => id !== gradeId);
    setGrades(filteredGrades);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postGrades,
  });

  const saveGrades = () => {
    const values = {
      session: session?.sessionId,
      term: session?.termId,
      name: name || uuid(),
      ratings: grades,
    };

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["grades"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setGrades([]);
        setOpen(false);
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        if (binaryStr) {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const headers = jsonData[0].map((header) => _.camelCase(header));
          const rows = jsonData.slice(1);

          const formattedData = rows.map((row) => {
            const rowData = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index];
            });
            rowData.id = uuid();
            return rowData;
          });

          setGrades(formattedData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownloadTemplate = async () => {
    await downloadTemplate("grades");
  };

  return (
    <Dialog open={open} maxWidth="md">
      <CustomDialogTitle
        title="New Grading System"
        subtitle="Add new grades and remarks"
        onClose={() => setOpen(false)}
      />

      <DialogContent sx={{ px: 1.5 }}>
        <Stack spacing={3} py={2}>
          <TextField
            label="Name of Grading System"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={gradesValidationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleChange,
              handleSubmit,
            }) => {
              return (
                <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                  <TextField
                    label="Lowest Mark"
                    type="number"
                    inputMode="numeric"
                    size="small"
                    value={values.lowestMark}
                    onChange={handleChange("lowestMark")}
                    error={Boolean(touched.lowestMark && errors.lowestMark)}
                    helperText={errors.lowestMark}
                  />
                  <TextField
                    label="Highest Mark"
                    type="number"
                    inputMode="numeric"
                    size="small"
                    value={values.highestMark}
                    onChange={handleChange("highestMark")}
                    error={Boolean(touched.highestMark && errors.highestMark)}
                    helperText={errors.highestMark}
                  />

                  <Autocomplete
                    freeSolo
                    options={GRADES}
                    getOptionLabel={(option) => option || ""}
                    defaultValue={values.grade}
                    value={values.grade}
                    onChange={(e, value) => setFieldValue("grade", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Grade"
                        size="small"
                        error={Boolean(touched.grade && errors.grade)}
                        helperText={touched.grade && errors.grade}
                      />
                    )}
                  />
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={REMARKS}
                    getOptionLabel={(option) => option || ""}
                    defaultValue={values.remarks}
                    value={values.remarks}
                    onChange={(e, value) => setFieldValue("remarks", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="remarks"
                        size="small"
                        error={Boolean(touched.remarks && errors.remarks)}
                        helperText={touched.remarks && errors.remarks}
                      />
                    )}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Add
                  </Button>
                </Stack>
              );
            }}
          </Formik>
          <Button sx={{ alignSelf: "flex-end", bgcolor: "success.main" }}>
            <FormLabel
              htmlFor="studentFile"
              title="Import Grade from File"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                gap: 1,
                color: "primary.main",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              <NoteRounded htmlColor="#fff" />
              <Typography
                variant="caption"
                color="#fff"
                textTransform="lowercase"
              >
                Import Grade (.xlsx,.xls,.csv)
              </Typography>

              <Input
                type="file"
                id="studentFile"
                name="studentFile"
                hidden
                inputProps={{
                  accept: ".xlsx,.xls,.csv",
                }}
                onChange={handleFileUpload}
                onClick={(e) => {
                  e.target.value = null;
                  e.currentTarget.value = null;
                }}
              />
            </FormLabel>
          </Button>
          {/* <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
          /> */}
          <Button
            sx={{ alignSelf: "flex-end", textDecoration: "underline" }}
            variant="text"
            onClick={handleDownloadTemplate}
            endIcon={<Download />}
          >
            Download Template here
          </Button>
          <Divider>
            <Chip label="Grades" />
          </Divider>
        </Stack>

        <GradeTable data={grades} removeGrade={handleRemoveGrade} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          loading={isPending}
          variant="contained"
          disabled={grades.length === 0}
          onClick={saveGrades}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddGrade;
