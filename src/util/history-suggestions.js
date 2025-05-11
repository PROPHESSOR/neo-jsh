class HistorySuggestions {
  constructor(history = []) {
    this.history = history;
    this.currentIndex = -1;
  }

  addToHistory(command) {
    if (command.trim()) {
      this.history.unshift(command);
      this.currentIndex = -1;
    }
  }

  getSuggestion(currentInput) {
    if (!currentInput) return '';

    // Find the most recent command that starts with the current input
    const suggestion = this.history.find(cmd =>
      cmd !== currentInput && cmd.startsWith(currentInput)
    );

    if (suggestion) {
      return suggestion.slice(currentInput.length);
    }
    return '';
  }

  getNextHistory() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return '';
  }

  getPreviousHistory() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    } else if (this.currentIndex === 0) {
      this.currentIndex = -1;
      return '';
    }
    return '';
  }

  resetIndex() {
    this.currentIndex = -1;
  }
}

module.exports = HistorySuggestions;