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
  Chip,
  IconButton,
  ListItemText,
  Stack,
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
  "J.H.S 1",
  "J.H.S 2",
  "J.H.S 3",
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
              maxWidth: 150,
            }}
          />
          <div
            style={{ height: 120, overflow: "hidden" }}
            dangerouslySetInnerHTML={{
              __html: body.message,
            }}
          ></div>
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
        <div>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            py={3}
            pr={4}
            onClick={() => handleViewEvent(data?._id)}
          >
            <Avatar src={data?.album} sx={{ width: 80, height: 80 }} />
            <Stack flex={1}>
              <Typography variant="h6" color="secondary.main">
                {data?.title}
              </Typography>
              <Typography variant="body2" className="truncate-lines">
                {data?.caption?.substring(0, 50) + "..."}
              </Typography>
            </Stack>
            {/* <ArrowForwardIosRounded /> */}
          </Stack>
          <Stack justifyContent="flex-end" alignItems="center" direction="row">
            <IconButton onClick={() => handleEditEvent(data?._id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteEvent(data?._id)}>
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
