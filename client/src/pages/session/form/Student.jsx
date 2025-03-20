import React, { useState, useRef } from "react";
import _ from "lodash";
import {
  Autocomplete,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Typography,
  Stack,
  Link,
  FormHelperText,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { downloadTemplate } from "@/api/userAPI";
import { getAllStudentID } from "@/api/studentAPI";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useQuery } from "@tanstack/react-query";

const Student = ({ watch, setValue, errors, handleNext }) => {
  const [duplicates, setDuplicates] = useSessionStorage("@duplicates", []);
  const students = watch("students");
  const levels = watch("levels");

  const [uploadedFiles, setUploadedFiles] = useState(_.compact(students));
  const [modalOpen, setModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [file, setFile] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [previewFileIndex, setPreviewFileIndex] = useState(null);
  const [level, setLevel] = useState({ name: "", type: "" });
  const [visibleRows, setVisibleRows] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  const previewTableRef = useRef(null);

  const { data: studentIds } = useQuery({
    queryKey: ["students-ids"],
    queryFn: getAllStudentID,
    initialData: [],
    // staleTime: 20 * 60 * 1000,
  });
  // console.log(studentIds)

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      parseFile(uploadedFile);
      setFile(uploadedFile);
    }
  };

  // Parse Excel/CSV file
  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      if (sheetData.length > 0) {
        setPreviewData(sheetData);
        setFilteredData(sheetData);
        setVisibleRows(20); // Reset rows on new file
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle preview modal
  const handleOpenModal = (index) => {
    setPreviewFileIndex(index);
    setPreviewData(uploadedFiles[index]?.data || []);
    setFilteredData(uploadedFiles[index]?.data || []);
    setVisibleRows(20); // Reset rows when opening modal
    setSearchQuery(""); // Clear search on new preview
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  // Add selected file to the list
  const handleAddToList = () => {
    // return;
    if (level && file && previewData.length > 0) {
      const newLevels = _.uniqBy(
        [
          ...uploadedFiles,
          { class: level, fileName: file.name, data: previewData },
        ],
        (obj) => `${obj?.class?.name}-${obj?.class?.type}`
      );

      setUploadedFiles(newLevels);
      setValue("students", newLevels);

      const dups = _.intersection(
        studentIds,
        _.map(_.flatMap(newLevels, "data"), (student) =>
          student?.indexnumber?.toString()
        )
      );
      if (!_.isEmpty(dups)) {
        setDuplicates((prev) => {
          return _.uniq([...prev, ...dups]);
        });
      }

      setLevel({ name: "", type: "" });
      setPreviewData([]);
    }
  };

  // Delete a file from the list
  const handleDeleteFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setValue(
      "students",
      uploadedFiles.filter((_, i) => i !== index)
    );
  };

  // Delete a row from the preview
  const handleDeleteRow = (rowIndex, idx) => {
    const updatedData = filteredData.filter((_, i) => i !== rowIndex);
    setFilteredData(updatedData);

    const dups = duplicates.filter((id, i) => id !== idx?.toString());
    setDuplicates(dups);

    if (previewFileIndex !== null) {
      let updatedFiles = [...uploadedFiles];
      updatedFiles[previewFileIndex].data = updatedData;
      setUploadedFiles(updatedFiles);
    
    }
  };

  // Clear all uploaded data
  const handleClearAll = () => {
    setUploadedFiles([]);
    setValue("students", []);
    setDuplicates([]);
  };

  // Load more rows when scrolling
  const handleScroll = () => {
    if (previewTableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = previewTableRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisibleRows((prev) => Math.min(prev + 20, filteredData.length));
      }
    }
  };

  // Handle Search Functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredData(previewData);
      setVisibleRows(20);
    } else {
      const filteredResults = previewData.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      );
      setFilteredData(filteredResults);
      setVisibleRows(20);
    }
  };

  const handleDownloadTemplate = async () => {
    await downloadTemplate("students");
  };

  return (
    <div>
      {/* <form> */}

      <Typography variant="h5">Enrollment & Student Management</Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        mb={2}
      >
        Simplify admissions, track student information, and manage class
        enrollments with an intuitive and centralized system.
      </Typography>

      <Stack spacing={2} py={2} justifyContent="center">
        <Autocomplete
          options={levels || []}
          value={level}
          onChange={(_, value) => setLevel(value)}
          getOptionLabel={(option) =>
            `${option?.name}${option?.type || ""}` || ""
          }
          isOptionEqualToValue={(option, value) =>
            option === value?.name ||
            value?.name === "" ||
            value?.name === null ||
            value?.name === undefined
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Level"
              // error={!!errors.students}
              // helperText={errors.students?.message}
            />
          )}
        />

        <Stack direction="row" justifyContent="flex-end">
          <Link
            sx={{ cursor: "pointer", alignSelf: "start" }}
            onClick={handleNext}
            variant="caption"
          >
            Skip for now
          </Link>
        </Stack>
     
        {level?.name && (
          <>
            <TextField
              type="file"
              accept=".csv,.xlsx"
              label="Select Student List"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              inputProps={{
                accept: ".xlsx,.xls,.csv",
              }}
              fullWidth
              onChange={handleFileChange}
            />

            <Link
              sx={{ cursor: "pointer", alignSelf: "start" }}
              onClick={handleDownloadTemplate}
              variant="caption"
            >
              Download Student template here
            </Link>

            {previewData.length > 0 && (
              <Button
                onClick={handleAddToList}
                variant="contained"
                color="primary"
                sx={{ alignSelf: "flex-start" }}
              >
                Add to List
              </Button>
            )}
          </>
        )}
      </Stack>
      {/* </form> */}
      {students.length > 0 && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <h3>Selected Files</h3>

            <Button
              onClick={handleClearAll}
              variant="contained"
              color="secondary"
              style={{ marginTop: 10 }}
            >
              Clear All
            </Button>
          </Stack>
          {(duplicates?.length > 0 || errors?.students) && (
            <FormHelperText sx={{ color: "error.main" }}>
              {errors?.students
                ? errors?.students?.message
                : " Some Index numbers in the selected students list already exist.Please remove all duplicates before submitting the data."}
            </FormHelperText>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item?.class?.name}
                      {item?.class?.type}
                    </TableCell>
                    <TableCell>{item?.fileName}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenModal(index)}>
                        <PreviewIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteFile(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Preview Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            mx: "auto",
            mt: 5,
            width: "90%",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">
            {uploadedFiles[previewFileIndex]?.class?.name}
            {uploadedFiles[previewFileIndex]?.class?.type} (Total Rows:{" "}
            {filteredData?.length})
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{ startAdornment: <SearchIcon /> }}
            sx={{ my: 2 }}
          />
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 500, overflowY: "auto" }}
            onScroll={handleScroll}
            ref={previewTableRef}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {filteredData.length > 0 &&
                    Object.keys(filteredData[0]).map((col, i) => (
                      <TableCell key={i} sx={{ textTransform: "uppercase" }}>
                        {col}
                      </TableCell>
                    ))}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice(0, visibleRows).map((row, i) => (
                  <TableRow key={i}>
                    {Object.values(row).map((val, j) => (
                      <TableCell
                        key={j}
                        sx={{
                          color: duplicates?.includes(
                            row["indexnumber"]?.toString()
                          )
                            ? "rgba(255,0,0,0.8)"
                            : "none",
                        }}
                      >
                        {val}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteRow(i, row["indexnumber"])}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default Student;
