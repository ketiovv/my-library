const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  //https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=DD2C00
  material: {
    white: "#fff",
    black: "#000",
    primary:"#f57f17",
    dark:"#bc5100",
    light: "#ffb04c"
  },
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
