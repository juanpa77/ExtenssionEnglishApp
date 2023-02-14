export const showModal = (e, selection) => {
  document.body.appendChild(createModal(e));
  const backgroundModal = createDiv("backgroundModal");
  const title = createDiv("wrapperTitle");
  selection.words.map(word => {
    const containerWord = createDiv("containerWord");
    containerWord.classList.toggle("containerWord--selected", word.isSelected);
    containerWord.textContent = word.text;
    appendElement("modal", containerWord);
  });

  appendElement("modal", backgroundModal);
  appendElement("modal", title);
  title.textContent = "Add words to learn";
  selection.counterClick++;
};

export const appendElement = (classNameParent, element) => {
  const parent = document.querySelector(`.${classNameParent}`);
  parent.appendChild(element);
};

const createModal = e => {
  const { positionX, positionY } = setModalPosition(e);
  const modal = createDiv("modal");
  modal.style.top = `${positionY}px`;
  modal.style.left = `${positionX}px`;
  return modal;
};

const setModalPosition = e => {
  const positionX = e.pageX;
  const positionY = e.pageY;
  return { positionX, positionY };
};

const createDiv = className => {
  const div = document.createElement("div");
  div.className = className;
  return div;
};

export const removeModal = selection => {
  selection.resetWords();
  selection.counterClick = 0;
  const modal = document.querySelector(".modal");
  if (modal === null) return;
  modal.remove();
};
