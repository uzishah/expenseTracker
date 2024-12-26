import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import { serverTimestamp } from "firebase/database";

const useAddTransactions = () => {
  const transactionCollection = collection(db, "transactions");

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollection, {
      userID: auth.currentUser.uid,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};

export default useAddTransactions;
