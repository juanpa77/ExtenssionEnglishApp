import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Message } from "../../background";
import { db } from "../config";

const sendWordToFirestoreDB = (words: string[]) => {
  chrome.runtime.sendMessage<Message>({ type: 'send-words', payload: words }, /* (response) => {
    // console.log(response)
  } */);
}

export const addWordsToFirestoreDb = (uid: string, words: string[]) => {
  const userRef = doc(db, 'users', uid)
  updateDoc(userRef, { vocabulary: arrayUnion(...words) });
}

export default sendWordToFirestoreDB