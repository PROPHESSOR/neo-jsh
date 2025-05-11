var tty = require('tty');

// ANSI color codes
const codes = {
  // Text colors
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  // Background colors
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,
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
    return `\x1b[${codes[key]}m${str}\x1b[0m`;
  };
});

// Add some common combinations
Color.error = function(str) {
  return Color.red(str);
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
  return Color.bold(str);
};

module.exports = Color;