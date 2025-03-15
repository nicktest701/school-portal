import React, { useState, useEffect, use } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Input from "@/components/inputs/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { putTerm } from "@/api/termAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "@/context/providers/UserProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  signature: Yup.mixed()
    .required("Signature is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (value) {
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }
      return false;
    }),
});

const Headmaster = () => {
  const { updateSession, session } = use(UserContext);
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [signaturePreview, setSignaturePreview] = useState(
    session?.data?.signature
  );

  const { handleSubmit, reset, control, isSubmitting, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      signature: "",
    },
  });

  useEffect(() => {
    reset({
      name: session?.data?.name,
      phone: session?.data?.phone,
      signature: session?.data?.signature,
    });
  }, [session, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: putTerm,
  });

  const onSubmit = (values) => {
    const details = {
      sessionId: session?.sessionId,
      id: session?.termId,
      headmaster: {
        ...values,
        signature: signaturePreview,
      },
    };
    // console.log(details);
    // return;
    mutateAsync(details, {
      onSettled: () => {
        queryClient.invalidateQueries(["terms"]);
        queryClient.invalidateQueries(["terms/:id"]);
      },
      onSuccess: (data) => {
        updateSession({
          headmaster: details?.headmaster,
        });
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;

    setValue("signature", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSignaturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container
      sx={{
        borderRadius: "12px",
        bgcolor: "#fff",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Update Headmaster Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Fsession?.heald */}

          <Input
            fullWidth
            size="small"
            id="name"
            name="name"
            label="Name"
            control={control}
            margin="normal"
          />

          {/* Phone Number Field */}
          <Input
            fullWidth
            size="small"
            id="phone"
            name="phone"
            label="Phone"
            control={control}
            margin="normal"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">+1</InputAdornment>
            //   ),
            // }}
          />

          {/* Signature Upload Field */}
          <Box sx={{ mb: 3 }}>
            <input
              accept="image/*"
              id="signature"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="signature">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
              >
                Upload Signature
              </Button>
            </label>
          </Box>

          {/* Signature Preview */}
          {signaturePreview && (
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Signature Preview
              </Typography>
              <Avatar
                src={signaturePreview}
                alt="Signature Preview"
                sx={{
                  width: { xs: 150, sm: 200, md: 250 },
                  height: { xs: 150, sm: 200, md: 250 },
                  mx: "auto",
                }}
                variant="rounded"
              />
            </Box>
          )}

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              loading={isPending}
              variant="contained"
              onClick={handleSubmit}
              disabled={isPending || isSubmitting}
            >
              {isPending ? "Please Wait.." : "Update Changes"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Headmaster;
