# jsh - The JavaScript Shell
![Build Passing](https://travis-ci.org/raypulver/jsh.svg)

jsh is a UNIX command-line shell which sits on top of both Node.js and sh, allowing you to simultaneously execute JavaScript and shell commands. It is fully compatible with Node modules, and preloads all the built-in Node modules at initialization (just like in the Node REPL), as well as any modules in ~/.jsh/node_modules, automatically converting to camel-case where necessary. Any all-caps environment variables are added to the global scope at start, and anything in the global scope is passed in as an environment variable to processes started by jsh.

In shell commands, you can use the $ character to substitute a variable from the JavaScript environment. Alternatively you can surround any JavaScript expression in brackets and precede it with a $ character to perform substitutions. Use brackets whenever your JavaScript expression contains a non-word character, like a . or " character.

jsh checks to see if the first word in an expression is an executable, or else it executes it as JavaScript, so if you have executables named "var" or "function" in your PATH, you're gonna have a bad time!

## Installation:

```
$ npm install -g jsh
```

## Examples:
```
$ var p = './dir';
$ if (fs.existsSync(p))
.. fs.readdirSync(p).forEach(function (v) {
.... echo $v
.... });
```

This will echo the filenames of all the files in ./dir

Of course, you can also execute shell commands from within JavaScript functions:

```
$ function moveOut (v) {
.. mv $v ../
.. console.log(v + ' has been moved to the parent directory.');
.. }
$ moveOut('file')
```

An example with brackets:
```
$ function removetxt (v) {
.. rm ${v + '.txt'}
.. }
```

jsh comes with full tab-completion. You can press tab multiple times to cycle through possible completions, or use the up and down arrows to navigate the list.

TIP: When cycling through directories, if you want to choose a directory and start autocompleting through that directory without typing a character, you can first press any sequence that does not print a character, such as CTRL-T, to reset the tab counter. Then you can start pressing tab to cycle through subdirectories.

You can preload JavaScript in your jsh environment by adding it to your .jshrc, in your home folder. jsh will automatically create this file the first time it is run.

You can write jsh scripts by starting a script with ```#!/usr/bin/env jsh```. The .jshrc file is still executed by the VM prior to script execution, and remember that all the built-in node modules are already loaded in the environment!

When the shell is run interactively, the last returned value is stored in the _ variable, just like in the Node REPL.

## Coming soon (in no particular order)

1. An "include" command
2. --coffee flag for CoffeeScript mode
3. Backtick substitution, e.g. var files = \`ls\`.split('\n')

### Known Bugs

jsh now works properly in tmux (thanks nicm)

No other known bugs. jsh is still in infancy so please report any bugs you find, either here or to me personally. Reach out to me for any reason on Freenode IRC, @raypulver (I'm always on).

## Usage Guide

### Discover the Power of Ghost Suggestions
- As you type, watch as ghostly hints appear in gray, guiding you with suggestions from your command history. Just press the right arrow key to accept a suggestion and save time.

### Effortless Tab Completion
- Need to find a file or command? Just hit Tab! Cycle through options with ease. Ghost suggestions and tab completions work together seamlessly, but you'll only see one at a time, keeping things neat and tidy.

### Printing Values
- If you need to display some value, whether you're using `console.log` or our new `print` function, your messages will always appear right in the shell.

#### Example:
```js
> print('Hello, world!')
Hello, world!
> console.log('Hello, world!')
Hello, world!
```

### Color Output
- You can force color output in your shell by setting the `FORCE_COLOR` environment variable. Set it to 1 to enable colors and to 0 to disable them. When not set, we will check if your terminal supports color. This ensures that all outputs are colorized.
