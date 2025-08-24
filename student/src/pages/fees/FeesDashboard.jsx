// FeesDashboard.jsx
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import {
  Payments as PaymentsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  Receipt as ReceiptIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment,
} from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import { getFeeDashboardInfo } from "@/api/currentFeeAPI";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthProvider";
import { currencyFormatter } from "@/config/currencyFormatter";
import moment from "moment";
import FeeDashboardSkeleton from "@/components/skeleton/FeeDashboardSkeleton";

const FeesDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const feesRecord = useQuery({
    queryKey: ["feesRecord", user?._id],
    queryFn: () => getFeeDashboardInfo(user?._id),
    refetchOnWindowFocus: false,
    // retry: 1,
    enabled: !!user?._id,
    initialData: {
      totalFees: 0,
      totalPaid: 0,
      lastFeePaid: {
        paid: 0,
        outstanding: 0,
        paymentMethod: "",
        payer: { name: "", phonenumber: "" },
        createdAt: new Date(),
        issuerID: "",
        issuerName: "",
        id: "",
        term: "",
        level: "",
      },
      totalArrears: 0,
      feePaymentTrend: { labels: [""], dataset: [0] },
      topFeePayments: [],
      activeLevel: null,
    },
  });
  const lastPaidDate = feesRecord.data?.lastFeePaid
    ? moment(feesRecord.data?.lastFeePaid?.createdAt).format("LL")
    : "";

  if (feesRecord.isPending) {
    return <FeeDashboardSkeleton />;
  }

  // Stat Cards Data
  const stats = [
    {
      title: "Total Fees Paid",
      value: currencyFormatter(feesRecord.data?.totalPaid),
      icon: <PaymentsIcon fontSize="large" />,
      color: theme.palette.success.main,
      bgColor: "rgba(76, 175, 80, 0.1)",
      description: "All payments received",
    },
    {
      title: "Total Arrears",
      value: currencyFormatter(feesRecord.data?.totalArrears),
      icon: <WarningIcon fontSize="large" />,
      color: theme.palette.error.main,
      bgColor: "rgba(244, 67, 54, 0.1)",
      description: "Outstanding balance",
    },
    {
      title: "Last Fee Paid",
      value: currencyFormatter(feesRecord.data?.lastFeePaid?.paid ?? 0),
      icon: <CheckCircleIcon fontSize="large" />,
      color: theme.palette.primary.main,
      bgColor: "rgba(25, 118, 210, 0.1)",
      description: lastPaidDate,
    },
  ];

  // Current Fee Details
  const feeDetails = {
    total: currencyFormatter(feesRecord?.data?.activeLevel?.fees),
    paid: currencyFormatter(feesRecord?.data?.activeLevel?.paid),
    arrears: currencyFormatter(feesRecord?.data?.activeLevel?.arrears),
    percentage: `${feesRecord?.data?.activeLevel?.percentage}`,
  };

  // Fee Payment History Data
  const paymentHistory = {
    labels: feesRecord.data?.feePaymentTrend?.labels,
    datasets: [
      {
        label: "Amount Paid",
        data: feesRecord.data?.feePaymentTrend?.dataset,
        borderColor: theme.palette.primary.main,
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme.palette.primary.main,
      },
    ],
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPayments = feesRecord.data.topFeePayments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Amount: GHS${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value) {
            return "GHS " + value;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  return (
    <Container sx={{ py: 2, margin: "0 auto" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.dark,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Payment fontSize="large" />
          Dashboard
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          View your fee payments, arrears, and payment history below.
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid
            item
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
            key={index}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: stat.bgColor,
                    mr: 3,
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ mb: 0.5 }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: stat.color, fontWeight: 500 }}
                  >
                    {stat.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Current Fee Details and Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                Current Fee Summary
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Fees
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                      {feeDetails.total}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(76, 175, 80, 0.05)",
                      borderLeft: `4px solid ${theme.palette.success.main}`,
                    }}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      Amount Paid
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mt: 1,
                        color: theme.palette.success.main,
                      }}
                    >
                      {feeDetails.paid}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(244, 67, 54, 0.05)",
                      borderLeft: `4px solid ${theme.palette.error.main}`,
                    }}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      Arrears
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mt: 1,
                        color: theme.palette.error.main,
                      }}
                    >
                      {feeDetails.arrears}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, position: "relative" }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Payment Progress
                </Typography>
                <Box
                  sx={{
                    height: 12,
                    width: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${feeDetails.percentage}%`,
                      background: `linear-gradient(90deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
                      borderRadius: 6,
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                  {feeDetails.percentage}% paid
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                Fee Payment History
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line data={paymentHistory} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Recent Fees Paid */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: theme.palette.primary.main }}
            >
              Recent Fees Paid
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: isTablet ? "100%" : 300, mt: isTablet ? 2 : 0 }}
            />
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "rgba(0, 0, 0, 0.02)" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Date Paid</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Receipt No.</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Paid by.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment) => (
                    <TableRow
                      key={payment.id}
                      hover
                      sx={{
                        "&:nth-of-type(even)": {
                          bgcolor: "rgba(0, 0, 0, 0.02)",
                        },
                        "&:hover": { bgcolor: "rgba(25, 118, 210, 0.03)" },
                      }}
                    >
                      <TableCell>
                        {moment(payment.createdAt)?.format("LL")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.success.main,
                        }}
                      >
                        {currencyFormatter(payment.paid)}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {payment.paymentMethod === "Credit Card" ? (
                            <CreditCardIcon
                              sx={{ color: theme.palette.primary.main, mr: 1 }}
                            />
                          ) : payment.paymentMethod === "Cash" ? (
                            <BankIcon
                              sx={{ color: theme.palette.primary.main, mr: 1 }}
                            />
                          ) : payment.paymentMethod === "Bank Transfer" ? (
                            <BankIcon
                              sx={{ color: theme.palette.primary.main, mr: 1 }}
                            />
                          ) : (
                            <ReceiptIcon
                              sx={{ color: theme.palette.primary.main, mr: 1 }}
                            />
                          )}
                          {payment.paymentMethod}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>
                        {payment.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: "bold",
                          whiteSpace: "no-wrap",
                        }}
                      >
                        {payment.payer?.name} |
                        <span style={{ fontWeight: "normal" }}>
                          {payment?.payer?.phonenumber}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredPayments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}
            />
          </TableContainer>
        </CardContent>
      </Card>
      {/* Bottom status */}
      {feesRecord?.data?.totalArrears > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(25, 118, 210, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
          <Typography variant="body2">
            Your next payment of{" "}
            {currencyFormatter(feesRecord?.data?.totalArrears)} is due on{" "}
            {moment(feesRecord?.data?.lastFeePaid?.createdAt)
              .add(2, "week")
              .format("LL")}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default FeesDashboard;
