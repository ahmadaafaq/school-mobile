/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

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
  }
};

export { FONT, ALIGNMENT, SIZES, SHADOWS };
