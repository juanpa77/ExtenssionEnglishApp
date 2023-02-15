import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithCredential } from "firebase/auth";
import { firebaseApp } from "./firebase/config";

// chrome.action.onClicked.addListener(function () {
//   chrome.tabs.create({ url: 'index.html' })
// });
chrome.runtime.onInstalled.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, function (idToken) {
    const credential = GoogleAuthProvider.credential(null, idToken);
    // handleCredentialResponse(token)
    // Sign in with the credential from the user.
    const auth = getAuth(firebaseApp);
    console.log(auth)
    signInWithCredential(auth, credential)
      .then((result) => {
        // Signed in
        console.log(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // ...
      });
  });
});
