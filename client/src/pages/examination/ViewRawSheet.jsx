import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CustomDialogTitle from "../../components/dialog/CustomDialogTitle";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSubjectsForLevel } from "../../api/levelAPI";
import MaterialTable from "material-table";
import * as XLSX from "xlsx";
import { tableIcons } from "../../config/tableIcons";

const ViewRawSheet = ({ open, setOpen, students }) => {
  const { levelId } = useParams();

  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");

  const subjects = useQuery(
    ["subjects", levelId],
    () => getSubjectsForLevel(levelId),
    {
      enabled: !!levelId,
    }
  );

  useEffect(() => {
    const modifiedStudents = students?.map(({ _id, indexnumber, fullName }) => {
      return {
        _id,
        indexnumber,
        fullName,
      };
    });

    setData(modifiedStudents);
  }, [students]);

  const downloadSheet = useCallback(() => {
    const columns = [
      "Index Number",
      "Student",
      "Class  Score",
      "Exams  Score",
      "Total  Score",
      "Grade",
    ];
    const modifiedSheet = data?.map((student) => student?.student);

    const worksheet = XLSX.utils.json_to_sheet(modifiedSheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, subject || "Subject");
    XLSX.utils.sheet_add_aoa(worksheet, [columns], {
      origin: "A1",
    });

    /* calculate column width */
    const max_width = modifiedSheet.reduce(
      (w, r) => Math.max(w, r.fullName.length),
      10
    );
    worksheet["!cols"] = [{ wch: max_width + 30 }];
    XLSX.writeFile(workbook, `${subject || "Subject"}.xlsx`, {
      compression: true,
    });
  }, [data]);

  const columns = [
    {
      title: "No",
      render: (rowData) => rowData.tableData.id + 1,
      width: 50,
    },

    {
      title: "Index Number",
      field: "indexnumber",
    },
    {
      title: "Student",
      field: "fullName",
      width: 300,
    },
    {
      title: "Class  Score",
      field: "classScore",
    },
    {
      title: "Exams  Score",
      field: "examsScore",
    },
    {
      title: "Total  Score",
      field: "totalScore",
    },
    {
      title: "Grade",
      field: "grade",
    },
  ];

  return (
    <Dialog open={open} maxWidth="lg" fullScreen>
      <CustomDialogTitle title="Score Sheet" onClose={() => setOpen(false)} />
      <DialogContent>
        <Autocomplete
          options={subjects?.data?.subjects}
          loading={subjects.isPending}
          getOptionLabel={(option) => option || ""}
          isOptionEqualToValue={(option, value) =>
            value === undefined || value === "" || value === option
          }
          value={subject}
          onChange={(e, value) => setSubject(value)}
          sx={{ minWidth: 300, py: 3 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Subject"
              size="small"
              sx={{
                maxWidth: 300,
              }}
              // error={fieldError !== ''}
              // helperText={fieldError}
              required
              FormHelperTextProps={{
                sx: {
                  color: "error.main",
                },
              }}
            />
          )}
        />
        <Button onClick={downloadSheet}>Download SBA</Button>

        <MaterialTable
          exportFileName={subject}
          icons={tableIcons}
          columns={columns}
          data={data ?? []}
          title={subject}
          options={{
            search: false,
            exportAllData: true,
            exportButton: true,
            pageSize: 10,
            paginationType: "stepped",
            pageSizeOptions: [10, 20, 40, 60, 100],
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewRawSheet;
