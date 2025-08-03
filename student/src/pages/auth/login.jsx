// src/components/Login.js
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect } from "react";
import { useLogin } from "@/hooks/useStudentAuth";
import { useAuth } from "@/context/AuthProvider";
import {
  getSavedLoginInfo,
  saveLoginInfo,
  setToken,
} from "@/config/sessionHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/config/validationSchema";

const Login = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      studentId: "",
      password: "",
      rememberMe: false,
    },
    resolver: yupResolver(loginSchema),
  });
  const { login } = useAuth();
  const loginStudent = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const { studentId, password } = getSavedLoginInfo();
    setValue("studentId", studentId);
    setValue("password", password);
    setValue("rememberMe", !!studentId); // if ID exists, likely remembered
  }, [setValue]);

  const onSubmit = async (data) => {
 
    // Call the login mutation with the form data
    loginStudent.mutate(data, {
      onSettled: () => {
        if (data.rememberMe) {
          localStorage.setItem("rememberStudentId", data.studentId);
          localStorage.setItem("rememberPassword", data.password);
        } else {
          localStorage.removeItem("rememberStudentId");
          localStorage.removeItem("rememberPassword");
        }
      },
      onSuccess: (res) => {
        // Save the access token and student ID in local storage or session storage
        if (res.accessToken) {
          login(res.accessToken);
          setToken(res.accessToken, data.rememberMe); // Pass rememberMe flag
          saveLoginInfo(data.studentId, data.password, data.rememberMe);
          navigate("/"); // Redirect to the home page after successful login
        }
      },
      onError: (err) => {
        alert(err.response.data.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Student ID"
        {...register("studentId")}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox {...register("rememberMe")} />}
        label="Remember me"
      />
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default Login;
