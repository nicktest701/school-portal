import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomRadioInput from "@/components/items/CustomRadioInput";
import Input from "@/components/inputs/Input";

const MedicalInformation = ({ control, errors, watch, setValue }) => {
  console.log(errors);
  return (
    <Stack padding={2} spacing={1}>
      <Typography variant="body2" color="primary.main">
        (Kindly note that this section, even though required, will not affect
        your child’s admission into the school).
      </Typography>
      <Stack width={{ xs: "100%", md: "80%" }} py={5}>
        {[
          { title: "1. Heart Disease", name: "medical.heartDisease" },
          { title: "2. Visual Impairment", name: "medical.visualImpairment" },
          { title: "3. Asthma", name: "medical.asthma" },
          {
            title: "4. Hearing Impairment",
            name: "medical.hearingImpairment",
          },
          { title: "5. Seizures", name: "medical.seizures" },
          {
            title: "6. Physical Disability",
            name: "medical.physicalDisability",
          },
        ].map(({ title, name }) => (
          <CustomRadioInput
            key={title}
            control={control}
            title={title}
            name={name}
          />
        ))}
      </Stack>
      <Stack py={2} spacing={1}>
        <Typography
          variant="body2"
          color="primary.main"
          sx={{ fontWeight: "bold" }}
        >
          Emergency Contact
        </Typography>
        <Input
          size="small"
          label="Fullname"
          name="medical.emergencyContact.fullname"
          control={control}
        />
        <Input
          size="small"
          label="Telephone No."
          name="medical.emergencyContact.phonenumber"
          control={control}
        />
        <Input
          size="small"
          label="Address"
          name="medical.emergencyContact.address"
          control={control}
        />
      </Stack>
    </Stack>
  );
};

export default MedicalInformation;
