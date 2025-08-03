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
import { resetSchema } from "@/config/validationSchema";
import { useRequestReset } from "@/hooks/useStudentAuth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const requestReset = useRequestReset();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetSchema) });

  const onSubmit = (data) => {
    requestReset.mutate(data, {
      onSuccess: () => {
        // Navigate to confirm code screen
        navigate("/confirm-code"); // Replace with your routing logic

      },
      onError: (err) => {
        alert(err.response.data.message);
      },
      onSettled: () => {
        // Optionally, you can reset the form or show a success message
        console.log("Request sent successfully");
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" mt={4} mb={2}>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Student ID"
          margin="normal"
          {...register("studentId")}
          error={!!errors.studentId}
          helperText={errors.studentId?.message}
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Send Code
        </Button>
        <Box mt={2}>
          <Link href="/login">Back to login</Link>
        </Box>
      </form>
    </Container>
  );
}
