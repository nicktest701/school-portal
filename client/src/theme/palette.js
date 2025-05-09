import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#94a3b8',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#678298',
  light: '#345876',
  // main: '#1D2939',
  main: '#012E54',
  dark: '#012543',
  darker: '#011c32',
  primary: GREY[0],
  contrastText: GREY[0],
};

const SECONDARY = {
  lighter: '#ffd9c5',
  light: '#ffcdb2',
  main: '#ffc09f',
  dark: '#cc9a7f',
  darker: '#99735f',
  primary: GREY[0],
  contrastText: GREY[0],
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  primary: GREY[0],
  contrastText: GREY[0],
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#08660D',
  dark: '#229A16',
  darker: '#08660D',
  primary: GREY[0],
  contrastText: GREY[0],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  primary: GREY[0],
  contrastText: GREY[0],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#B72136',
  //  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  primary: GREY[0],
  contrastText: GREY[0],
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[700],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
     default: '#fff',
    //  default: '#F1F4FA',
    //  default: '#F2F4F7',
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
