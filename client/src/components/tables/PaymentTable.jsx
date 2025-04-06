import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import { currencyFormatter } from "@/config/currencyFormatter";

const PaymentTable = ({ payments = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date of Issue</TableCell>
            <TableCell>Amount Paid (GHS)</TableCell>
            <TableCell>Outstanding (GHS)</TableCell>
            <TableCell>Balance (GHS)</TableCell>
            <TableCell>Issuer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>
                {format(
                  new Date(payment?.date || payment?.createdAt),
                  "do MMM, yyyy"
                )}
              </TableCell>
              <TableCell>{currencyFormatter(payment?.paid)}</TableCell>
              <TableCell>
                {currencyFormatter(payment?.outstanding || 0)}
              </TableCell>
              <TableCell>{currencyFormatter(payment?.balance || 0)}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>
                {payment?.issuer}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
