// FeeReceipt.tsx
import React, { use, useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Grid2 as Grid,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { UserContext } from "@/context/providers/UserProvider";
import moment from "moment";
import { currencyFormatter } from "@/config/currencyFormatter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { PrintRounded } from "@mui/icons-material";

export default function Receipt() {
  const componentRef = useRef();
  const { school_info } = use(UserContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const reactToPrintFn = useReactToPrint({
    documentTitle: "Fee Receipt",
    contentRef: componentRef,
    onAfterPrint: () => {
      navigate(-1, {
        replace: true,
      });
    },
  });

  return (
    <Container
      maxWidth="md"
      sx={{ mx: "auto", display: "grid", placeItems: "center" }}
    >
      <Paper
        className="fee-receipt"
        ref={componentRef}
        sx={{
          p: 3,
          maxWidth: 450,
          my: 2,
          mx: "auto",
          border: "1px solid lightgray",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <Button
          className="print-btn"
          variant="text"
          startIcon={<PrintRounded />}
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
            zIndex: 999999999,
          }}
          onClick={() => reactToPrintFn()}
        >
          Print
        </Button>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src={school_info?.badge} alt="logo" width={60} />
            <Box>
              <Typography
                fontSize={12}
                variant="h5"
                color="primary"
                textTransform="uppercase"
                fontWeight="bold"
              >
                {school_info?.name}
              </Typography>
              <Typography fontSize={12}>{school_info?.address}</Typography>
              <Typography fontSize={12}>{school_info?.email}</Typography>
              <Typography fontSize={12}>{school_info?.phonenumber}</Typography>
            </Box>
          </Box>
          <Box
            pt={2}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography fontWeight="bold" fontSize={12}>
              Invoice No:
            </Typography>
            <Typography fontSize={12}>{state?.fee?.id}</Typography>
            <Typography fontWeight="bold" fontSize={12}>
              Invoice Date:
            </Typography>
            <Typography fontSize={12}>
              {moment(state?.fee?.createdAt).format("LLL")}
            </Typography>
          </Box>
        </Box>

        {/* Invoice To */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            fontSize={12}
            variant="h5"
            color="primary"
            fontWeight="bold"
          >
            FEE RECEIPT
          </Typography>
          <Divider
            sx={{ width: 60, mx: "auto", mt: 1, borderColor: "primary" }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography fontSize={12} fontWeight="bold">
            Invoice To
          </Typography>
          <Typography fontSize={12} color="primary">
            {state?.fee?.payer?.name}
          </Typography>
          <Typography fontSize={12}>
            Phone: {state?.fee?.payer?.phonenumber}
          </Typography>
        </Box>

        {/* Table */}
        <Table sx={{ border: "1px solid var(--primary)", mb: 3 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "var(--primary)" }}>
              <TableCell>NO.</TableCell>
              <TableCell> DESCRIPTION</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
              <TableCell align="right">BALANCE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{`01`}</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell align="right">
                {currencyFormatter(state?.fee?.paid || 0)}
              </TableCell>
              <TableCell align="right">{currencyFormatter(0)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Payment Details and Summary */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography fontSize={12} fontWeight="bold" color="primary" mb={1}>
              Payments Method:
            </Typography>
            <Typography fontSize={12}>{state?.fee?.paymentMethod}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ maxWidth: 250, ml: "auto" }}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Typography fontSize={12}>Total Fees :</Typography>
                <Typography fontSize={12} align="right">
                  {currencyFormatter(state?.fee?.fee || 0)}
                </Typography>
              </Box>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Typography fontSize={12}>Arreas :</Typography>
                <Typography fontSize={12} align="right">
                  {currencyFormatter(state?.fee?.arreas || 0)}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Typography fontSize={12}>Amount Paid :</Typography>
                <Typography fontSize={12} align="right">
                  {currencyFormatter(
                    state?.fee?.feePaid + state?.fee?.paid || 0
                  )}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Typography fontSize={12}>Outstanding :</Typography>
                <Typography fontSize={12} align="right">
                  {currencyFormatter(state?.fee?.outstanding || 0)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Terms */}
        <Box mt={4}>
          <Typography fontSize={12} fontWeight="bold" color="primary">
            Terms & Conditions:
          </Typography>
          <Typography
            fontSize={12}
            variant="body2"
            fontStyle="italic"
            color="gray"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the...
          </Typography>
        </Box>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <img
            src={school_info?.badge}
            alt="school logo"
            style={{
              opacity: 0.03,
              width: "6in",
              height: "5.5in",
            }}
          />
        </div>
      </Paper>

      <Link
        style={{
          color: "#fff",
          display: "block",
          paddingBlock: "10px",
          paddingInline: "20px",
          backgroundColor: "var(--primary)",
          borderRadius: "6px",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
        }}
        to={-1}
      >
        Go Back
      </Link>
    </Container>
  );
}
