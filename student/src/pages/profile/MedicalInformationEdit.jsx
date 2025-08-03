import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Dialog, DialogContent, TextField } from "@mui/material";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import CustomFormControl from "@/components/inputs/CustomFormControl";
import MedicalAllergy from "@/components/items/MedicalAllergy";
import { useSearchParams } from "react-router-dom";

const MedicalInformationEdit = ({ medical }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClose = () =>
    setSearchParams((params) => {
      params.delete("mi");

      return params;
    });

  return (
    <Dialog
      open={searchParams.get("mi") === "true"}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
    >
      <CustomDialogTitle title="Medical History" onClose={handleClose} />
      <DialogContent sx={{ p: 1 }}>
        <Stack padding={2} spacing={1}>
          <Stack width={{ xs: "100%", md: "80%" }} py={5}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              }}
            >
              <MedicalAllergy
                title="1. Heart Disease"
                value={medical?.heartDisease}
              />
              <MedicalAllergy
                title="2. Visual Impairment"
                value={medical?.visualImpairment}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              }}
            >
              <MedicalAllergy title="3. Asthma" value={medical?.asthma} />
              <MedicalAllergy
                title="4. Hearing Impairment"
                value={medical?.hearingImpairment}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              }}
            >
              <MedicalAllergy title="5. Siezures" value={medical?.siezures} />
              <MedicalAllergy
                title="6. Physical Disability"
                value={medical?.physicalDisability}
              />
            </div>
          </Stack>
          <Stack py={2} spacing={1}>
            <Typography
              variant="body2"
              color="primary.main"
              sx={{ fontWeight: "bold" }}
            >
              Emergency Contact
            </Typography>
            <CustomFormControl>
              <TextField
                label="Fullname"
                type="text"
                fullWidth
                size="small"
                value={medical?.emergencyContact?.fullname}
              />
              <TextField
                label="Telephone No."
                inputMode="tel"
                type="tel"
                fullWidth
                size="small"
                value={medical?.emergencyContact?.phonenumber}
              />
            </CustomFormControl>

            <CustomFormControl>
              <TextField
                label="Address"
                fullWidth
                size="small"
                row={3}
                maxRows={3}
                value={medical?.emergencyContact?.address}
              />
            </CustomFormControl>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

MedicalInformationEdit.propTypes = {};

export default MedicalInformationEdit;
