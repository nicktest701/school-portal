import React from "react";
import _ from "lodash";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Link } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const PhotoUpload = ({
  setValue,
  handleNext,
  watch,
  errors,
  clearErrors,
  setError,
}) => {
  const photo = watch("photo.display");

  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg",".webp"],
    },
    maxSize: 5000000,
    multiple: false,
    onDropRejected: (files) => {
      setError("photo.profile", {
        message:
          files[0]?.errors[0]?.message ||
          "Error uploading photo.Make sure to select the correct file format and file size.",
      });
    },
    onError: (err) => {
      setError("photo.profile", {
        message: err?.message,
      });
    },
    onDrop: (acceptedFiles) => {
      clearErrors("photo.profile");
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
        {errors?.photo?.profile && (
          <Typography color="#f00" fontStyle="italic" variant="caption">
            {errors?.photo?.profile?.message}
          </Typography>
        )}
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
          <Typography textAlign="center" fontStyle="italic" variant="caption">
            Maximum file size is 5Mb
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PhotoUpload;
