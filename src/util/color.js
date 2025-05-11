var tty = require('tty');

// ANSI color codes
const codes = {
  // Dark text colors
  darkBlack: 30,
  darkRed: 31,
  darkGreen: 32,
  darkYellow: 33,
  darkBlue: 34,
  darkMagenta: 35,
  darkCyan: 36,
  darkWhite: 37,
  // Bright text colors
  black: 90,
  red: 91,
  green: 92,
  yellow: 93,
  blue: 94,
  magenta: 95,
  cyan: 96,
  white: 97,
  // Dark background colors
  bgDarkBlack: 40,
  bgDarkRed: 41,
  bgDarkGreen: 42,
  bgDarkYellow: 43,
  bgDarkBlue: 44,
  bgDarkMagenta: 45,
  bgDarkCyan: 46,
  bgDarkWhite: 47,
  // Bright background colors
  bgBlack: 100,
  bgRed: 101,
  bgGreen: 102,
  bgYellow: 103,
  bgBlue: 104,
  bgMagenta: 105,
  bgCyan: 106,
  bgWhite: 107,
  // Text styles
  reset: 0,
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  blink: 5,
  inverse: 7,
  hidden: 8,
  strikethrough: 9
};

// Check if terminal supports colors
const isColorSupported = process.env.FORCE_COLOR !== '0' &&
  (process.env.FORCE_COLOR === '1' ||
   (process.stdout.isTTY && process.env.TERM !== 'dumb'));

// Create color functions
const Color = {};

Object.keys(codes).forEach(key => {
  Color[key] = function(str) {
    if (!isColorSupported) return str;
    if (!str) return `\x1b[${codes[key]}m`;
    return `\x1b[${codes[key]}m${str}\x1b[0m`;
  };
});

// Add some common combinations
Color.error = function(str) {
  return Color.bold(Color.red(str));
};

Color.success = function(str) {
  return Color.green(str);
};

Color.warning = function(str) {
  return Color.yellow(str);
};

Color.info = function(str) {
  return Color.blue(str);
};

Color.highlight = function(str) {
  return Color.bgWhite(Color.black(str));
};

module.exports = Color;