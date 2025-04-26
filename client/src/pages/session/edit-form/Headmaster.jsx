import React, { useState } from "react";
import { Box, Button, Typography, Paper, Avatar, Stack } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Input from "@/components/inputs/Input";

const Headmaster = ({ control, watch, setValue }) => {
  const previewImage = watch("headmaster.signature");
  const [signaturePreview, setSignaturePreview] = useState(previewImage);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;

    // setSignaturePreview(reader.result);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSignaturePreview(reader.result);
      setValue("headmaster.signature", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Typography variant="h5" fontWeight="bold">
        Headmaster Information
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontStyle="italic"
        mb={3}
      >
        Provide the headmaster's information, including their full name and
        phone number. This information is essential for official communication
        and documentation purposes.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Stack spacing={2}>
          {/* Name Fsession?.heald */}

          <Input
            fullWidth
            size="small"
            id="name"
            name="headmaster.name"
            label="Full Name"
            control={control}
            margin="normal"
          />

          {/* Phone Number Field */}
          <Input
            fullWidth
            size="small"
            id="phone"
            name="headmaster.phone"
            label="Phone"
            control={control}
            margin="normal"
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
        </Stack>
      </Paper>
    </div>
  );
};

export default Headmaster;
