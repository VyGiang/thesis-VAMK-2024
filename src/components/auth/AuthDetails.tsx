import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";

const AuthDetails = () => {
  const [user, setUser] = useState<firebase.UserInfo | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="text-white">
      {user ? <p>User is signed in</p> : <p>No user is signed in</p>}
    </div>
  );
};

export default AuthDetails;
