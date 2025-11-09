import React, { useMemo } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import _ from "lodash";
import { useDropzone } from "react-dropzone";
import { Add, AddToDrive } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { TOWNS } from "@/mockup/data/towns";
import { Controller } from "react-hook-form";
import Input from "@/components/inputs/Input";
import useLevel from "@/components/hooks/useLevel";
import CustomAutoComplete from "@/components/inputs/CustomAutoComplete";

const AcademicInformation = ({ watch, control, setValue, errors }) => {
  const report = watch("academic.previousSchool.report");
  const levels = JSON.parse(sessionStorage.getItem("levels")) || [];
  const { departments, houses, levelLoading } = useLevel();

  const memoizedLevelsOption = useMemo(() => levels, [levels]);

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (!_.isEmpty(acceptedFiles)) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const reportURL = event.target.result;
          setValue("academic.previousSchool.report", reportURL);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
  });

  return (
    <Stack py={2} spacing={2}>
      <Typography
        variant="body2"
        color="primary.main"
        sx={{ fontWeight: "bold" }}
      >
        Department/Level/House
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Assign the student to a department, level, and house.
      </Typography>

      <CustomAutoComplete
        name="academic.department"
        control={control}
        label="Department"
        data={{
          data: departments,
          isPending: levelLoading,
        }}
      />

      <Controller
        name="academic.level"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={memoizedLevelsOption}
            getOptionLabel={(option) => option.type || ""}
            isOptionEqualToValue={(option, value) => value?._id === option?._id}
            // value={level}
            {...field}
            onChange={(_, value) =>
              setValue("academic.level", {
                _id: value?._id,
                type: value?.type,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Current Level"
                fullWidth
                size="small"
                error={!!errors.academic?.level}
                helperText={errors.academic?.level?._id?.message}
              />
            )}
          />
        )}
      />

      <CustomAutoComplete
        name="academic.house"
        control={control}
        label="House/Section"
        data={{
          data: houses,
          isPending: levelLoading,
        }}
      />

      <Typography
        variant="body2"
        color="primary.main"
        sx={{ fontWeight: "bold"}}
      >
        Previous School Records
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Provide details about the student's previous school.
      </Typography>

      <Input
        control={control}
        name="academic.previousSchool.name"
        label="School Name"
        size="small"
      />

      <Controller
        name="academic.previousSchool.location"
        control={control}
        render={({ field }) => (
          <Autocomplete
            freeSolo
            options={TOWNS}
            getOptionLabel={(option) => option || ""}
            {...field}
            onChange={(_, value) =>
              setValue("academic.previousSchool.location", value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                fullWidth
                size="small"
                error={!!errors.academic?.previousSchool?.location}
                helperText={errors.academic?.previousSchool?.location?.message}
              />
            )}
          />
        )}
      />

      <Typography
        variant="body2"
        color="primary.main"
        sx={{ fontWeight: "bold" }}
      >
        A copy of the most recent school report
      </Typography>
      <Stack
        padding={2}
        spacing={1}
        {...getRootProps({ className: "dropzone" })}
        style={{ border: "1px dashed black" }}
      >
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          paddingY={1}
        >
          <Avatar
            variant="square"
            src={report}
            sx={{ width: 120, height: 120 }}
          >
            <Add />
          </Avatar>
          <Stack>
            <input {...getInputProps()} />
            <Typography textAlign="center">
              Drag & drop your report here
            </Typography>
            <Button
              variant="outlined"
              onClick={open}
              startIcon={<AddToDrive />}
            >
              Upload Report
            </Button>
          </Stack>
          {!_.isEmpty(report) && (
            <iframe
              style={{ width: "100%", height: "5in" }}
              src={report}
            ></iframe>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default React.memo(AcademicInformation);
