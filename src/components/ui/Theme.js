import { createTheme } from "@mui/material/styles";

const dark = "#143340";
const lightDark = "#1B3F4E";
// const green = "#117A00";

const green = "#76C71A";
const blue = "#0088f2";
const lightBlack = "#14323F";

const theme = createTheme({
  breakpoints: {
    // NOTE: these are the project's original v4 values. `xl` had no explicit
    // value under MUI v4; v5+ requires every key in the scale to be defined,
    // so it is added here above `lg`.
    values: {
      xs: 480,
      sm: 960,
      md: 1280,
      lg: 1540,
      xl: 1920,
    },
  },
  components: {
    // v4 `overrides.MuiTypography.body1` -> v5+ `components.MuiTypography.styleOverrides.body1`
    MuiTypography: {
      styleOverrides: {
        body1: {
          margin: 0,
        },
      },
    },
  },
  palette: {
    primary: {
      main: dark,
      light: blue,
    },
    secondary: {
      main: blue,
      light: green,
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      color: dark,
    },
    h2: {
      fontWeight: 500,
      fontSize: "2.2rem",
      lineHeight: 1.5,
      color: dark,
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.8rem",
      color: dark,
    },
    body1: {
      fontSize: "1.4rem",
      color: dark,
      fontWeight: 400,
    },
    button: {
      color: "#fff",
      fontWeight: 400,
      fontFamily: "'Roboto', sans-serif",
      textTransform: "capitalize",
      fontSize: "1.5rem",
      borderRadius: "3rem",
      opacity: 1,
    },
    // Non-standard keys the app spreads into makeStyles rules
    // (e.g. `...theme.typography.darkButton`). Kept as-is.
    secondary: {
      blue,
    },
    colors: {
      lightDarkColor: lightDark,
      lightBlackColor: lightBlack,
    },
    darkButton: {
      background: lightDark,

      "&:hover": {
        background: green,
      },
    },
  },
});

export default theme;
