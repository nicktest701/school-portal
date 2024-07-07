import { CircleRounded } from "@mui/icons-material";
import { Avatar, Button, ListItemText, Stack, Typography } from "@mui/material";
import _ from "lodash";
export const TEACHERS_COLUMN = [
  {
    field: "_id",
    title: "ID",
    hidden: true,
  },
  {
    field: "fullName",
    title: "FullName",
    hidden: true,
    export: true,
  },
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
        <Avatar
          src={
            rowData.profile === undefined || rowData.profile === ""
              ? null
              : rowData?.profile?.startsWith("data:image")
              ? rowData?.profile
              : `${import.meta.env.VITE_BASE_URL}/images/users/${
                  rowData.profile
                }`
          }
        />
        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
            >
              {rowData.fullName}
            </Typography>
          }
          secondary={
            <Typography variant="caption">{`${_.startCase(rowData.gender)},${
              new Date().getFullYear() -
              new Date(rowData.dateofbirth).getUTCFullYear()
            }yrs`}</Typography>
          }
        />
      </Stack>
    ),
  },
  {
    field: "username",
    title: "Username",
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
    field: "dateofbirth",
    title: "Date Of Birth",
    hidden: true,
    export: true,
  },
  {
    field: "gender",
    title: "Gender",
    hidden: true,
    export: true,
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
    field: "email",
    title: "Email",
    export: true,
    hidden: true,
  },
  {
    field: "phonenumber",
    title: "Telephone No.",
    export: true,
    hidden: true,
  },
  {
    field: "address",
    title: "Address",
    export: true,
    hidden: true,
  },
  {
    field: "residence",
    title: "Residence",
  },
  {
    field: "nationality",
    title: "Nationality",
  },
];

export const IMPORT_TEACHER_COLUMNS = [
  {
    field: "firstname",
    title: "FIRST NAME",
  },
  {
    field: "surname",
    title: "SURNAME",
  },
  {
    field: "username",
    title: "USERNAME",
  },
  {
    field: "dateofbirth",
    title: "DATE OF BIRTH",
  },
  {
    field: "gender",
    title: "GENDER",
  },
  {
    field: "email",
    title: "EMAIL ADDRESS",
  },
  {
    field: "phonenumber",
    title: "TELEPHONE NUMBER",
  },
  {
    field: "address",
    title: "HOUSE/GPS ADDRESS",
  },
  {
    field: "residence",
    title: "RESIDENCE",
  },
  {
    field: "nationality",
    title: "NATIONALITY",
  },
];
