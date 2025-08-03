import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newPasswordSchema } from "@/config/validationSchema";
import { useResetPassword } from "@/hooks/useStudentAuth";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const resetPassword = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newPasswordSchema) });

  const onSubmit = (data) => {
    resetPassword.mutate(data, {
      onSuccess: () => {
        // Navigate back to login screen
        navigate("/login", {
          state: { message: "Password reset successfully. Please log in." },
        });
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" mt={4} mb={2}>
        Set New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Reset Password
        </Button>
        <Box mt={2}>
          <Link href="/login">Back to login</Link>
        </Box>
      </form>
    </Container>
  );
}
