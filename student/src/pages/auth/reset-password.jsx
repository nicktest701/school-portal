// src/components/ResetPassword.js
import { useState, useEffect, useRef, use } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Fade,
  CircularProgress,
  LinearProgress,
  keyframes,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  CheckCircle,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newPasswordSchema } from "@/config/validationSchema";
import { useResetPassword } from "@/hooks/useStudentAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { studentId } = useLocation().state || {};
  const resetPassword = useResetPassword();
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
    mode: "onChange",
  });

  const newPassword = watch("password", "");

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) strength += 1;

    setPasswordStrength(strength);
  }, [newPassword]);

  // Handle password visibility toggle
  const handleClickShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  // Shake animation for error state
  const shake = keyframes`
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  `;

  const onSubmit = (data) => {
    resetPassword.mutate(
      {
        studentId: studentId,
        newPassword: data.password,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setTimeout(() => navigate("/login"), 3000);
        },
        onError: () => {
          setIsError(true);
          setTimeout(() => setIsError(false), 1000);
        },
      }
    );
  };

  // Password strength colors
  const getStrengthColor = () => {
    if (passwordStrength === 0) return "error";
    if (passwordStrength <= 2) return "warning";
    return "success";
  };

  useEffect(() => {
    if (!studentId) {
      navigate("/login");
    }
  }, [studentId, navigate]);

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
                <Lock sx={{ color: "white", fontSize: 36 }} />
              </Box>
            </Box>

            {isSuccess ? (
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
                    animation: "scaleIn 0.5s ease",
                    "@keyframes scaleIn": {
                      "0%": { transform: "scale(0)", opacity: 0 },
                      "100%": { transform: "scale(1)", opacity: 1 },
                    },
                  }}
                >
                  <CheckCircle sx={{ color: "#10B981", fontSize: 48 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#10B981", fontWeight: 700 }}
                >
                  Password Reset Successful!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, color: "text.secondary" }}
                >
                  You can now log in with your new password.
                </Typography>
              </Box>
            ) : (
              <>
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
                  Reset Your Password
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
                  Enter your new password below to secure your account.
                </Typography>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  ref={formRef}
                >
                  {/* New Password */}
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword.newPassword ? "text" : "password"}
                    margin="normal"
                    {...register("password")}
                    error={!!errors.password || isError}
                    helperText={errors.password?.message}
                    InputProps={{
                      sx: { borderRadius: 2 },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "action.active" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handleClickShowPassword("newPassword")
                            }
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword.newPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      animation: isError ? `${shake} 0.5s ease` : "none",
                    }}
                  />

                  {/* Password Strength Meter */}
                  <Box sx={{ width: "100%", mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={passwordStrength * 25}
                      color={getStrengthColor()}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      Password strength:{" "}
                      {passwordStrength === 0
                        ? "None"
                        : passwordStrength === 1
                        ? "Weak"
                        : passwordStrength === 2
                        ? "Medium"
                        : passwordStrength === 3
                        ? "Strong"
                        : "Very Strong"}
                    </Typography>
                  </Box>

                  {/* Password Requirements */}
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{
                      color: "text.secondary",
                      mb: 2,
                      textAlign: "left",
                    }}
                  >
                    Password must be at least 8 characters with one number and
                    one special character.
                  </Typography>

                  {/* Confirm Password */}
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    margin="normal"
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword || isError}
                    helperText={
                      errors.confirmPassword?.message ||
                      (isError ? "Passwords do not match" : "")
                    }
                    InputProps={{
                      sx: { borderRadius: 2 },
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "action.active" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handleClickShowPassword("confirmPassword")
                            }
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showPassword.confirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      animation: isError ? `${shake} 0.5s ease` : "none",
                    }}
                  />

                  {/* Reset Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={!isValid || resetPassword.isLoading}
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
                      mb: 2,
                    }}
                  >
                    {resetPassword.isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </>
            )}

            {/* Back to Login */}
            <Box mt={2}>
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
