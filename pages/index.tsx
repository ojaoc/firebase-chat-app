import React from 'react';
import { useAuthState } from 'react-firebase9-hooks/auth';
import ChatRoom from '../components/ChatRoom';
import SignInWithGoogleButton from '../components/firebase/SignInWithGoogleButton';
import SignOut from '../components/firebase/SignOut';
import { auth } from '../utils/firebase';
import Box from '@mui/material/Box';

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={5}
    >
      {user ? <ChatRoom /> : <SignInWithGoogleButton />}
      <Box mt={5}>
        <SignOut />
      </Box>
    </Box>
  );
}
