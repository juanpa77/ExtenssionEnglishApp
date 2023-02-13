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
  const isSelectionGreaterTwo = newSelection.length > 2;
  if (isSelectionGreaterTwo) selection.words = newSelection;
};

document.addEventListener("selectionchange", handleSelection);

document.addEventListener("click", e => {
  const isModalElement = e.target.classList.contains("modal");
  const isFirstClick = selection.counterClick === 0;
  const isInputElement = e.target.localName === "input" || e.target.localName === "textarea";
  console.log(e.target.localName);
  const isSelectionGreaterTwo = selection.words.length > 2;

  if (!isModalElement && !isFirstClick) removeModal();
  if (isSelectionGreaterTwo && !isInputElement) showModal(e);
});

const removeModal = () => {
  console.log("close Modal");
  selection.resetWords();
  selection.counterClick = 0;
  const modal = document.querySelector(".modal");
  if (modal === null) return;
  modal.remove();
};
const createModal = e => {
  const { positionX, positionY } = setModalPosition(e);
  const modal = createDiv("modal");
  modal.style.top = `${positionY}px`;
  modal.style.left = `${positionX}px`;
  return modal;
};

const containerWord = word => {
  const containerWord = document.createElement("div");
  containerWord.className = "containerWord";
  containerWord.textContent = word;
  return containerWord;
};

const showModal = e => {
  document.body.appendChild(createModal(e));
  const containerWord = createDiv("containerWord");
  const title = createDiv("wrapperTitle");
  title.textContent = "Add words to learn";
  containerWord.textContent = selection.words;

  appendElement("modal", title);
  appendElement("modal", containerWord);
  selection.counterClick++;
};

const setModalPosition = e => {
  const positionX = e.pageX;
  const positionY = e.pageY;
  return { positionX, positionY };
};
const handleCloseModal = e => {
  const isModalElement = e.target.classList.contains("modal");
  if (!isModalElement) removeModal();
  selection.resetWords();
};

const createDiv = className => {
  const div = document.createElement("div");
  div.className = className;
  return div;
};

const appendElement = (classNameParent, element) => {
  const parent = document.querySelector(`.${classNameParent}`);
  parent.appendChild(element);
};
