import Button from '@mui/material/Button';
import React from 'react';
import { auth } from '../../utils/firebase';

const SignOut = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    auth.currentUser && (
      <Button variant="contained" color="secondary" onClick={handleSignOut}>
        Sign out
      </Button>
    )
  );
};

export default SignOut;
