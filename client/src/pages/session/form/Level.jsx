import React, { useState } from "react";
import _ from "lodash";
import {
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
  Typography,
  Stack,
  Link,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { downloadTemplate } from "@/api/userAPI";

const Level = ({ watch, setValue, errors, handleNext }) => {
  const levelWatch = watch("levels");

  const [uploadedFiles, setUploadedFiles] = useState(_.compact(levelWatch));
  const [filteredData, setFilteredData] = useState(_.compact(levelWatch));
  const [searchQuery, setSearchQuery] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      parseFile(uploadedFile);
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
        const levels = _.uniqBy(
          sheetData,
          (obj) => `${obj?.name}-${obj?.type}`
        );
        setFilteredData(levels);
        setUploadedFiles(levels);
        setValue("levels", levels);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Delete a file from the list
  const handleDeleteFile = (index) => {
    const remainingLevels = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(remainingLevels);
    setValue("levels", remainingLevels);
  };

  // Clear all uploaded data
  const handleClearAll = () => {
    setUploadedFiles([]);
    setValue("levels", []);
  };

  // Handle Search Functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredData(uploadedFiles);
    } else {
      const filteredResults = uploadedFiles.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
      );
      setFilteredData(filteredResults);
    }
  };

  const handleDownloadTemplate = async () => {
    await downloadTemplate("levels");
  };

  return (
    <div>
      <Typography variant="h5">Levels Structure</Typography>
      <Typography variant="body2" fontStyle="italic" pb={2}>
        Define grade levels, classes, and departments to match your
        institution’s structure, ensuring smooth student progression and
        curriculum planning.
      </Typography>
      <Stack spacing={2} py={2} justifyContent="center">
        <TextField
          type="file"
          accept=".csv,.xlsx"
          label="Select File"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            input: {
              accept: ".xlsx,.xls,.csv",
            },
          }}
          inputProps={{
            accept: ".xlsx,.xls,.csv",
          }}
          fullWidth
          onChange={handleFileChange}
          error={!!errors.levels}
          helperText={errors.levels?.message}
        />

        {errors.levels && (
          <small style={{ color: "#B02136" }}>
            Columns in table must match the specified columns in the template
            below
          </small>
        )}

        <Stack direction="row" justifyContent="space-between">
          <Link
            sx={{ cursor: "pointer", alignSelf: "start" }}
            onClick={handleDownloadTemplate}
            variant="caption"
          >
            Download Level template here
          </Link>
          <Link
            sx={{ cursor: "pointer", alignSelf: "start" }}
            onClick={handleNext}
            variant="caption"
          >
            Skip for now
          </Link>
        </Stack>
      </Stack>

      {levelWatch.length > 0 && (
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
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Level</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Preferred Level Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.type}</TableCell>
                    <TableCell>
                      {item?.name} {item?.type}
                    </TableCell>
                    <TableCell>
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
    </div>
  );
};

export default Level;
