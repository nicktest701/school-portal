import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Container,
  Stack,
  Button,
  Autocomplete,
  Typography,
  TextField,
  Avatar,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
import { useNavigate, useParams } from "react-router-dom";
import { eventValidationSchema } from "../../config/validationSchema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEvent, putEvent } from "../../api/eventAPI";
import Back from "../../components/Back";

function EditEvent() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState(null);

  const event = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    initialData: queryClient
      .getQueryData(["events", id])
      ?.find((event) => event?._id === id),
    enabled: !!id,
    onSuccess: (event) => {
      setTitle(event?.title);
      setType(event?.type);
      setDescription(event?.description);
      setProfile(event?.album);
    },
  });

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

  const initialValues = {
    _id: id,
    type,
    title,
    description,
    album: profile,
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: putEvent,
  });

  const onSubmit = (values, options) => {

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["events"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        navigate("/events");
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Container>
         <Back to='/events' color="primary.main" />
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
                defaultValue={event?.data?.type}
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
                defaultValue={event?.data?.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
              <div
                style={{
                  marginBottom: "32px",
                }}
              >
                <FormLabel
                  style={{
                    color:
                      touched.description && errors.description
                        ? "#B72136"
                        : "var(--primary)",
                  }}
                >
                  Event Description
                </FormLabel>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(value) => setDescription(value)}
                  defaultValue={event?.data?.description}
                  placeholder="Description here"
                  style={{
                    borderRadius: 2,
                    // height: "250px",
                    border:
                      touched.description && errors.description
                        ? "1px solid #B72136"
                        : "none",
                  }}
                />
                {touched.description && errors.description && (
                  <FormHelperText
                    sx={{
                      color: "#B72136",
                    }}
                  >
                    {errors.description}
                  </FormHelperText>
                )}
              </div>

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
                      width: { xs: 120, md: 480 },
                      height: { xs: 120, md: 480 },

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
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Stack>
          );
        }}
      </Formik>
    </Container>
  );
}

export default EditEvent;
