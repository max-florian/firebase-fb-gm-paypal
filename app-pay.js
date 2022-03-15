// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFunctions,httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-functions.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /**
   * Tu configuración de Firebase
   */
};

// Initialize Firebase
initializeApp(firebaseConfig);

const functions = getFunctions(getApp());
const db = getFirestore();
const auth = getAuth();

const paypalCreateOrder = httpsCallable(functions,"paypalCreateOrder");
const paypalHandleOrder = httpsCallable(functions,"paypalHandleOrder");

const colRef = collection(db, 'payments');

window.paypal.Buttons({
    createOrder: (data, actions) => paypalCreateOrder().then(response => response.data.id),
  
    onApprove: (data, actions) => {
      paypalHandleOrder({ orderId: data.orderID })
      console.log(data);

      addDoc(colRef, {
        user_id: localStorage.getItem('user_uid'),
        user_email: localStorage.getItem('user_email'),
        payment_id: data.orderID
      });

      alert("Orden Aprobada!");
    }
  
  }).render('#paypalBuy')

const logoutButton = document.getElementById('logouta');
logoutButton.addEventListener('click', e => {
    auth.signOut().then(() => {
        console.log("signup out");
        localStorage.removeItem('user_uid');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
    });

})