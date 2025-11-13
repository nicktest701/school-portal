import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { UserContext } from "@/context/providers/UserProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { putSchool } from "@/api/schoolAPI";
import CustomFormControl from "@/components/inputs/CustomFormControl";
import * as yup from "yup";
import { REGIONS } from "@/mockup/data/regions";

// ✅ Define validation schema
const schema = yup.object().shape({
  name: yup.string().required("School name is required"),
  address: yup.string().required("Address is required"),
  location: yup.string().required("Address Line 2 is required"),
  region: yup.string().required("Region is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address")
    .nullable(),
  website: yup.string().url("Invalid website URL").nullable(),
  phonenumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[\d\s-]+$/,
      "Only numbers and dashes (-) allowed, e.g. 0244123456 - 0209876543"
    ),
  motto: yup.string().nullable(),
});

const BasicInformation = () => {
  const { school_info } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({ mutationFn: putSchool });

  // ✅ Initialize React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      _id: "",
      name: "",
      address: "",
      location: "",
      region: "",
      email: "",
      website: "",
      phonenumber: "",
      motto: "",
    },
  });

  // ✅ Reinitialize form when school_info changes
  useEffect(() => {
    if (school_info) {
      reset(school_info);
    }
  }, [school_info, reset]);

  // ✅ Submit handler
  const onSubmit = async (values) => {
    try {
      const response = await mutateAsync(values);

      localStorage.setItem("@school_info", JSON.stringify(response));
      queryClient.invalidateQueries(["school"]);
      schoolSessionDispatch(alertSuccess("Changes Saved"));
      reset(response);
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
  };

  return (
    <Container sx={{ borderRadius: "12px", bgcolor: "#fff", p: 2 }}>
      <Box sx={{ placeSelf: "start" }}>
        <Typography variant="h6" color="primary">
          Basic Information
        </Typography>
        <Typography variant="caption" color="text.secondary" fontStyle="italic">
          Update your school&apos;s fundamental details.
        </Typography>
        <Divider />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} pt={4}>
          {/* School Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="School Name"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Motto */}
          <Controller
            name="motto"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Motto/Tagline"
                size="small"
                fullWidth
                error={!!errors.motto}
                helperText={errors.motto?.message}
              />
            )}
          />

          {/* Address */}
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 1"
                size="small"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />

          {/* Location */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Line 2 (GPS)"
                size="small"
                fullWidth
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />

          <Autocomplete
            freeSolo
            fullWidth
            size="small"
            options={REGIONS}
            getOptionLabel={(option) => option || ""}
            value={watch("region") || ""}
            onInputChange={(_, value) => setValue("region", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Region"
                fullWidth
                size="small"
                error={Boolean(errors.region)}
                helperText={errors.region?.message}
              />
            )}
          />

          {/* Email + Website */}
          <CustomFormControl>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  size="small"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Website"
                  size="small"
                  fullWidth
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              )}
            />
          </CustomFormControl>

          {/* Phone Number */}
          <Controller
            name="phonenumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number(s)"
                size="small"
                fullWidth
                placeholder="e.g. 0244192831 - 0233847287"
                error={!!errors.phonenumber}
                helperText={
                  errors.phonenumber?.message ||
                  'Separate multiple phone numbers with " - "'
                }
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Saving..." : "Save Settings"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default BasicInformation;

// import {
//   Box,
//   Container,
//   Divider,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Formik } from "formik";
// import React, { useContext } from "react";
// import Button from "@mui/material/Button";
// import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
// import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { UserContext } from "@/context/providers/UserProvider";
// import CustomFormControl from "@/components/inputs/CustomFormControl";
// import { putSchool } from "@/api/schoolAPI";

// function BasicInformation() {
//   const { school_info } = useContext(UserContext);
//   const { schoolSessionDispatch } = useContext(SchoolSessionContext);
//   const queryClient = useQueryClient();

//   const { mutateAsync } = useMutation({
//     mutationFn: putSchool,
//   });

//   const onSubmit = (values, options) => {
//     // return
//     mutateAsync(values, {
//       onSettled: () => {
//         options.setSubmitting(false);
//         queryClient.invalidateQueries(["school"]);
//       },
//       onSuccess: (data) => {
//         localStorage.setItem("@school_info", JSON.stringify(data));
//         schoolSessionDispatch(alertSuccess("Changes Saved"));
//       },
//       onError: (error) => {
//         schoolSessionDispatch(alertError(error));
//       },
//     });
//   };

//   return (
//     <Container
//       sx={{
//         borderRadius: "12px",
//         bgcolor: "#fff",
//         p: 2,
//       }}
//     >
//       <Box sx={{ placeSelf: "start" }}>
//         <Typography variant="h6" color="primary">
//           Basic Information
//         </Typography>
//         <Typography variant="caption" color="text.secondary" fontStyle="italic">
//           Update your school&apos;s fundamental details.
//         </Typography>
//         <Divider />
//       </Box>
//       <Formik
//         initialValues={{
//           _id: school_info?._id,
//           name: school_info?.name,
//           address: school_info?.address,
//           location: school_info?.location,
//           email: school_info?.email,
//           website: school_info?.website,
//           phonenumber: school_info?.phonenumber,
//           motto: school_info?.motto,
//         }}
//         onSubmit={onSubmit}
//         enableReinitialize={true}
//       >
//         {({
//           values,
//           errors,
//           touched,

//           handleChange,
//           handleSubmit,

//           isSubmitting,
//         }) => {
//           return (
//             <>
//               <Stack spacing={3} pt={4}>
//                 <TextField
//                   label="School Name"
//                   placeholder="School Name"
//                   type="text"
//                   fullWidth
//                   size="small"
//                   value={values?.name}
//                   onChange={handleChange("name")}
//                   error={Boolean(touched.name && errors.name)}
//                   helperText={touched.name && errors.name}
//                 />
//                 <TextField
//                   label="Address"
//                   placeholder="Address"
//                   type="text"
//                   fullWidth
//                   size="small"
//                   value={values?.address}
//                   onChange={handleChange("address")}
//                   error={Boolean(touched.address && errors.address)}
//                   helperText={touched.address && errors.address}
//                 />
//                 <TextField
//                   label="Location"
//                   placeholder="Location"
//                   type="text"
//                   fullWidth
//                   size="small"
//                   value={values?.location}
//                   onChange={handleChange("location")}
//                   error={Boolean(touched.location && errors.location)}
//                   helperText={touched.location && errors.location}
//                 />
//                 <CustomFormControl>
//                   <TextField
//                     label="Email Address"
//                     placeholder="Email Address"
//                     type="email"
//                     inputMode="email"
//                     fullWidth
//                     size="small"
//                     value={values?.email}
//                     onChange={handleChange("email")}
//                     error={Boolean(touched.email && errors.email)}
//                     helperText={touched.email && errors.email}
//                   />
//                   <TextField
//                     label="Website"
//                     placeholder="Website"
//                     type="text"
//                     fullWidth
//                     size="small"
//                     value={values?.website}
//                     onChange={handleChange("website")}
//                     error={Boolean(touched.website && errors.website)}
//                     helperText={touched.website && errors.website}
//                   />
//                 </CustomFormControl>
//                 <TextField
//                   label="Phone Number"
//                   placeholder="e.g. 0244192831-0233847287"
//                   type="text"
//                   fullWidth
//                   size="small"
//                   value={values?.phonenumber}
//                   onChange={handleChange("phonenumber")}
//                   error={Boolean(touched.phonenumber && errors.phonenumber)}
//                   helperText={
//                     touched.phonenumber && errors.phonenumber
//                       ? errors.phonenumber
//                       : 'Separate multiple phone numbers with " - "'
//                   }
//                 />
//                 <TextField
//                   label="Motto"
//                   placeholder="Motto"
//                   type="text"
//                   fullWidth
//                   size="small"
//                   value={values?.motto}
//                   onChange={handleChange("motto")}
//                   error={Boolean(touched.motto && errors.motto)}
//                   helperText={touched.motto && errors.motto}
//                 />

//                 <Button
//                   loading={isSubmitting}
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSubmit}
//                 >
//                   Save Settings
//                 </Button>
//               </Stack>
//             </>
//           );
//         }}
//       </Formik>
//     </Container>
//   );
// }

// export default BasicInformation;
