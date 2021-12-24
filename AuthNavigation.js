import React, { useEffect, useState, useContext } from "react";
import { SignedInStack, SignedOutStack } from "./navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import LoadingScree from "./Screens/LoadingScree";
const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLoaded(true);
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser();
      }
    });
  }, []);
  return (
    <>
      {userLoaded ? (
        currentUser ? (
          <SignedInStack />
        ) : (
          <SignedOutStack />
        )
      ) : (
        <LoadingScree />
      )}
    </>
  );
};

export default AuthNavigation;
