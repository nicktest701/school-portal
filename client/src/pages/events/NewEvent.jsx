import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Stack,
  Autocomplete,
  Typography,
  TextField,
  Avatar,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { AddAPhoto } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import CustomTitle from "../../components/custom/CustomTitle";
import { EVENT_TYPE } from "../../mockup/data/data";
import { useNavigate } from "react-router-dom";
import { eventValidationSchema } from "../../config/validationSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEvent } from "../../api/eventAPI";
import Back from "../../components/Back";
import TextEditor from "../../components/custom/TextEditor";


function NewEvent() {
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState(null);
  
  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".webp"],
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
  useEffect(() => {}, [description]);

  const initialValues = {
    type,
    title,
    description,
    album: profile,
    caption
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postEvent,
  });

  const onSubmit = (values) => {
    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["events"]);
      },
      onSuccess: () => {
        schoolSessionDispatch(alertSuccess("Event Created"));
        navigate("/events");
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Container>
      <Back to="/events" color="primary.main" />
      <CustomTitle
        title="New Events"
        subtitle=" Send single and bulk SMS to students and parents"
        color="text.main"
        backColor="#012e54"
      />

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={eventValidationSchema}
      >
        {({ values, errors, touched, handleSubmit }) => {
          return (
            <Stack px={2} py={4} spacing={4} bgcolor="#fff">
              <Autocomplete
                freeSolo
                fullWidth
                size="small"
                options={EVENT_TYPE}
                loadingText="Please wait...."
                noOptionsText="No Event available"
                getOptionLabel={(option) => option || ""}
                value={values?.type}
                onChange={(e, value) => setType(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Event Type"
                    fullWidth
                    size="small"
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
                  />
                )}
              />

              <TextField
                label="Event Title"
                fullWidth
                size="small"
                row={3}
                maxRows={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                label="Event Caption"
                fullWidth
                size="small"
                row={3}
                maxRows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                error={Boolean(touched.caption && errors.caption)}
                helperText={touched.caption && errors.caption}
              />
              <TextEditor
                label="Description"
                value={description}
                setValue={setDescription}
                touched={touched?.description}
                errors={errors?.description}
              />
              <div>
                <FormLabel
                  style={{
                    color:
                      touched.album && errors.album
                        ? "#B72136"
                        : "var(--primary)",
                  }}
                >
                  Event Photo/Album
                </FormLabel>
                <Stack
                  {...getRootProps({ className: "dropzone" })}
                  sx={{
                    borderRadius: 1,
                    border:
                      touched.album && errors.album
                        ? "1px solid #B72136"
                        : "1px dotted lightgray",
                    py: 8,
                    px: 4,
                  }}
                >
                  <Avatar
                    variant="square"
                    src={profile}
                    // src={
                    //   _.isEmpty(profile) ? null : URL.createObjectURL(profile)
                    // }
                    sx={{
                      width: { xs: profile === null ? 120 : "100%" },
                      height: { xs: profile === null ? 120 : "100%" },

                      objectFit: "contain",
                      alignSelf: "center",
                    }}
                  />
                  {/* )} */}

                  <input {...getInputProps()} />
                  <Typography textAlign="center" paragraph>
                    Drag & drop your photo here
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={open}
                    startIcon={<AddAPhoto />}
                  >
                    Upload Image
                  </Button>
                </Stack>
                {touched.album && errors.album && (
                  <FormHelperText
                    sx={{
                      color: "#B72136",
                    }}
                  >
                    {errors.album}
                  </FormHelperText>
                )}
              </div>

              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button onClick={() => navigate("/events")}>Cancel</Button>
                <Button
                  loading={isPending}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Create Event
                </Button>
              </Stack>
            </Stack>
          );
        }}
      </Formik>
    </Container>
  );
}

export default NewEvent;
