import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { StudentContext } from "../../../context/providers/StudentProvider";
import { Avatar } from "@mui/material";
import { AddAPhoto, ArrowForwardRounded } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const PhotoUpload = ({ setMode }) => {
  const {
    studentState: {
      newStudent: { photo },
    },
    studentDispatch,
  } = useContext(StudentContext);
  const [profile, setProfile] = useState(photo?.profile);

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxSize: 200000,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (!_.isEmpty(acceptedFiles)) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const ImageURL = event.target.result;
          setProfile(ImageURL);
        };

        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
  });

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("@student"));
    if (student) {
      setProfile(student?.photo?.profile);

      return;
    }
  }, []);

  const onSubmit = () => {
    // console.log(profile);

    studentDispatch({
      type: "addNewStudent",
      payload: {
        photo: {
          profile,
          isCompleted: true,
        },
      },
    });

    // try {
    //   studentDispatch({ type: 'addNewStudent', payload: values });

    //   localStorage.setItem('@student', JSON.stringify(values));

    // } catch (error) {
    //   //   setMsg({
    //   //     severity: 'error',
    //   //     text: `Could not save student info.Try again!!!.
    //   //           In this problem persists,try contacting your administrator!!!`,
    //   //   });
    // }

    setMode("parent-info");
  };

  return (
    <Stack
      padding={2}
      spacing={1}
      {...getRootProps({ className: "dropzone" })}
      style={{ border: "1px dashed black" }}
    >
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          onClick={onSubmit}
          endIcon={<ArrowForwardRounded />}
        >
          Continue
        </Button>
      </Stack>
      <Typography
        variant="h5"
        color="primary.main"
        bgcolor="whitesmoke"
        p={1}
        sx={{ fontWeight: "bold" }}
      >
        Upload Photo
      </Typography>

      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        paddingY={1}
      >
        <Avatar
          variant="square"
          src={profile}
          sx={{ width: 120, height: 120 }}
        />

        <Stack>
          <input {...getInputProps()} />
          <Typography textAlign="center" paragraph>
            Drag & drop your photo here
          </Typography>
          <Button variant="outlined" onClick={open} startIcon={<AddAPhoto />}>
            Upload Image
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

PhotoUpload.propTypes = {};

export default PhotoUpload;
