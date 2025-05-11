var times = require('./string-multiply'),
    write = require('./write'),
    path = require('path');

module.exports = function (context) {
  var exts = {},
      dirColor = '',
      exeColor = '',
      parts,
      colors = [],
      subparts;
  if (context.LS_COLORS) colors = context.LS_COLORS.split(':');
  colors.forEach(function (v) {
    parts = /(^.*)=(.*$)/.exec(v);
    if (parts) {
      if (subparts = /\*(.*$)/.exec(parts[1])) {
        exts[subparts[1]] = '\x1b[' + parts[2] + 'm';
      } else if (parts[1] === 'di') dirColor = '\x1b[' + parts[2] + 'm';
      else if (parts[1] === 'ex') exeColor = '\x1b[' + parts[2] + 'm';
    }
  });
  return function printPossibles (possibles) {
    var realPossibles = possibles;
    var possibles = {
      files: realPossibles.files.slice(),
      executables: realPossibles.executables.slice(),
      directories: realPossibles.directories.slice(),
      js: []
    };
    realPossibles.js.forEach(function (v) {
      this.push(v.slice());
    }, possibles.js);
    possibles.js.reverse();
    var breakBeforeJs = possibles.directories.length + possibles.executables.length + possibles.files.length > 0 && possibles.js.reduce(function (r, v) { return r + v.length; }, 0) > 0;
    var println = possibles.js.reduce(function (r, v) { return r + v.length }, 0) + possibles.executables.length + possibles.directories.length + possibles.files.length > 1,
        cursor = 0,
        max,
        largest = Object.keys(possibles).reduce(function (r, v) {
          var arr = [];
          if (v !== 'js') {
            possibles[v].forEach(function (v) {
              arr.push(v.length);
            });
          } else {
            possibles[v].forEach(function (v) {
              v.forEach(function (v) {
                arr.push(v.length);
              });
            });
          }
          var max = Math.max.apply(void 0, arr);
          return max > r ? max: r;
        }, 0),
        cols = Math.floor(process.stdout.columns/largest),
        width = process.stdout.columns/cols;
    if (println) {
      write('\n');
      while (possibles.directories[0]) {
        max = Math.max(width - possibles.directories[0].length, 2);
        if (max + possibles.directories[0].length + 1 + cursor > process.stdout.columns) {
          write('\n');
          cursor = 0;
        }
        write(dirColor + possibles.directories[0] + '\x1b[m/' + times(' ', max));
        cursor += possibles.directories[0].length + max + 1;
        possibles.directories.splice(0, 1);
      }
      while (possibles.executables[0]) {
        max = Math.max(width - possibles.executables[0].length, 2);
        if (max + possibles.executables[0].length + 1 + cursor > process.stdout.columns) {
          write('\n');
          cursor = 0;
        }
        write(exeColor + possibles.executables[0] + '\x1b[m' + times(' ', max));
        cursor += possibles.executables[0].length + max;
        possibles.executables.splice(0, 1);
      }
      while (possibles.files[0]) {
        var fileColor = '';
        if (exts[path.extname(possibles.files[0])]) fileColor = exts[path.extname(possibles.files[0])];
        max = Math.max(width - possibles.files[0].length, 2);
        if (max + possibles.files[0].length + 1 + cursor > process.stdout.columns) {
          write('\n');
          cursor = 0;
        }
        write(fileColor + possibles.files[0] + '\x1b[m' + times(' ', max));
        cursor += possibles.files[0].length + max;
        possibles.files.splice(0, 1);
      }
      cursor = 0;
      var first = true;
      while (possibles.js[0]) {
        if (possibles.js[0].length) {
          if (first) {
            if (breakBeforeJs) write('\n\n');
          } else write('\n\n');
          first = false;
          while (possibles.js[0][0]) {
            max = Math.max(width - possibles.js[0][0].length, 2);
            if (max + possibles.js[0][0].length + 1 + cursor > process.stdout.columns) {
             write('\n');
             cursor = 0;
            }
            write(possibles.js[0][0] + times(' ', max));
            cursor += possibles.js[0][0].length + max;
            possibles.js[0].splice(0, 1);
          }
        }
        possibles.js.splice(0, 1);
      }
      if (println) write('\n');
    }
  }
}
