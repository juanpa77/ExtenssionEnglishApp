class SelectionWords {
  constructor() {
    this.words = "";
    this.counterClick = 0;
  }

  /**
   * @param {string} word
   */
  set words(word) {
    this._words = word;
  }

  get words() {
    return this._words;
  }

  resetWords() {
    this._words = "";
  }
}

const selection = new SelectionWords();

const handleSelection = e => {
  const newSelection = document.getSelection().toString();
  if (newSelection.length > 2) {
    selection.words = newSelection;
    console.log(selection.words);
  }
};

document.addEventListener("selectionchange", handleSelection);

document.addEventListener("click", e => {
  const isModalElement = e.target.classList.contains("modal");
  console.log(selection.words);
  if (!isModalElement && selection.counterClick !== 0) removeModal();
  if (selection.words.length > 2) showModal(e);
});

const removeModal = () => {
  console.log("close Modal");
  selection.resetWords();
  selection.counterClick = 0;
  const modal = document.querySelector(".modal");
  if (modal === null) return;
  modal.remove();
  // document.removeEventListener("click", handleCloseModal);
};
const createModal = e => {
  const { positionX, positionY } = setModalPosition(e);
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style.top = `${positionX}px`;
  modal.style.right = `${positionY}px`;
  return modal;
};

const showModal = e => {
  document.body.appendChild(createModal(e));
  selection.counterClick++;
};

const setModalPosition = e => {
  const positionX = e.pageX;
  const positionY = e.pageY;
  console.log(e);
  return { positionX, positionY };
};
const handleCloseModal = e => {
  const isModalElement = e.target.classList.contains("modal");
  if (!isModalElement) removeModal();
  selection.resetWords();
};
