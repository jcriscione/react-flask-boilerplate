

import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: "#2c2f43", //darkpurple
    primary2Color: "#333333", //footer bgColor
    primary3Color: "#b5b4c2", //fontcolor for darkpurple
    accent1Color: "#ffba00", //highlightColor
    accent2Color: "#fff",
    accent3Color: "rgb(105, 108, 111)", //fontcolor
    accent4Color: "#838689", //inactive fontcolor
    canvasColor:"#eceef2",
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    textColorDarker: "rgb(49, 128, 206)",
    borderColor: Colors.grey300,
    disabledColor: Colors.darkBlack,
    pickerHeaderColor: Colors.cyan500,
  }
};