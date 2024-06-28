import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import _ from "lodash";
import { StudentContext } from "../../../context/providers/StudentProvider";
import MedicalAllergyItem from "../../../components/items/MedicalAllergyItem";
import CustomDialogTitle from "../../../components/dialog/CustomDialogTitle";
import ReactToPrint from "react-to-print";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNewStudent } from "../../../api/studentAPI";
import { SchoolSessionContext } from "../../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../../context/actions/globalAlertActions";
import { SchoolRounded } from "@mui/icons-material";
import GlobalSpinner from "../../../components/spinners/GlobalSpinner";

function ConfirmStudent({ open, setOpen, setMode }) {
  const queryClient = useQueryClient();
  const school_info = JSON.parse(localStorage.getItem("@school_info"));
  const {
    studentState: {
      newStudent: { personal, photo, medical, parent, academic },
      studentDispatch,
    },
  } = useContext(StudentContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const componentRef = useRef();
  const [id, setId] = useState("");
  const [hideSaveBtn, setHideSaveBtn] = useState(false);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: postNewStudent,
  });
  const onSubmit = () => {
    personal.profile = photo?.profile;

    const studentData = {
      personal,
      medical,
      parent,
      academic,
    };

    mutateAsync(studentData, {
      onSettled: () => {
        queryClient.invalidateQueries(["students-by-current-level"]);
        queryClient.invalidateQueries(["all-students"]);
      },
      onSuccess: (data) => {
        if (data) {
          schoolSessionDispatch(alertSuccess("New Student Added"));
          setHideSaveBtn(true);
          setId(data);
          localStorage.removeItem("@student");
        }
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  //close dialog
  const handleClose = () => {
    if (id) {
      setMode("personal-info");
      setOpen(false);
      studentDispatch({
        type: "addNewStudent",
        payload: {},
      });
    } else {
      setOpen(false);
    }
  };

  const primaryStyle = { fontSize: 12, color: "primary", fontWeight: "700" };
  const secondaryStyle = { fontSize: 10 };
  const legendStyle = {
    width: "100%",
    borderBottom: "1px solid black",
    backgroundColor: "black",
    color: "#fff",
    padding: "2px",
  };

  return (
    <Dialog open={open} fullWidth maxWidth="lg" onClose={() => setOpen(false)}>
      {/* <CustomDialogTitle/> */}

      <CustomDialogTitle
        title="Admission Form"
        subtitle="Preview of student information. Please check before saving your information."
        onClose={handleClose}
      />
      <Box
        display="flex"
        gap={2}
        justifyContent="center"
        alignItems="center"
        pt={2}
      >
        {/* {hideSaveBtn ? ( */}
        <ReactToPrint
          // pageStyle={
          //   'width:8.5in";min-height:11in"; margin:auto",padding:4px;'
          // }
          trigger={() => <Button variant="outlined">Print Form</Button>}
          content={() => componentRef.current}
          documentTitle="Admission"
        />
        {/* // ) : ( */}
        <LoadingButton
          loading={isLoading}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Save Student Data
        </LoadingButton>
        {/* // )} */}
      </Box>

      <DialogContent>
        <div ref={componentRef}>
          {/* school details */}

          <Stack
            // direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              maxWidth: "8.5in",
              minHeight: "11in",
              margin: "auto",
              padding: "16px",
              border: "1px solid lightgray",
              position: "relative",
              backgroundSize: "contain",
              backgroundPosition: "center center !important",
            }}
          >
            <Typography variant="body1" sx={{ justifySelf: "start", py: 4 }}>
              Admission Form
            </Typography>
            {school_info?.badge ? (
              <Avatar
                alt="school logo"
                loading="lazy"
                srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                  school_info?.badge
                }`}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            ) : (
              <SchoolRounded sx={{ width: 100, height: 100 }} />
            )}
            <Stack justifyContent="center" alignItems="center" width="100%">
              <Typography variant="h4">
                {_.startCase(school_info?.name)}
              </Typography>
              <Typography variant="caption">{school_info?.address}</Typography>
              <Typography variant="caption">{school_info?.location}</Typography>
              <Typography variant="caption" fontStyle="italic">
                {school_info?.motto}
              </Typography>
            </Stack>
            <Typography variant="h3" textTransform="uppercase" my={2}>
              {`${personal?.surname} ${personal?.firstname} ${personal?.othername}`}
            </Typography>
          </Stack>
          <Stack
            className="admission-form"
            spacing={1}
            sx={{
              maxWidth: "8.5in",
              minHeight: "11in",
              margin: "auto",
              padding: "16px",
              border: "1px solid lightgray",
              position: "relative",
              backgroundSize: "contain",
              backgroundPosition: "center center !important",
            }}
            // style={style}
          >
            {id && (
              <small
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: 0,
                  paddingRight: "8px",
                  paddingBottom: "8px",
                }}
              >
                {id}
              </small>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Avatar
                variant="square"
                src={photo?.profile}
                sx={{ alignSelf: "center", width: 80, height: 80 }}
              />
            </div>

            {/* Personal Information  */}
            <div style={{ paddingBottom: "8px" }}>
              <legend style={legendStyle}>Personal Data</legend>
              <ListItemText
                secondary="Student ID"
                primary={personal?.indexnumber}
                primaryTypographyProps={primaryStyle}
                secondaryTypographyProps={secondaryStyle}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                }}
              >
                <ListItemText
                  secondary="Full Name"
                  primary={`${personal?.surname} ${personal?.firstname} ${personal?.othername}`}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
            
                <ListItemText
                  secondary="Date of Birth"
                  primary={moment(new Date(personal?.dateofbirth)).format("LL")}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Gender"
                  primary={personal?.gender}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Email Address"
                  primary={personal?.email}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Phone Number"
                  primary={personal?.phonenumber}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Residence"
                  primary={personal?.residence}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Nationality"
                  primary={personal?.nationality}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Address"
                  primary={personal?.address}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
              </div>
            </div>
            {/* Parent Information  */}
            <div style={{ paddingBottom: "8px" }}>
              <legend style={legendStyle}>Parent/Guardian Information</legend>

              <Stack>
                <Typography
                  color="primary.main"
                  sx={{ fontWeight: "bold", fontSize: 11 }}
                >
                  Parent 1 / Guardian 1
                </Typography>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                  }}
                >
                  <ListItemText
                    secondary="Surname"
                    primary={parent?.parent1?.surname}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="First Name"
                    primary={parent?.parent1?.firstname}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Relationship"
                    primary={parent?.parent1?.relationship}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />

                  <ListItemText
                    secondary="Gender"
                    primary={parent?.parent1?.gender}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Email Address"
                    primary={parent?.parent1?.email}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Phone Number"
                    primary={parent?.parent1?.phonenumber}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />

                  <ListItemText
                    secondary="Residence"
                    primary={parent?.parent1?.residence}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Nationality"
                    primary={parent?.parent1?.nationality}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Address"
                    primary={parent?.parent1?.address}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                </div>
              </Stack>
              <Stack>
                <Typography
                  color="primary.main"
                  sx={{ fontWeight: "bold", fontSize: 11 }}
                >
                  Parent 2 / Guardian 2
                </Typography>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                  }}
                >
                  <ListItemText
                    secondary="Surname"
                    primary={parent?.parent2?.surname}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="First Name"
                    primary={parent?.parent2?.firstname}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Relationship"
                    primary={parent?.parent2?.relationship}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />

                  <ListItemText
                    secondary="Gender"
                    primary={parent?.parent2?.gender}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Email Address"
                    primary={parent?.parent2?.email}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Phone Number"
                    primary={parent?.parent2?.phonenumber}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />

                  <ListItemText
                    secondary="Residence"
                    primary={parent?.parent2?.residence}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Nationality"
                    primary={parent?.parent2?.nationality}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                  <ListItemText
                    secondary="Address"
                    primary={parent?.parent2?.address}
                    primaryTypographyProps={primaryStyle}
                    secondaryTypographyProps={secondaryStyle}
                  />
                </div>
              </Stack>
            </div>

            {/* Medical Information  */}
            <div style={{ paddingBottom: "8px" }}>
              <legend style={legendStyle}>Medical Records</legend>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                }}
              >
                <MedicalAllergyItem
                  title="1. Heart Disease"
                  value={medical.heartDisease}
                />
                <MedicalAllergyItem title="2. Asthma" value={medical.asthma} />
                <MedicalAllergyItem
                  title="3. Siezures"
                  value={medical.siezures}
                />
                <MedicalAllergyItem
                  title="4. Visual Impairment"
                  value={medical.visualImpairment}
                />

                <MedicalAllergyItem
                  title="5. Hearing Impairment"
                  value={medical.hearingImpairment}
                />

                <MedicalAllergyItem
                  title="6. Physical Disability"
                  value={medical.physicalDisability}
                />
              </div>
              <Typography
                color="primary.main"
                sx={{ fontWeight: "bold", fontSize: 11 }}
              >
                Emergency Contact
              </Typography>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                }}
              >
                <ListItemText
                  secondary="Fullname"
                  primary={medical?.emergencyContact?.fullname}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Phone Number"
                  primary={medical?.emergencyContact?.phonenumber}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Address"
                  primary={medical?.emergencyContact?.address}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
              </div>
            </div>
            {/* Academic Information  */}
            <div style={{ paddingBottom: "8px" }}>
              <legend style={legendStyle}>Academic Records</legend>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                }}
              >
                <ListItemText
                  secondary="Current Level"
                  primary={academic?.level?.type}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />

                <ListItemText
                  secondary="Previous School Name"
                  primary={academic?.previousSchool?.name}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
                <ListItemText
                  secondary="Location"
                  primary={academic?.previousSchool?.location}
                  primaryTypographyProps={primaryStyle}
                  secondaryTypographyProps={secondaryStyle}
                />
              </div>
            </div>
          </Stack>
        </div>
      </DialogContent>
      {isLoading && <GlobalSpinner />}
    </Dialog>
  );
}

export default ConfirmStudent;
