import { SchoolRounded } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ListItemText,
} from "@mui/material";
import React from "react";
import _ from "lodash";

import { currencyFormatter } from "@/config/currencyFormatter";
const school_info = JSON.parse(localStorage.getItem("@school_info"));

function FeeReport({ student }) {
  return (
    <div>
      <Stack
        spacing={1}
        sx={{
          maxWidth: "8.5in",
          minHeight: "11in",
          margin: "auto",
          padding: "8px",
        }}
      >
        {/* school details */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnGap={2}
          pb={2}
        >
          {school_info?.badge ? (
            <Avatar
              alt="school logo"
              loading="lazy"
              srcSet={school_info?.badge}
              sx={{
                width: 40,
                height: 40,
              }}
            />
          ) : (
            <SchoolRounded sx={{ width: 40, height: 40 }} />
          )}
          <Stack justifyContent="flex-start" alignItems="flex-start">
            <Typography variant="h6">
              {_.startCase(school_info?.name)}
            </Typography>
            <Typography variant="caption">{school_info?.address}</Typography>
            <Typography variant="caption">{school_info?.location}</Typography>
            <Typography variant="caption" fontStyle="italic">
              {school_info?.motto}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Typography
          paragraph
          sx={{
            textAlign: "center",
            color: "primary",
            width: "100%",
            padding: "4px",
          }}
          variant="h6"
        >
          Fees Report
        </Typography>

        {/* avatar */}
        <Stack justifyContent="center" alignItems="center" spacing={1} pt={2}>
          <Avatar
            src={student?.profile}
            sx={{ width: 40, height: 40, alignSelf: "center" }}
          />
          <Typography>{student?.fullName}</Typography>
          <Typography variant="caption">
            {student?.levelType}
            {/* {student?.term} */}
          </Typography>
        </Stack>

        <div style={{ flexGrow: 1 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date Of Payment</TableCell>
                  <TableCell>Amount Paid</TableCell>
                  <TableCell>Remaining Fees</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Issuer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student?.payment.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <ListItemText
                        primary={new Date(row?.date).toDateString()}
                        secondary={new Date(row?.date).toLocaleTimeString()}
                        slotProps={{
                          primary: {
                            fontSize: 12,
                          },
                          secondary: {
                            fontSize: 12,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>{currencyFormatter(row?.paid)}</TableCell>
                    <TableCell>{currencyFormatter(row?.outstanding)}</TableCell>
                    <TableCell>{currencyFormatter(row?.balance)}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {row?.issuer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Typography
          style={{
            fontSize: "10px",
            fontStyle: "italic",
          }}
        >
          Powered by FrebbyTech Consults (0543772591)
        </Typography>
      </Stack>
    </div>
  );
}

export default FeeReport;
