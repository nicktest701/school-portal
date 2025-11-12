import React from "react";
import {
  CircleRounded,
  Delete,
  MenuRounded,
  Edit,
  ArrowForwardRounded,
  Visibility,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Link } from "react-router-dom";

export const SCHOOL_SESSION_COLUMN = (handleActive, handleView, handleEdit) => {
  return [
    {
      field: "termId",
      title: "ID",
      hidden: true,
    },
    {
      field: "core.academicYear",
      title: "Academic Year",
      searchable: true,
      customFilterAndSearch: (data, rowData) => {
        const name = rowData?.core?.name;
        const academicYear = rowData?.core?.academicYear;
        return (
          name.toLowerCase().lastIndexOf(data?.toLowerCase()) > -1 ||
          academicYear?.toLowerCase().lastIndexOf(data?.toLowerCase()) > -1
        );
      },
      render: (data) => {
        return (
          <ListItemText
            primary={data?.core?.name}
            secondary={data?.core.academicYear}
            slotProps={{
              primary: {
                fontWeight: "bolder",
                fontSize: { xs: 18, md: 20 },
              },
            }}
          />
        );
      },
    },
    {
      title: "Start",
      field: "core.from",
      // hidden: true,
      render: (data) => new Date(data?.core?.from).toDateString(),
    },
    {
      title: "End",
      field: "core.to",
      // hidden: true,
      render: (data) => new Date(data?.core?.to).toDateString(),
    },
    {
      field: "core.term",
      title: "Term / Semester",
    },
    {
      field: "core.vacationDate",
      hidden: true,
    },
    {
      field: "core.reOpeningDate",
      hidden: true,
    },
    {
      field: "sessionId",
      hidden: true,
    },
    {
      field: "active",
      title: "Status",
      export: false,
      render: ({ termId, active }) => (
        <Button
          onClick={() => handleActive({ _id: termId, active })}
          startIcon={
            <CircleRounded
              sx={{
                color: active ? "green" : "red",
                width: 10,
                height: 10,
              }}
            />
          }
        >
          {active ? "Active" : "Disabled"}
        </Button>
      ),
    },
    // {
    //   field: "",
    //   title: "Session ",
    //   export: false,
    //   render: (rowData) =>
    //     rowData.termId === session?.termId ? (
    //       <Button sx={{ color: "info.darker", bgcolor: "info.lighter" }}>
    //         Current Session
    //       </Button>
    //     ) : null,
    // },
    {
      title: "",
      field: null,
      render: (rowData) => {
        return (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => handleView(rowData)} title="View">
              <Visibility className="ico " titleAccess="View" />
            </IconButton>
            <IconButton
              onClick={() => handleEdit(rowData?.termId)}
              title="Edit"
            >
              <Edit className="ico " titleAccess="Edit" />
            </IconButton>
            {/* <IconButton
              title="Delete"
              onClick={() => handleDelete(rowData?.termId)}
            >
              <Delete className="ico " titleAccess="Delete" />
            </IconButton> */}
          </Stack>
        );
      },
    },
  ];
};

export const SCHOOL_TERMS = [
  "Term 1",
  "Term 2",
  "Term 3",
  "Semester 1",
  "Semester 2",
  "Semester 3",
];

export const SCHOOL_LEVELS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "level",
    title: "Level",
    hidden: true,
  },
  {
    field: "type",
    title: "Level",
  },
  {
    field: "noOfStudents",
    title: "No. Of Students",
    type: "numeric",
    align: "center",
  },
  // {
  //   title: "Subjects",
  //   field: "subjects",
  //   // hidden: true,
  // },
  {
    title: "Facilitator",
    field: "teacher",
    render: ({ teacher }) => {
      return teacher?._id ? (
        <Link
          style={{
            color: "var(--primary)",
          }}
          to={`/teacher/${teacher?._id}`}
        >
          {teacher?.fullName || "N/A"}
        </Link>
      ) : (
        ""
      );
    },
  },
];

export const SCHOOL_LEVEL = [
  {
    name: "_id",
    label: "ID",
    options: {
      display: false,
    },
  },
  {
    name: "type",
    label: "Level",
  },
  {
    name: "subjects",
    options: {
      display: false,
    },
  },
];

export const SCHOOl_SUBJECTS = [
  {
    name: "_id",
    label: "ID",
    options: {
      display: false,
    },
  },
  {
    name: "title",
    label: "Subject",
  },
];
export const IMPORT_SUBJECT_COLUMNS = [
  {
    title: "SUBJECT CODE",
    field: "code",
  },
  {
    title: "SUBJECT NAME",
    field: "name",
  },
  {
    title: "CORE SUBJECT",
    field: "isCore",
  },
];

export const LEVEL_OPTIONS = [
  "Day Care",
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Kindergarten 1",
  "Kindergarten 2",
  "Basic 1",
  "Basic 2",
  "Basic 3",
  "Basic 4",
  "Basic 5",
  "Basic 6",
  "Basic 7",
  "Basic 8",
  "Basic 9",
  "Basic 10",
  "Basic 11",
  "Basic 12",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Stage 1",
  "Stage 2",
  "Stage 3",
  "Stage 4",
  "Stage 5",
  "Stage 6",
  "Stage 7",
  "Stage 8",
  "Stage 9",
  "Stage 10",
  "Stage 11",
  "Stage 12",
  "Junior High School 1",
  "Junior High School 2",
  "Junior High School 3",
  "Senior High School 1",
  "Senior High School 2",
  "Senior High School 3",
];
export const LEVEL_TYPE_OPTIONS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

export const SUBJECT_OPTIONS = [
  "English Language",
  "Reading",
  "Writing",
  "Music and Dance",
  "Orals and Rhymes",
  "Mathematics",
  "Integrated Science",
  "Natural Science",
  "Social Studies",
  "History",
  "Religious and Moral Education",
  "Creative Arts and Design",
  "Career Technology",
  "Our World,Our People",
  "Information and Communication Technology",
  "Computing",
  "Ghanaian Language",
  "French",
  "Arabic",
  "Physical Education",
  "Physical and Health Education",
];

export const SUBJECTS = [
  {
    code: "",
    name: "ENGLISH LANGUAGE",
    isCore: true,
  },
  {
    code: "",
    name: "MATHEMATICS",
    isCore: true,
  },
  {
    code: "",
    name: "INTEGRATED SCIENCE",
    isCore: true,
  },
  {
    code: "",
    name: "NATURAL SCIENCE",
    isCore: true,
  },
  {
    code: "",
    name: "HISTORY",
    isCore: true,
  },
  {
    code: "",
    name: "SOCIAL STUDIES",
    isCore: true,
  },
  {
    code: "",
    name: "OUR WORLD OUR PEOPLE",
    isCore: false,
  },
  {
    code: "",
    name: "RELIGIOUS AND MORAL EDUCATION",
    isCore: false,
  },
  {
    code: "",
    name: "INFORMATION AND COMMUNICATION TECHNOLOGY",
    isCore: false,
  },
  {
    code: "",
    name: "COMPUTING",
    isCore: false,
  },
  {
    code: "",
    name: "CREATIVE ARTS AND DESIGN",
    isCore: false,
  },
  {
    code: "",
    name: "CAREER TECHNOLOGY",
    isCore: false,
  },
  {
    code: "",
    name: "GHANAIAN LANGUAGE",
    isCore: false,
  },
  {
    code: "",
    name: "FRENCH",
    isCore: false,
  },
  {
    code: "",
    name: "ARABIC",
    isCore: false,
  },
  {
    code: "",
    name: "PHYSICAL AND HEALTH EDUCATION",
    isCore: false,
  },
  {
    code: "",
    name: "PHYSICAL EDUCATION",
    isCore: false,
  },
  {
    code: "",
    name: "READING",
    isCore: false,
  },
  {
    code: "",
    name: "WRITING",
    isCore: false,
  },
  {
    code: "",
    name: "MUSIC AND DANCE",
    isCore: false,
  },
  {
    code: "",
    name: "ORALS AND RHYMES",
    isCore: false,
  },
];

export const GRADES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A1",
  "B2",
  "B3",
  "C4",
  "C5",
  "C6",
  "D7",
  "E8",
  "F9",
  "A+",
  "A",
  "B+",
  "B",
  "C+",
  "C",
  "D+",
  "E",
  "F",
];

export const IMPORT_GRADE_COLUMNS = [
  {
    field: "highestMark",
    title: "HIGHEST MARK",
  },
  {
    field: "lowestMark",
    title: "LOWEST MARK",
  },
  {
    field: "grade",
    title: "GRADE VALUE",
  },
  {
    field: "remarks",
    title: "REMARKS",
  },
];

export const REMARKS = [
  "Excellent",
  "Distinct",
  "Outstanding",
  "Highest",
  "Very Good",
  "Higher",
  "Good",
  "High",
  "High Average",
  "Average",
  "Below Average",
  "Low Average",
  "Credit",
  "Low",
  "Pass",
  "Lower",
  "Weak Pass",
  "Weak",
  "Lowest",
  "Fail",
];

export const FEES_OPTIONS = [
  "Tuition Fees",
  "Cadet Fees",
  "P.T.A Dues",
  "Accomodation Fee",
  "Boarding Fee",
];

export const RELATIONSHIP = (data) => {
  const gender = _.lowerCase(data);
  return gender === "male"
    ? ["Father", "Brother", "Uncle", "Grand Father", "Cousin"]
    : gender === "female"
    ? ["Mother", "Sister", "Aunty", "Grand Mother", "Cousin"]
    : [];
};

export const FEES_COLUMNS = [
  {
    name: "_id",
    label: "ID",
    options: {
      display: false,
    },
  },
  {
    name: "level",
    label: "Level",
  },
  {
    name: "fees",
    label: "Fees",
  },
  {
    name: "amount",
    options: {
      display: false,
    },
  },
];

export const SCHOOL_FEES_COLUMNS = (handleView, handleEdit, handleDelete) => [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "level",
    title: "Level",
  },
  {
    field: "levelId",
    title: "Level id",
    hidden: true,
  },
  {
    field: "fees",
    title: "Fees",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    field: "amount",
    hidden: true,
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    title: "No. Of Students",
    field: "noOfStudents",
  },
  {
    title: "Total Fees",
    field: "totalFees",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    title: "Action",
    field: null,
    render: (rowData) => {
      return (
        <Stack direction="row" spacing={3}>
          <MenuRounded
            className="ico"
            onClick={() => handleView(rowData)}
            title="View Fee Information"
            titleAccess="View Fee Information"
          />
          <Edit
            className="ico"
            onClick={() => handleEdit(rowData)}
            title="Edit"
            titleAccess="Edit Fee "
          />
          <Delete
            className="ico"
            onClick={() => handleDelete(rowData?._id)}
            title="Delete"
            titleAccess="Delete"
          />
        </Stack>
      );
    },
  },
];

export const STUDENT_FEES_HISTORY_COLUMNS = [
  {
    field: "date",
    title: "Date of Payment",
    render: ({ date }) => (
      <ListItemText
        primary={new Date(date).toDateString()}
        secondary={new Date(date).toLocaleTimeString()}
        primaryTypographyProps={{
          fontSize: 12,
        }}
      />
    ),
  },
  {
    field: "paid",
    title: "Amount Paid",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    render: ({ paid, balance }) => Number(paid + balance),
  },
  {
    field: "outstanding",
    title: "Remaining Fees",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    field: "balance",
    title: "Change",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    field: "issuer",
    title: "Issuer",
    cellStyle: {
      textTransform: "capitalize",
    },
  },
];
export const STUDENT_FEES_HISTORY = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "academicYear",
    title: "Academic Year",
  },
  {
    field: "term",
    title: "Term/Semester",
  },
  {
    field: "level",
    title: "Level",
  },
  {
    field: "fees",
    title: "Fees",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    field: "paid",
    title: "Amount Paid",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  {
    field: "payment",
    title: "Payment",
    hidden: true,
  },
];

export const MESSAGE_COLUMNS = [
  {
    field: "createdAt",
    title: "Date of Issue",
    searchable: true,
    customFilterAndSearch: (data, rowData) => {
      const date = new Date(rowData?.createdAt).toDateString();
      const time = new Date(rowData?.createdAt).toLocaleTimeString();
      return (
        date.toLowerCase().lastIndexOf(data.toLowerCase()) > -1 ||
        time.toLowerCase().lastIndexOf(data.toLowerCase()) > -1
      );
    },
    render: (rowData) => {
      const date = new Date(rowData?.createdAt).toDateString();
      const time = new Date(rowData?.createdAt).toLocaleTimeString();
      return (
        <ListItemText
          primary={date}
          primaryTypographyProps={{
            fontSize: 13,
            color: "primary.main",
          }}
          secondary={time}
          secondaryTypographyProps={{
            fontSize: 11,
          }}
        />
      );
    },
  },
  {
    field: "type",
    title: "Type",
    searchable: true,
    customFilterAndSearch: (data, { type }) => {
      return type.toLowerCase().lastIndexOf(data.toLowerCase()) > -1;
    },
    render: ({ type }) => {
      return type === "sms" ? (
        <Chip label="sms" color="primary" size="small" />
      ) : type === "email" ? (
        <Chip label="email" color="secondary" size="small" />
      ) : (
        <Box display="flex" columnGap={1}>
          <Chip label="sms" color="primary" size="small" />
          <Chip label="email" color="secondary" size="small" />
        </Box>
      );
    },
  },
  {
    field: "recipient",
    title: "Recipient",
    searchable: true,
    customFilterAndSearch: (data, { recipient }) => {
      return (
        recipient?.type?.toLowerCase().lastIndexOf(data.toLowerCase()) > -1 ||
        recipient?.phonenumber[0]
          ?.toLowerCase()
          .lastIndexOf(data.toLowerCase()) > -1 ||
        recipient?.email[0]?.toLowerCase().lastIndexOf(data.toLowerCase()) > -1
      );
    },
    render: (rowData) => {
      if (rowData.recipient?.type === "Individual") {
        return rowData.type === "sms"
          ? rowData.recipient?.phonenumber[0]
          : rowData.type === "email"
          ? rowData.recipient?.email[0]
          : `${rowData.recipient?.phonenumber[0]}, 
             ${rowData.recipient?.email[0]}`;
      } else {
        return rowData.recipient.type;
      }
    },
  },
  {
    field: "body",
    title: "Message",
    searchable: true,
    customFilterAndSearch: (data, { body }) => {
      return body?.title?.toLowerCase().lastIndexOf(data.toLowerCase()) > -1;
    },
    render: ({ body }) => {
      return (
        <>
          <ListItemText
            primary={body.title}
            primaryTypographyProps={{
              fontSize: 13,
              color: "primary.main",
              fontWeight: "bold",
            }}
            // secondary={body.message}
            secondaryTypographyProps={{
              fontSize: 12,
              textOverflow: `ellipsis`,
              whiteSpace: "nowrap",
              overflow: "hidden",
              minWidth: 150,
            }}
          />
          <Box
            sx={{
              // height: 100,
              width: "20%",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              whiteSpace: "wrap",
              lineHeight: 1.5,
              fontSize: "14px",
              color: "text.secondary",
              py: 1,
            }}
            dangerouslySetInnerHTML={{
              __html: body.message,
            }}
          />
        </>
      );
    },
  },
  {
    field: "status",
    title: "Status",
    export: true,
    render: ({ active }) => (
      <Button
        sx={{
          bgcolor: active ? "success.darker" : "error.darker",
          color: "#fff",
        }}
      >
        {active ? "Delivered" : "Not Delivered"}
      </Button>
    ),
  },
];

export const EXAMS_COLUMNS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },

  {
    field: "type",
    title: "Level",
  },

  {
    field: "noOfStudents",
    title: "Students",
  },

  {
    field: "noOfStudents",
    title: "More",
    render: () => {
      return <Button endIcon={<ArrowForwardRounded />}>View Details</Button>;
    },
  },
];

export const USERS_COLUMNS = [
  { title: "ID", field: "_id", hidden: true },
  {
    title: "Profile",
    field: "profile",
    export: false,
    width: 400,
    render: (rowData) => (
      <Stack
        direction="row"
        columnGap={1}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar src={rowData.profile} />
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
            >
              {_.startCase(rowData.fullname)}
            </Typography>
          }
          secondary={
            <Typography variant="caption">{`${_.startCase(rowData.gender)} ,${
              new Date().getFullYear() -
              new Date(rowData.dateofbirth).getUTCFullYear()
            }yrs`}</Typography>
          }
        />
      </Stack>
    ),
  },
  {
    title: "Name",
    field: "fullname",
    hidden: true,
    export: true,
  },
  {
    title: "Role",
    field: "role",
    render: (rowData) => (
      <ListItemText
        primary={<Typography variant="body2">{rowData.username}</Typography>}
        secondary={
          <Typography variant="caption" color="primary" fontWeight="bold">
            {rowData.role}
          </Typography>
        }
      />
    ),
    export: false,
  },
  {
    title: "Username",
    field: "username",
    hidden: true,
    export: true,
  },
  {
    title: "Role",
    field: "role",
    hidden: true,
    export: true,
  },
  {
    title: "Date Of Birth",
    field: "dateofbirth",
    export: true,
    hidden: true,
  },
  {
    title: "Telephone No.",
    field: "phonenumber",
    export: true,
    hidden: true,
  },
  {
    title: "Email Address",
    field: "email",
    export: true,
    hidden: true,
  },
  {
    field: "active",
    title: "Status",
    export: false,
    render: ({ active }) => (
      <Button
        startIcon={
          <CircleRounded
            sx={{ color: active ? "green" : "red", width: 10, height: 10 }}
          />
        }
      >
        {active ? "Active" : "Disabled"}
      </Button>
    ),
  },
  {
    field: null,
    title: "Contact Info",
    render: (rowData) => (
      <ListItemText
        primary={<Typography variant="body2">{rowData.email}</Typography>}
        secondary={
          <Typography variant="caption" color="primary" fontWeight="bold">
            {rowData.phonenumber}
          </Typography>
        }
      />
    ),
  },
  {
    field: "address",
    title: "Address",
    export: true,
  },
  {
    field: "nationality",
    title: "Nationality",
    export: true,
    hidden: true,
  },
];

export const SUBJECT_COLUMNS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "code",
    title: "Code",
  },
  {
    field: "name",
    title: "Subject",
  },
  {
    field: "isCore",
    title: "Core",
    render: ({ isCore }) =>
      isCore ? (
        <Button
          sx={{
            bgcolor: "info.lighter",
            color: "info.darker",
          }}
        >
          Core
        </Button>
      ) : null,
  },
];

export const COURSE_LEVEL_COLUMNS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "type",
    title: "Level",
  },
  {
    field: "noOfStudents",
    title: "Students",
  },
  {
    field: "noOfSubjects",
    title: "Subjects",
  },
];
export const ASSIGNED_COURSE_COLUMNS = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "levelId",
    title: "level ID",
    hidden: true,
  },
  {
    field: "subject.name",
    title: "Asigned Course",
  },
  {
    field: "level",
    title: "Level",
  },
  {
    field: "students",
    title: "Students",
  },
];

export const EVENTS = (handleViewEvent, handleEditEvent, handleDeleteEvent) => [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "type",
    title: "Type",
    hidden: true,
  },
  {
    field: "title",
    title: "Events",
    render: (data) => {
      return (
        <Card
          sx={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 3,
              backgroundColor: "rgba(0,0,0,0.02)",
            },
            position: "relative",
            overflow: "visible",
            mb: 2,
          }}
          onClick={() => handleViewEvent(data?._id)}
        >
          <Box sx={{ position: "relative" }}>
            {/* Event Image with Gradient Overlay */}
            <Box sx={{ position: "relative", height: 120, overflow: "hidden" }}>
              <Box
                component="img"
                src={data?.album}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)",
                }}
              />
            </Box>

            {/* Action Buttons - Appear on Hover */}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                opacity: 0,
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
                ".MuiCard-root:hover &": {
                  opacity: 1,
                },
              }}
            >
              <Paper
                sx={{
                  p: 0.5,
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                  bgcolor: "rgba(255,255,255,0.9)",
                }}
              >
                <Tooltip title="Edit Event">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEvent(data?._id);
                    }}
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.light",
                        color: "white",
                      },
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Event">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(data?._id);
                    }}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        backgroundColor: "error.light",
                        color: "white",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Box>

            {/* Content */}
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Stack spacing={1.5}>
                {/* Title with gradient text */}
                <Typography
                  variant="h6"
                  sx={{
                    background:
                      "linear-gradient(45deg, primary.main, secondary.main)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    lineHeight: 1.3,
                  }}
                >
                  {data?.title}
                </Typography>

                {/* Caption with smooth truncation */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3em",
                  }}
                >
                  {data?.caption}
                </Typography>

                {/* Interactive Footer */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pt: 1,
                  }}
                >
                  <Chip
                    label="View Details"
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: "0.75rem",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  />

                  {/* Status indicator */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "success.main",
                        animation: "pulse 2s infinite",
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Active
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Box>
        </Card>
      );
    },
  },

  {
    field: "title",
    title: "Title",
    hidden: true,
  },
];
export const NOTIFICATIONS = (
  handleViewNotification,
  handleEditNotification,
  handleDeleteNotification
) => [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "type",
    title: "Type",
    hidden: true,
  },
  {
    field: "title",
    title: "Notifications",
    render: (data) => {
      return (
        <div>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            py={3}
            pr={4}
            onClick={() => handleViewNotification(data?._id)}
          >
            <Avatar src={data?.album} sx={{ width: 80, height: 80 }} />
            <Stack flex={1}>
              <Typography variant="h6" color="secondary.main">
                {data?.title}
              </Typography>
              <div
                style={{
                  maxWidth: "60ch",
                  height: "50px",
                  overflow: "hidden",
                }}
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></div>
            </Stack>
            {/* <ArrowForwardIosRounded /> */}
          </Stack>
          <Stack justifyContent="flex-end" alignItems="center" direction="row">
            <IconButton onClick={() => handleEditNotification(data?._id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteNotification(data?._id)}>
              <Delete />
            </IconButton>
          </Stack>
        </div>
      );
    },
  },

  {
    field: "title",
    title: "Title",
    hidden: true,
  },
];

export const USER_ROLES = [
  {
    title: "School Sessions",
    subtitle: "Manage academic timelines and active learning periods.",
    roles: [
      { title: "Create new academic sessions" },
      { title: "Edit session details and timelines" },
      { title: "Delete outdated sessions" },
      { title: "Export session data and reports" },
      { title: "Activate or deactivate academic sessions" },
    ],
  },
  {
    title: "Departments",
    subtitle: "Organize and maintain the school’s structural units.",
    roles: [
      { title: "Create new departments" },
      { title: "Edit department details" },
      { title: "Delete inactive departments " },
      { title: "Export department records" },
    ],
  },
  {
    title: "Houses",
    subtitle: "Organize and maintain the school’sresidential units.",
    roles: [
      { title: "Create new  houses or sections" },
      { title: "Edit  house or section details" },
      { title: "Delete inactive houses or sections" },
      { title: "Export houses or section records" },
    ],
  },
  {
    title: "Levels",
    subtitle: "Define and manage educational levels or classes.",
    roles: [
      { title: "Create new levels or classes" },
      { title: "Edit level or class information" },
      { title: "Delete existing levels" },
      { title: "Export level or class lists" },
    ],
  },
  {
    title: "Subjects",
    subtitle: "Manage all subjects offered across various levels.",
    roles: [
      { title: "Create new subjects" },
      { title: "Edit subject information" },
      { title: "Delete subjects" },
      { title: "Export subject lists" },
    ],
  },
  {
    title: "Grades",
    subtitle: "Define grading systems and associate grades with levels.",
    roles: [
      { title: "Create grading scales" },
      { title: "Edit grade information" },
      { title: "Delete grade entries" },
      { title: "Export grading data" },
      { title: "Assign grades to specific levels" },
    ],
  },
  {
    title: "Students",
    subtitle: "Manage student enrollment, updates, and records.",
    roles: [
      { title: "Add new students" },
      { title: "Edit student information" },
      { title: "Remove student records" },
      { title: "Export student data for reporting" },
    ],
  },
  {
    title: "Teachers",
    subtitle: "Handle staff profiles and teaching assignments.",
    roles: [
      { title: "Add new teachers" },
      { title: "Edit teacher information" },
      { title: "Delete teacher records" },
      { title: "Export teacher data" },
      { title: "Assign levels to teachers" },
      { title: "Assign subjects or courses to teachers" },
    ],
  },
  {
    title: "School Fees",
    subtitle: "Oversee all aspects of school fees and payment tracking.",
    roles: [
      { title: "Create new school fee structures" },
      { title: "Edit fee details and categories" },
      { title: "Delete outdated fee records" },
      { title: "Export fee and payment data" },
      { title: "Authorize or confirm payments" },
      { title: "Query fee history and transactions" },
    ],
  },
  {
    title: "Examination Portal",
    subtitle: "Manage student assessments, grades, and reports.",
    roles: [
      { title: "Import or enter examination results" },
      { title: "Print examination reports and summaries" },
      { title: "Publish examination results for students" },
      { title: "Export examination data" },
    ],
  },
  {
    title: "Data Imports",
    subtitle: "Allow bulk upload of school data for quick setup.",
    roles: [{ title: "Enable data import operations" }],
  },
  {
    title: "Messages",
    subtitle: "Communicate important updates to staff, students, and parents.",
    roles: [
      { title: "Create new messages or announcements" },
      { title: "Edit message content" },
      { title: "Delete sent messages" },
      { title: "Export message history" },
      { title: "Resend or schedule messages" },
    ],
  },
  {
    title: "Events",
    subtitle: "Plan, manage, and share school events and programs.",
    roles: [
      { title: "Create school events or programs" },
      { title: "Edit event details" },
      { title: "Delete past or cancelled events" },
      { title: "Export event data" },
      { title: "Resend event notifications" },
    ],
  },
  {
    title: "Announcements",
    subtitle: "Keep the school community informed with timely updates.",
    roles: [
      { title: "Create new announcements" },
      { title: "Edit announcement details" },
      { title: "Delete old announcements" },
      { title: "Export announcements" },
      { title: "Resend announcements or notifications" },
    ],
  },
  {
    title: "Users",
    subtitle:
      "Manage staff and admin accounts, access levels, and permissions.",
    roles: [
      { title: "Create new user accounts" },
      { title: "Edit user information" },
      { title: "Delete user accounts" },
      { title: "Export user data" },
      { title: "Assign and manage user permissions" },
    ],
  },
  {
    title: "Settings",
    subtitle: "Customize your school’s system setup and key details.",
    roles: [
      { title: "Update school basic information" },
      { title: "Upload or change school logo" },
      { title: "Edit headmaster or administrator details" },
      { title: "Add, edit, or remove holidays" },
    ],
  },
  {
    title: "Notes Board",
    subtitle: "Create and share academic or administrative notes.",
    roles: [
      { title: "Create new notes" },
      { title: "Edit existing notes" },
      { title: "Delete notes" },
      { title: "Export notes data" },
    ],
  },
];
