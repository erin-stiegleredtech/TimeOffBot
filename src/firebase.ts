import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, collection } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBSZzWL1Mo2I4I_0H85zRFTqqsTF_kn1yw",
  authDomain: "helpdeskbot-f9371.firebaseapp.com",
  projectId: "helpdeskbot-f9371",
  storageBucket: "helpdeskbot-f9371.appspot.com",
  messagingSenderId: "223236483685",
  appId: "1:223236483685:web:3a64b206b84a5f28fc748c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createTicket(threadId: string, text: string) {
  try {
    await addDoc(collection(db, 'tickets'), {
        threadId,
        text,
        openedAt: Date()
    })
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function createTimeOff(user: string, date: string) {
    try {
      await addDoc(collection(db, 'time-off'), {
          user,
          date,
          createdAt: Date()
      })
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
