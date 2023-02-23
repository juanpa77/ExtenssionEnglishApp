import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { Action } from "../../background";
import { db } from "../config";
import { listWordsWithTranslation } from "./translation";

const sendWordToFirestoreDB = (words: string[]) => {
  chrome.runtime.sendMessage<Action>({ type: 'send-words', payload: words }, /* (response) => {
  } */);
}

export const addWordsToFirestoreDb = async (uid: string, words: string[]) => {
  const data = await listWordsWithTranslation(words)
  const userRef = doc(db, 'users', uid)
  updateDoc(userRef, { vocabulary: arrayUnion(...data) })
}

export const initFirestoreDb = (uid: string) => {
  const userRef = doc(db, 'users', uid)
  setDoc(userRef, { vocabulary: [] });
}

export default sendWordToFirestoreDB