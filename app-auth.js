// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /**
   * Tu configuración de Firebase
   */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const providerfb = new FacebookAuthProvider();
const providergm = new GoogleAuthProvider();

const facebookButton = document.getElementById('facebookLogin');
facebookButton.addEventListener('click', e => {
    signInWithPopup(auth, providerfb)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            if(user){
                console.log(user);
                localStorage.setItem('user_uid', user.uid);
                localStorage.setItem('user_email', user.email);
                localStorage.setItem('user_name', user.displayName);

                window.location.href = "http://localhost:5500/buy.html";
            }
            
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //const credential = FacebookAuthProvider.credentialFromResult(result);
            //const accessToken = credential.accessToken;
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
        });

})

const gmailButton = document.getElementById('gmailLogin');
gmailButton.addEventListener('click', e => {
    signInWithPopup(auth, providergm)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            if(user){
                console.log(user);
                localStorage.setItem('user_uid', user.uid);
                localStorage.setItem('user_email', user.email);
                localStorage.setItem('user_name', user.displayName);

                window.location.href = "http://localhost:5500/buy.html";
            }
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

})

