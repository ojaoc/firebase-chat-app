import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import React from "react";
import { auth } from "../../utils/firebase";
import Button from "@mui/material/Button";

const SignInWithGoogleButton = () => {
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <Button variant="outlined" onClick={handleSignIn}>
            Sign in
        </Button>
    );
};

export default SignInWithGoogleButton;
