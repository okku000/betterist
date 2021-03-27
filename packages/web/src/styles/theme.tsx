import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  fonts: {
    body: "'My Body Font', sans-serif",
    heading: "'My Heading Font', sans-serif",
    mono: "'My Monospaced Font', monospace",
  },
  breakpoints,
});

export default theme;
