// src/components/ForgotPassword.js
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Fade,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetSchema } from "@/config/validationSchema";
import { useRequestReset } from "@/hooks/useStudentAuth";
import { useNavigate } from "react-router-dom";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ForgotPassword() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const requestReset = useRequestReset();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(resetSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    requestReset.mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true);
        setTimeout(
          () =>
            navigate("/confirm-code", { state: { studentId: data.studentId } }),
          1000
        );
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Grid
            container
            justifyContent="center"
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            }}
          >
            {!isMobile && (
              <Grid
                item
                md={6}
                sx={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 8,
                }}
              >
                <Box textAlign="center" color="white">
                  <LockResetIcon sx={{ fontSize: 120, mb: 3 }} />
                  <Typography variant="h4" fontWeight={700} mb={2}>
                    Reset Your Password
                  </Typography>
                  <Typography variant="body1">
                    Enter your Student ID to receive a password reset link
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 4, md: 8 },
              }}
            >
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <LockResetIcon
                  sx={{
                    fontSize: 60,
                    color: "#3B82F6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "50%",
                    p: 1.5,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  fontWeight={700}
                  gutterBottom
                  sx={{ color: "text.primary" }}
                >
                  Forgot Password?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    maxWidth: 400,
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  Enter your Student ID below and we'll send you a link to reset
                  your password
                </Typography>
              </Box>

              {isSubmitted ? (
                <Box
                  textAlign="center"
                  sx={{
                    backgroundColor: "rgba(110, 231, 183, 0.2)",
                    borderRadius: 2,
                    p: 3,
                    border: "1px solid #10B981",
                  }}
                >
                  <Typography variant="h6" color="#10B981" fontWeight={600}>
                    Reset Link Sent!
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    Please check your inbox for the password reset instructions.
                  </Typography>
                </Box>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    fullWidth
                    label="Student ID"
                    margin="normal"
                    {...register("studentId")}
                    error={!!errors.studentId}
                    helperText={errors.studentId?.message}
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        backgroundColor: "background.paper",
                      },
                    }}
                    autoFocus
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={!isValid || requestReset.isLoading}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      backgroundColor: "#3B82F6",
                      boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 18px rgba(59, 130, 246, 0.5)",
                        backgroundColor: "#2563EB",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {requestReset.isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>

                  <Box
                    mt={3}
                    textAlign="center"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link
                      href="/login"
                      underline="hover"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                        fontWeight: 500,
                        "&:hover": {
                          color: "#3B82F6",
                        },
                      }}
                    >
                      <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                      Back to Login
                    </Link>
                  </Box>

                  {requestReset.isError && (
                    <Typography
                      color="error"
                      align="center"
                      mt={2}
                      sx={{ fontWeight: 500 }}
                    >
                      {requestReset.error.response?.data?.message ||
                        "Failed to send reset link"}
                    </Typography>
                  )}
                </form>
              )}
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
}
