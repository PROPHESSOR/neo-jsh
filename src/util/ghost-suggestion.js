const Color = require('./color');

class GhostSuggestion {
  constructor() {
    this.suggestion = '';
    this.isActive = false;
    this.originalLine = '';
    this.originalCursor = 0;
  }

  setSuggestion(suggestion) {
    this.suggestion = suggestion;
    this.isActive = true;
  }

  clear() {
    this.suggestion = '';
    this.isActive = false;
    this.originalLine = '';
    this.originalCursor = 0;
  }

  saveState(line, cursor) {
    this.originalLine = line;
    this.originalCursor = cursor;
  }

  getDisplaySuggestion() {
    if (!this.isActive || !this.suggestion) return '';
    return Color.darkBlack(this.suggestion);
  }

  accept() {
    if (!this.isActive) return this.originalLine;
    return this.originalLine + this.suggestion;
  }

  isAvailable() {
    return this.isActive && this.suggestion.length > 0;
  }
}

module.exports = GhostSuggestion;