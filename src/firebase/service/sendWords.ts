import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

const sendWordToFirestoreDB = async (words: string[]) => {
  const userId = getUserId()
  // Add a new document in collection "cities"
  console.log('test')
  const wordRef = doc(db, 'users', 'id')
  await setDoc(wordRef, { vocabulary: words });
}

const getUserId = () => {

}

// helper ??
export function listener(message: string) {
  return () => chrome.runtime.sendMessage(`click ${message}`);
}

export default sendWordToFirestoreDB