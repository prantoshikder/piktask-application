const dark = "#143340";
const blue = "#0088f2";

/**
 * Ant Design theme configuration.
 *
 * Only the tokens Ant needs to render in the project's palette live here. All
 * the layout and typography values that used to be in the MUI theme now live in
 * the Tailwind classes on each component, so there is nothing else to carry.
 *
 * The screen tokens match the breakpoints the design was authored against
 * (Ant's defaults are 576/768/992/1200/1600, which would shift responsive
 * behaviour in Ant's own components).
 */
const theme = {
  token: {
    colorPrimary: blue,
    colorLink: blue,
    colorText: dark,
    colorTextHeading: dark,
    fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    borderRadius: 4,

    screenXS: 480,
    screenXSMin: 480,
    screenSM: 960,
    screenSMMin: 960,
    screenMD: 1280,
    screenMDMin: 1280,
    screenLG: 1540,
    screenLGMin: 1540,
    screenXL: 1920,
    screenXLMin: 1920,
  },
};

export default theme;
