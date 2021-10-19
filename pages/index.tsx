import React from "react";
import { useAuthState } from "react-firebase9-hooks/auth";
import ChatRoom from "../components/ChatRoom";
import SignInWithGoogleButton from "../components/firebase/SignInWithGoogleButton";
import SignOut from "../components/firebase/SignOut";
import { auth } from "../utils/firebase";

export default function Home() {
    const [user] = useAuthState(auth);

    return (
        <>
            {user ? <ChatRoom /> : <SignInWithGoogleButton />}
            <SignOut />
        </>
    );
}
