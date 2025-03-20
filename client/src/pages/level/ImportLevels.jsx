import React, { use, useState } from "react";
import _ from "lodash";
import {
  Modal,
  Box,
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
import { UserContext } from "@/context/providers/UserProvider";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { postLevels } from "@/api/levelAPI";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

const ImportLevels = ({ open, onClose }) => {
  const { session } = use(UserContext);
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { mutateAsync, isPending } = useMutation({ mutationFn: postLevels });

  const handleUpload = () => {
    Swal.fire({
      title: "Uploading Levels",
      text: "Proceed with levels import?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(
          {
            session: session?.sessionId,
            term: session?.termId,
            levels: uploadedFiles,
          },
          {
            onSettled: () => {
              queryClient.invalidateQueries(["levels"]);
            },
            onSuccess: (data) => {
              schoolSessionDispatch(alertSuccess(data));
              onClose();
            },
            onError: (error) => {
              schoolSessionDispatch(alertError(error));
            },
          }
        );
      }
    });
  };

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
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Delete a file from the list
  const handleDeleteFile = (index) => {
    const remainingLevels = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(remainingLevels);
  };

  // Clear all uploaded data
  const handleClearAll = () => {
    setUploadedFiles([]);
    setFilteredData([]);
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
    <Modal open={open} onClose={isPending ? () => {} : onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          width: { xs: 320, md: 700 },
        }}
      >
        <div>
          <Typography variant="h5">Levels Structure</Typography>
          <Typography variant="body2" fontStyle="italic" pb={2}>
            Define grade levels, classes, and departments to match your
            institution’s structure, ensuring smooth student progression and
            curriculum planning.
          </Typography>
          <Stack spacing={2} py={2} justifyContent="center">
            {uploadedFiles?.length > 0 && (
              <Button
                onClick={handleUpload}
                variant="contained"
                color="primary"
                sx={{ marginTop: 10, alignSelf: "end" }}
                loading={isPending}
              >
                Save Levels
              </Button>
            )}
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
            />

            <Stack direction="row" justifyContent="space-between">
              <Link
                sx={{ cursor: "pointer", alignSelf: "start" }}
                onClick={handleDownloadTemplate}
                variant="caption"
              >
                Download Level template here
              </Link>
            </Stack>
          </Stack>

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
              disabled={filteredData?.length === 0}
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
          {filteredData.length > 0 && (
            <>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 500, overflowY: "auto" }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Level</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell> Level Name</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.type}</TableCell>
                        <TableCell>
                          {item?.name}
                          {item?.type}
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
        {isPending && <LoadingSpinner value="Please Wait.." />}
      </Box>
    </Modal>
  );
};

export default ImportLevels;
