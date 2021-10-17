import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInWithGoogleButton from "../components/firebase/SignInWithGoogleButton";
import SignOut from "../components/firebase/SignOut";
import { auth } from "../utils/firebase";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? <h1>Swag</h1> : <SignInWithGoogleButton />}
      <SignOut />
    </>
  );
}
