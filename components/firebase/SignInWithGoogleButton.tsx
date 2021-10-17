import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import React from "react";
import { auth } from "../../utils/firebase";

const SignInWithGoogleButton = () => {
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={handleSignIn}>Sign in</button>;
};

export default SignInWithGoogleButton;
