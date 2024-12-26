import { useEffect, useState } from "react";
import { auth } from "../firebaseconfig"; // Your Firebase config file
import { onAuthStateChanged } from "firebase/auth";

const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Stop loading once the state is known
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return { user, loading };
};

export default useAuthState;
