// src/components/ConfirmCode.js
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Fade,
  CircularProgress,
  keyframes,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { confirmCodeSchema } from "@/config/validationSchema";
import { useConfirmCode } from "@/hooks/useStudentAuth";
import { useLocation, useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function ConfirmCode() {
  const navigate = useNavigate();
  const { studentId } = useLocation().state || {};
  const confirm = useConfirmCode();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(confirmCodeSchema),
    mode: "onChange",
  });

  // Handle OTP input changes
  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setValue("code", newOtp.join(""));

      // Auto-advance to next input
      if (value !== "" && index < 5) {
        setActiveIndex(index + 1);
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text/plain")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasteData.length === 6) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      setValue("code", newOtp.join(""));
      setActiveIndex(5);
    }
  };

  // Auto-focus the active input
  useEffect(() => {
    if (inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex].focus();
    }
  }, [activeIndex]);

  // Set focus to first input on load
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  // Resend countdown timer
  useEffect(() => {
    let timer;
    if (secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // Handle form submission
  const onSubmit = (data) => {
    confirm.mutate(
      {
        studentId: studentId,
        code: data.code,
      },
      {
        onSuccess: () => {
          setIsVerified(true);
          setTimeout(
            () => navigate("/reset-password", { state: { studentId } }),
            2000
          );
        },
        onError: () => {
          setIsError(true);
          setTimeout(() => setIsError(false), 1000);
        },
      }
    );
  };

  // Handle resend code
  const handleResend = () => {
    if (secondsLeft === 0) {
      setIsResending(true);
      // Simulate API call to resend code
      setTimeout(() => {
        setIsResending(false);
        setSecondsLeft(60);
      }, 1500);
    }
  };

  // Shake animation for error state
  const shake = keyframes`
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  `;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
        py: 4,
        px: 2,
      }}
    >
      <Fade in={true} timeout={600}>
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 4,
              p: { xs: 3, sm: 4, md: 6 },
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Logo */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  width: 70,
                  height: 70,
                  backgroundColor: "#3B82F6",
                  borderRadius: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <VerifiedIcon sx={{ color: "white", fontSize: 36 }} />
              </Box>
            </Box>

            {/* Title & Subtitle */}
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 1,
              }}
            >
              Confirm Your Code
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 400,
                mx: "auto",
                mb: 4,
              }}
            >
              We've sent a 6-digit verification code to your email. Enter it
              below to continue.
            </Typography>

            {isVerified ? (
              <Box sx={{ py: 4 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <VerifiedIcon sx={{ color: "#10B981", fontSize: 48 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#10B981", fontWeight: 700 }}
                >
                  Code Verified!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  Redirecting you to reset your password...
                </Typography>
              </Box>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Hidden input for form submission */}
                <input type="hidden" {...register("code")} />

                {/* OTP Inputs */}
                <Grid
                  container
                  justifyContent="center"
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  {otp.map((digit, index) => (
                    <Grid item key={index}>
                      <TextField
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => setActiveIndex(index)}
                        inputProps={{
                          maxLength: 1,
                          "aria-label": `Digit ${index + 1} of 6`,
                          style: { textAlign: "center" },
                        }}
                        sx={{
                          width: 56,
                          "& .MuiInputBase-root": {
                            height: 56,
                            borderRadius: 2,
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            backgroundColor:
                              activeIndex === index
                                ? "rgba(59, 130, 246, 0.05)"
                                : "background.paper",
                            border:
                              activeIndex === index
                                ? "2px solid #3B82F6"
                                : "1px solid #e0e0e0",
                            boxShadow:
                              activeIndex === index
                                ? "0 0 0 3px rgba(59, 130, 246, 0.2)"
                                : "none",
                            transition: "all 0.2s ease",
                            animation:
                              isError && index === 5
                                ? `${shake} 0.5s ease`
                                : "none",
                          },
                          "& input": {
                            padding: "6px 0",
                            textAlign: "center",
                          },
                        }}
                        autoComplete="off"
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Error message */}
                {isError && (
                  <Typography
                    color="error"
                    sx={{
                      mb: 3,
                      fontWeight: 500,
                    }}
                  >
                    Invalid code. Please try again.
                  </Typography>
                )}

                {/* Verify Button */}
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={otp.join("").length !== 6 || confirm.isLoading}
                  sx={{
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
                    mb: 3,
                  }}
                >
                  {confirm.isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Verify Code"
                  )}
                </Button>

                {/* Resend Link */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Didn't receive the code?{" "}
                    {secondsLeft > 0 ? (
                      <span>Resend in {secondsLeft}s</span>
                    ) : (
                      <Link
                        component="button"
                        type="button"
                        onClick={handleResend}
                        underline="hover"
                        sx={{
                          fontWeight: 600,
                          color: "#3B82F6",
                          "&:hover": {
                            color: "#2563EB",
                            cursor: isResending ? "not-allowed" : "pointer",
                          },
                        }}
                        disabled={isResending}
                      >
                        {isResending ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          "Resend"
                        )}
                      </Link>
                    )}
                  </Typography>
                </Box>
              </form>
            )}

            {/* Back to Login */}
            <Box mt={4}>
              <Link
                href="/login"
                underline="hover"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 500,
                  color: "text.secondary",
                  "&:hover": { color: "#3B82F6" },
                }}
              >
                ← Back to Login
              </Link>
            </Box>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
}
