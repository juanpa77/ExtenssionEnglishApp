import SelectionWords from "./selectionWords";
import { showModal, removeModal } from "./modal";
import sendWordToFirestoreDB from "./firebase/service/sendWords";
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
const selection = new SelectionWords();

const handleSelection = () => {
  const newSelection = document.getSelection().toString();
  const splitSelection = newSelection.split(" ");
  const transformSelection = splitSelection.map(selection => {
    return { text: selection, isSelected: true };
  });
  const isSelectionGreaterTwo = newSelection.length > 2;
  if (isSelectionGreaterTwo) selection.setWords(transformSelection)
};

document.addEventListener("selectionchange", handleSelection);

document.addEventListener("click", (e: HTMLElementEvent<HTMLDivElement>) => {
  const classList = Array.from(e.target.classList);
  const classNameElementList = e.target.classList;
  const isModalElement = classList.some(className => {
    return (
      className === "modal" ||
      className === "containerWord" ||
      className === "wrapperTitle" ||
      className === "backgroundModal" ||
      className === 'btn__send-words'
    );
  });
  const isFirstClick = selection.counterClick === 0;
  const isInputElement = e.target.localName === "input" || e.target.localName === "textarea";

  if (classNameElementList.contains('containerWord')) {
    const word = selection.getWords().filter(word => word.text === e.target.textContent)[0]?.text
    selection.toggleSelected(word)
  }
  if (!isModalElement && !isFirstClick) {
    removeModal(selection);
  }
  if (selection.validation() && !isInputElement && !isModalElement) {
    showModal(e, selection);
  }
  if (classList.includes('btn__send-words')) sendWordToFirestoreDB(selection.getFilteredWords())
});
