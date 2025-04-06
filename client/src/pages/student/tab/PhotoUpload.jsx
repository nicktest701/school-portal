import React from "react";
import _ from "lodash";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Link } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const PhotoUpload = ({ setValue, errors, handleNext, watch }) => {
  const photo = watch("photo.display");

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
        setValue("photo.profile", acceptedFiles);

        const reader = new FileReader();
        reader.onload = function (event) {
          const ImageURL = event.target.result;
          setValue("photo.display", ImageURL);
        };

        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
  });

  return (
    <Stack
      padding={2}
      spacing={1}
      {...getRootProps({ className: "dropzone" })}
      style={{ border: "1px dashed black" }}
    >
      <Stack direction="row" justifyContent="flex-end">
        <Link
          sx={{ cursor: "pointer", alignSelf: "start" }}
          onClick={handleNext}
          variant="caption"
        >
          Skip for now
        </Link>
      </Stack>

      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        paddingY={1}
      >
        <Avatar
          variant="square"
          src={photo ? photo : null}
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

export default PhotoUpload;
