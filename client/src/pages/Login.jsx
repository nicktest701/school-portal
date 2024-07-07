import React, { useContext, useEffect, useState } from "react";
import { SchoolRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Avatar,
  Paper,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import CustomParticle from "../components/animations/CustomParticle";
import { Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { loginUserValidationSchema } from "../config/validationSchema";
import { getUserAuth } from "../api/userAPI";
import { UserContext } from "../context/providers/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
import LoginIcon from "../components/svg/LoginIcon";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { school_info, logInUser } = useContext(UserContext);
  const initialValues = {
    username: "",
    password: "",
  };
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (typeof state?.error === "string") {
      setMsg(state?.error);
    }
  }, [state]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: getUserAuth,
  });
  const onSubmit = (values) => {
    setMsg("");
    mutateAsync(values, {
      onSuccess: (data) => {
        logInUser(data?.token);
        navigate("/school-session", { replace: true });
      },
      onError: (error) => {
        setMsg(error);
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          height: "100svh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          bgcolor="primary.main"
          sx={{
            height: "100%",
            overflow: "clip",
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            color: "primary.contrastText",
          }}
        >
          <Typography
            variant="h1"
            textAlign="center"
            paragraph
            zIndex={9999999}
          >
            Frebby Tech School Portal
          </Typography>
          <LoginIcon />
        </Box>
        <Container
          maxWidth="sm"
          sx={{
            height: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: 2,
          }}
        >
          <Paper elevation={3} sx={{ width: "90%", p: 3 }}>
            <Stack
              spacing={2}
              pb={4}
              justifyContent="center"
              alignItems="center"
            >
              {school_info?.badge ? (
                <Avatar
                  alt="school logo"
                  loading="lazy"
                  srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                    school_info?.badge
                  }`}
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                />
              ) : (
                <SchoolRounded sx={{ width: 100, height: 100 }} />
              )}

              <Typography variant="h4" textAlign="center">
                {school_info?.name || "School Management Portal"}
              </Typography>
              <Typography variant="body2" fontStyle="italic" textAlign="center">
                {`"${school_info?.motto || "School Motto"}"`}
              </Typography>
            </Stack>

            <Typography variant="h4" alignSelf="flex-start">
              Welcome
            </Typography>
            <Typography
              variant="caption"
              alignSelf="flex-start"
              fontStyle="italic"
            >
              Login into your account
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={loginUserValidationSchema}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => {
                return (
                  <Stack spacing={2} py={2} width="100%">
                    {msg && (
                      <Alert variant="filled" severity="error">
                        {msg}
                      </Alert>
                    )}
                    <TextField
                      fullWidth
                      placeholder="Username here"
                      value={values.username}
                      onChange={handleChange("username")}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="Password here"
                      value={values.password}
                      onChange={handleChange("password")}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      margin="dense"
                    />
                    <LoadingButton
                      loading={isLoading}
                      fullWidth
                      loadingPosition="start"
                      startIcon={<CircularProgress size={20} />}
                      loadingIndicator={<CircularProgress size={20} />}
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      {isLoading ? "Please Wait.." : "Log in"}
                    </LoadingButton>
                  </Stack>
                );
              }}
            </Formik>
          </Paper>
          <Typography variant="body2">
            Copyright &copy; {new Date().getFullYear()} | FrebbyTech Consults
            (+233543772591)
          </Typography>
        </Container>
      </Box>
      <CustomParticle />
    </>
  );
};

export default Login;
