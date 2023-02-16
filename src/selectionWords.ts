interface Word {
  text: string
  isSelected: boolean
}

class SelectionWords {
  private words: Word[]
  counterClick: number

  constructor() {
    this.words = [{ text: "", isSelected: false }];
    this.counterClick = 0;
  }

  setWords(words: Word[]) {
    const wordFilter = this.filter(words);
    this.words = wordFilter;
  }

  getWords() {
    return this.words;
  }

  getFilteredWords() {
    return this.words
      .filter(word => word.isSelected)
      .map(word => word.text)
  }

  toggleSelected(wordText: string) {
    const index = this.words.findIndex(word => word.text === wordText)
    this.words[index] = {
      ...this.words[index],
      isSelected: !this.words[index]?.isSelected
    }
    const nodeListWords = document.querySelectorAll('.containerWord')
    nodeListWords.forEach(nodeWord => nodeWord.textContent === this.words[index].text
      && nodeWord.classList.toggle('containerWord--selected', this.words[index].isSelected))
  }

  filter(words: Word[]) {
    return words.filter(word => word.text.length > 2 && word.text !== "");
  }
  resetWords() {
    this.words = [{ text: "", isSelected: false }];
  }
  validation() {
    return this.words.some(selectedWord => {
      if (selectedWord.text === undefined) return false;
      return selectedWord.text !== "" && selectedWord.text !== " ";
    });
  }
}

export default SelectionWords;
