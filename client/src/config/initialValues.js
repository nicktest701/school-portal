import {
  messageValidationSchema,
  onlyEmailValidationSchema,
  onlyPhoneValidationSchema,
} from './validationSchema';

const session = JSON.parse(localStorage.getItem('@school_session'));

//session
export const sessionInitialValues = {
  from: '',
  to: '',
  term: '',
  academicYear: '',
  vacationDate: '',
  reOpeningDate: '',
};

export const levelInitialValues = {
  level: '',
  type: '',
  subjects: [],
  teacher: { _id: '', fullName: '' },
};

//student
export const studentInitialValues = {
  firstname: '',
  surname: '',
  othername: '',
  dateofbirth: '',
  gender: 'male',
  email: '',
  phonenumber: '',
  address: '',
  residence: '',
  nationality: '',
  session: session,
};

// medical
export const medicalInitialValues = {
  heartDisease: 'No',
  asthma: 'No',
  siezures: 'No',
  visualImpairment: 'No',
  hearingImpairment: 'No',
  physicalDisability: 'No',
  emergencyContact: {
    fullname: '',
    phonenumber: '',
    address: '',
  },
};
export const academicInitialValues = {
  level: {
    _id: '',
    type: '',
  },
  previousSchool: {
    name: '',
    location: '',
  },
};

//student
export const teacherInitialValues = {
  profile: null,
  firstname: '',
  surname: '',
  username: '',
  dateofbirth: '',
  gender: '',
  email: '',
  phonenumber: '',
  address: '',
  residence: '',
  nationality: '',
};

//student
export const userInitialValues = {
  profile: null,
  fullname: '',
  username: '',
  dateofbirth: '',
  gender: '',
  role: '',
  email: '',
  phonenumber: '',
  address: '',
  residence: '',
  nationality: '',
  password: '',
  confirmPassword: '',
};

//parent
export const parentInitialValues = {
  parent1: {
    firstname: '',
    surname: '',
    gender: '',
    relationship: '',
    email: '',
    phonenumber: '',
    address: '',
    residence: '',
    nationality: '',
  },
  parent2: {
    firstname: '',
    surname: '',
    gender: '',
    relationship: '',
    email: '',
    phonenumber: '',
    address: '',
    residence: '',
    nationality: '',
  },
};

//sms
export const quickMessageInitialValues = (radioValue) => {
  switch (radioValue) {
    case 'sms':
      return {
        init: {
          type: radioValue,
          phonenumber: '',
          title: '',
          message: '',
        },
        val: onlyPhoneValidationSchema,
      };
    case 'email':
      return {
        init: {
          type: radioValue,
          title: '',
          email: '',
          message: '',
        },
        val: onlyEmailValidationSchema,
      };

    default:
      return {
        init: {
          type: radioValue,
          title: '',
          email: '',
          message: '',
          phonenumber: '',
        },
        val: messageValidationSchema,
      };
  }
};

export const bulkMessageInitialValues = {
  title: '',
  message: '',
};
