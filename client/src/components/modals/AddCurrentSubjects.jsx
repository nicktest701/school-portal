import React, { useContext, useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import SaveAltRounded from "@mui/icons-material/SaveAltRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { addSubjectsToLevel } from "../../api/levelAPI";
import LevelSubjectItem from "../items/LevelSubjectItem";
import { getSubjects } from "../../api/subjectAPI";

import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import useLevelById from "../hooks/useLevelById";
import { Box, ListSubheader } from "@mui/material";
import Back from "../Back";
import CustomTitle from "../custom/CustomTitle";
import { useSearchParams } from "react-router-dom";

const AddCurrentSubjects = () => {
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [subject, setSubject] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const { subjects, levelLoading } = useLevelById(searchParams.get("_id"));

  const subjectOptions = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubjects(),
    select: (subjects) => {
      return _.map(subjects, "name");
    },
  });

  useEffect(() => {
    setSubjectList(subjects);
  }, [searchParams.get("_id"), subjects]);

  //Add Subjects to subject list
  const handleAddSubject = () => {
    const newSubjects = _.uniq([...subjectList, ...subject]);
    setSubjectList(newSubjects);

    setSubject([]);
  };

  //Remove subject from class
  const handleRemoveSubject = (searchSubject) => {
    setSubjectList((prev) => {
      const filteredSubjects = prev.filter(
        (subject) => subject !== searchSubject
      );

      return filteredSubjects;
    });
  };

  const { mutateAsync, isLoading } = useMutation(addSubjectsToLevel);

  //Save subjects to db
  const handleSaveSubjects = () => {
    const values = {
      levelId: searchParams.get("_id"),
      subjects: subjectList,
    };

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["subjects"]);
        queryClient.invalidateQueries(["level", searchParams.get("_id")]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <>
      <Back to="/level" color="primary.main" />
      <CustomTitle
        title={`Current Courses for ${searchParams.get("type")}`}
        subtitle="Add new subjects to the current level"
        color="primary.main"
      />

      <Box>
        <Stack
          spacing={2}
          py={6}
          width="100%"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography variant='h6'>Please select one or multiple courses</Typography>
          <Autocomplete
            multiple={true}
            freeSolo
            fullWidth
            options={subjectOptions.data ?? []}
            disableCloseOnSelect
            getOptionLabel={(option) => option || ""}
            value={subject}
            onChange={(e, value) => setSubject(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Course"
                size="small"
                // onChange={(e) => setSubject(e.target.value)}
                focused
              />
            )}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleAddSubject}
            sx={{
              px: 4,
              py: 2,
              alignSelf: "flex-end",
            }}
          >
            Add Course
          </Button>
        </Stack>

        <List
          sx={{
            height: 400,
            p: 2,
            mt: 4,
            overflow: "auto",
            bgcolor: "#fff",
          }}
          subheader={
            <ListSubheader
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 4,
              }}
            >
              <Typography variant="h4">
                {subjectList.length} Course(s) Available
              </Typography>
              <LoadingButton
                startIcon={<SaveAltRounded />}
                loading={isLoading}
                variant="contained"
                onClick={handleSaveSubjects}
                disabled={subjectList?.length === 0}
              >
                Save Courses
              </LoadingButton>
            </ListSubheader>
          }
        >
          {levelLoading && <Typography variant="h6">Loading.... </Typography>}

          {subjectList?.map((subject) => {
            return (
              <LevelSubjectItem
                key={subject}
                name={subject}
                removeSubject={handleRemoveSubject}
              />
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default AddCurrentSubjects;
