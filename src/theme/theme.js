/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

const COLORS = {
  indigo: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632"
  },
  black: {
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#434957",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509"
  },
  white: {
    100: "#ffffff",
    200: "#ffffff",
    300: "#ffffff",
    400: "#ffffff",
    500: "#ffffff",
    600: "#cccccc",
    700: "#999999",
    800: "#666666",
    900: "#333333"
  },
  green: {
    100: "#dbf5ee",
    200: "#b7ebde",
    300: "#94e2cd",
    400: "#70d8bd",
    500: "#4cceac",
    600: "#3da58a",
    700: "#2e7c67",
    800: "#1e5245",
    900: "#0f2922"
  },
  red: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f"
  },
  maroon: {
    100: "#e6cccc",
    200: "#cc9999",
    300: "#b36666",
    400: "#993333",
    500: "#800000",
    600: "#660000",
    700: "#4d0000",
    800: "#330000",
    900: "#1a0000"
  },
  yellow: {
    100: "#fff7cc",
    200: "#ffef99",
    300: "#ffe766",
    400: "#ffdf33",
    500: "#ffd700",
    600: "#ccac00",
    700: "#998100",
    800: "#665600",
    900: "#332b00"
  },
  lavender: {
    100: "#fafafe",
    200: "#f5f5fd",
    300: "#f0f0fc",
    400: "#ebebfb",
    500: "#e6e6fa",
    600: "#b8b8c8",
    700: "#8a8a96",
    800: "#5c5c64",
    900: "#2e2e32"
  },
  lightBlue: "#E9F1FA",
  brightBlue: "#00ABE4",

  tealBlue: "#388087",
  moonstoneBlue: "#6FB3B8",
  powderBlue: "#BADFE7",
  magicMint: "#C2EDCE",
  whiteSmoke: "#F6F6F2",
  whiteSnow: "#FAFAFB",
  spanishPink: "#EFB7BA",
  dustPink: "#E5C0C8",
  soapBlue: "#CBD5F0",
  yaleBlue: "#194F92",

  primaryColor: "#CE135A",
  hotPink: "#FF69B4",
  lightPink: "#F0C4C1",
  extraLight: "#F9E0DC",
  anotherPink: "#fcebf1",
  blackish: "#303030"
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
  boldStyle: 'bold',
  capitalize: 'capitalize'
};

const ALIGNMENT = {
  centered: 'center',
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  rowDirection: 'row',
  columnDirection: 'column'
};

const SPACING = {};

const SIZES = {
  xSmall: 10,
  small: 12,
  smallMedium: 14,
  medium: 16,
  mediumLarge: 18,
  large: 20,
  xLarge: 24,
  xmLarge: 25,
  xxLarge: 30,
  xxxLarge: 40
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#999999",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, ALIGNMENT, SPACING, SIZES, SHADOWS };
