import { object, number, string, array, ref, date } from 'yup';

export const loginUserValidationSchema = object().shape({
  username: string().required('Required*').trim(),
  password: string()
    .trim()
    .required('Required*')
    .min(8, 'password should be between 8-20 characters'),
});
export const sessionValidationSchema = object().shape({
  from: string().required('Required*'),
  to: string().required('Required*'),
  term: string().required('Required*'),
});

export const levelValidationSchema = object().shape({
  level: string().required('Required*'),
});

export const currentLevelValidationSchema = object().shape({
  _id: string().required('Required*'),
  type: string().required('Required*'),
});
export const assignLevelValidationSchema = object().shape({
  currentLevel: object({
    _id: string().required('Required*'),
    type: string().required('Required*'),
  }),
  subject: string().required('Required*'),
});

export const studentValidationSchema = object().shape({
  firstname: string().required('Required*'),
  surname: string().required('Required*'),
  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  gender: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string().matches(
    /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/,
    'Invalid Phone number'
  ),
  address: string().required('Required*'),
  residence: string().required('Required*'),
  nationality: string().required('Required*'),
  level: object({
    type: string().required('Required*'),
  }),
});

export const studentEditValidationSchema = object().shape({
  firstname: string().required('Required*'),
  surname: string().required('Required*'),
  // dateofbirth: date()
  //   .required('Required*')
  //   .max(new Date(), 'Date of birth cannot be in the future'),
  gender: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string().matches(
    /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/,
    'Invalid Phone number'
  ),
  address: string().required('Required*'),
  residence: string().required('Required*'),
  nationality: string().required('Required*'),
});

export const teacherValidationSchema = object().shape({
  firstname: string().required('Required*'),
  surname: string().required('Required*'),
  username: string()
    .required('Required*')
    .min(3, 'Username Should be between 3-20 characters')
    .max(20, 'Username Should be between 3-20 characters'),
  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  gender: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string()
    .required('Required*')
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
  address: string().required('Required*'),
  residence: string().required('Required*'),
  nationality: string().required('Required*'),
});

export const userValidationSchema = object().shape({
  fullname: string().required('Required*'),
  username: string().required('Required*'),

  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  role: string().required('Required*'),
  gender: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string()
    .required('Required*')
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
  address: string().required('Required*'),
  nationality: string().required('Required*'),
  residence: string().required('Required*'),
  password: string()
    .required('Required*')
    .min(8, 'Password should be between 8-15 characters long'),
  confirmPassword: string()
    .required('Required*')
    .min(8, 'Password should be between 8-15 characters long')
    .oneOf([ref('password'), null], 'Passwords do not match'),
});
export const userResetPasswordValidationSchema = object().shape({
  password: string()
    .required('Required*')
    .min(8, 'Password should be between 8-15 characters long'),
  confirmPassword: string()
    .required('Required*')
    .min(8, 'Password should be between 8-15 characters long')
    .oneOf([ref('password'), null], 'Passwords do not match'),
});
export const updateProfileValidationSchema = object().shape({
  fullname: string().required('Required*'),
  username: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string()
    .required('Required*')
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
  password: string().min(8, 'Password should be between 8-15 characters long'),
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords do not match'
  ),
});

export const userEditValidationSchema = object().shape({
  fullname: string().required('Required*'),
  username: string().required('Required*'),

  // dateofbirth: date()
  //   .required("Required*")
  //   .max(new Date(), "Date of birth cannot be in the future"),
  role: string().required('Required*'),
  gender: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string()
    .required('Required*')
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
  address: string().required('Required*'),
  nationality: string().required('Required*'),
  residence: string().required('Required*'),
});

export const parentValidationSchema = object().shape({
  firstname: string().required('Required*'),
  surname: string().required('Required*'),
  gender: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string()
    .required('Required*')
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
  address: string().required('Required*'),
  residence: string().required('Required*'),
  nationality: string().required('Required*'),
});

export const feeValidationSchema = object().shape({
  level: object({
    _id: string().required('Required*'),
    type: string().required('Required*'),
  }),
  fee: array().required('Required*').min(1, 'Fee list Cannot be empty'),
});

export const messageValidationSchema = object().shape({
  email: string().required('Required*').email('Invalid email address!!!'),
  phonenumber: string()
    .required('Required*')
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
  title: string().required('Required*'),
  message: string().required('Required*'),
});

export const onlyEmailValidationSchema = object().shape({
  email: string().required('Required*').email('Invalid email address!!!'),
  title: string().required('Required*'),
  message: string().required('Required*'),
});

export const onlyPhoneValidationSchema = object().shape({
  phonenumber: string()
    .required('Required*')
    .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
  title: string().required('Required*'),
  message: string().required('Required*'),
});

export const bulksmsValidationSchema = object().shape({
  title: string().required('Required*'),
  message: string().required('Required*'),
});

export const quickMessageValidationSchema = object().shape({
  title: string().required('Required*'),
  message: string().required('Required*'),
});

export const examsScoreValidationSchema = object().shape({
  subject: string().required('Subject is Required*').nullable(true),
  classScore: number()
    .required('Subject is Required*')
    .min(0, 'Class Score should be between 0-50')
    .max(50, 'Class Score should be between 0-50'),
  examsScore: number()
    .required('Subject is Required*')
    .min(0, 'Exams Score should be between 0-50')
    .max(50, 'Exams Score should be between 0-50'),
});

//Personal Data
export const studentPersonalDataValidationSchema = object().shape({
  indexnumber: string().required('Required*'),
  firstname: string().required('Required*'),
  surname: string().required('Required*'),
  gender: string().required('Required*'),
  email: string().email('Invalid email address!!!'),
  phonenumber: string().matches(
    /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/,
    'Invalid Phone number'
  ),
  address: string().required('Required*'),
  residence: string().required('Required*'),
  nationality: string().required('Required*'),
});

export const guardianValidationSchema = object().shape({
  parent1: object({
    firstname: string().required('Required*'),
    surname: string().required('Required*'),
    gender: string().required('Required*'),
    relationship: string().required('Required*'),
    email: string().email('Invalid email address!!!'),
    phonenumber: string()
      .required('Required*')
      .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
    address: string().required('Required*'),
    residence: string().required('Required*'),
    nationality: string().required('Required*'),
  }),
  parent2: object({
    firstname: string().required('Required*'),
    surname: string().required('Required*'),
    gender: string().required('Required*'),
    relationship: string().required('Required*'),
    email: string().email('Invalid email address!!!'),
    phonenumber: string()
      .required('Required*')
      .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
    address: string().required('Required*'),
    residence: string().required('Required*'),
    nationality: string().required('Required*'),
  }),
});

export const medicalValidationSchema = object().shape({
  emergencyContact: object({
    fullname: string().required('Required*'),
    phonenumber: string()
      .required('Required*')
      .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, 'Invalid Phone number'),
    address: string().required('Required*'),
  }),
});

export const studentCurrentLevelValidationSchema = object().shape({
  level: object({
    _id: string().required('Required*'),
    type: string().required('Required*'),
  }),
});

export const gradesValidationSchema = object().shape({
  lowestMark: number()
    .required('Required*')
    .min(0, 'Marks cannot be less than 0')
    .max(100, 'Marks cannot be more than 100'),
  highestMark: number()
    .required('Required*')
    .min(0, 'Marks cannot be less than 0')
    .max(100, 'Marks cannot be more than 100'),
  grade: string().trim().required('Required*'),
  remarks: string().trim().required('Required*'),
});



export const eventValidationSchema = object().shape({

  type: string().trim().required('Required*'),
  title: string().trim().required('Required*'),
  description: string().trim().required('Required*'),

});
