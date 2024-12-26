import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebaseconfig";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState({
    Balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  const transactionCollection = collection(db, "transactions");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const userid = user.uid;

    const getTransactions = () => {
      try {
        const queryTransactions = query(
          transactionCollection,
          where("userID", "==", userid),
          orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
          const docs = [];
          let totalIncome = 0;
          let totalExpense = 0;
          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            docs.push({ ...data, id });

            const transactionAmount = parseFloat(data.transactionAmount); // Ensure conversion to number

            if (data.transactionType === "expense") {
              totalExpense += transactionAmount;
            } else {
              totalIncome += transactionAmount;
            }

            console.log(totalExpense);
          });

          setTransactions(docs); // Update state with the fetched transactions
          let Balance = totalIncome - totalExpense;
          setTotalTransactions({
            Balance,
            expenses: totalExpense,
            income: totalIncome,
          });
        });

        return unsubscribe; // Return the unsubscribe function for cleanup
      } catch (error) {
        console.error("Error fetching transactions: ", error.message);
      }
    };

    const unsubscribe = getTransactions();

    // Cleanup the subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { transactions, totalTransactions };
};

export default useTransactions;
