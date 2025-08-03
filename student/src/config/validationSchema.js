import * as yup from "yup";
const phoneRegex = /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/;

export const loginSchema = yup.object({
  studentId: yup.string().required("Student ID is required"),
  password: yup.string().required("Password is required"),
});


export const resetSchema = yup.object({
  studentId: yup.string().required("Student ID is required"),
});

export const confirmCodeSchema = yup.object({
  code: yup.string().required("Verification code is required"),
});

export const newPasswordSchema = yup.object({
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});

export const studentEditValidationSchema = yup.object().shape({
  firstname: yup.string().required("Required*"),
  surname: yup.string().required("Required*"),
  // dateofbirth: date()
  //   .required('Required*')
  //   .max(new Date(), 'Date of birth cannot be in the future'),
  gender: yup.string().required("Required*"),
  email: yup.string().email("Invalid email address!!!"),
  phonenumber: yup.string().matches(phoneRegex, "Invalid Phone number"),
  address: yup.string().required("Required*"),
  residence: yup.string().required("Required*"),
  nationality: yup.string().required("Required*"),
});
