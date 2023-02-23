import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithCredential } from "firebase/auth";
import { auth } from "./firebase/authProvider";
import { firebaseApp } from "./firebase/config";
import { addWordsToFirestoreDb, initFirestoreDb } from "./firebase/service/sendWords";

chrome.runtime.onInstalled.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, function (idToken) {
    const credential = GoogleAuthProvider.credential(null, idToken);
    // Sign in with the credential from the user.
    const auth = getAuth(firebaseApp);
    console.log(auth)
    signInWithCredential(auth, credential)
      .then((result) => {
        initFirestoreDb(auth.currentUser.uid)
        // Signed in
        console.log(result.user.uid)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used
        // const email = error.customData.email;
        // ...
      });
  });
});
export type Action = {
  type: string
  payload: string[]
}

chrome.runtime.onMessage.addListener((message: Action, sender: any, sendResponse) => {
  if (message.type === 'send-words') {
    addWordsToFirestoreDb(auth.currentUser.uid, message.payload)
    sendResponse('successfully')
  }
});