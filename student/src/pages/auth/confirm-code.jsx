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
import { confirmCodeSchema } from "@/config/validationSchema";
import { useConfirmCode } from "@/hooks/useStudentAuth";
import { useNavigate } from "react-router-dom";

export default function ConfirmCode() {
  const navigate = useNavigate();
  const confirm = useConfirmCode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(confirmCodeSchema) });

  const onSubmit = (data) => {
    confirm.mutate(data, {
      onSuccess: () => {
        // Navigate to new password screen
        navigate("/reset-password"); // Replace with your routing logic
     
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" mt={4} mb={2}>
        Confirm Code
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Enter Code"
          margin="normal"
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code?.message}
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Verify
        </Button>
        <Box mt={2}>
          <Link href="/login">Back to login</Link>
        </Box>
      </form>
    </Container>
  );
}
