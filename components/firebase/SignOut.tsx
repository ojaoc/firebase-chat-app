import React from "react";
import { auth } from "../../utils/firebase";

const SignOut = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return auth.currentUser && <button onClick={handleSignOut}>Sign out</button>;
};

export default SignOut;
