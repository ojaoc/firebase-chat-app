import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import { Typography } from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';
import React, { useCallback, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Collections from '../../utils/enums/collections.enum';
import { auth, firestore } from '../../utils/firebase';

const WhosTypingHelperText = () => {
  const { focused } = useFormControl() || {};
  const { displayName } = auth.currentUser ?? {};

  const handleSetUserIsTyping = useCallback(
    async (isTyping: Boolean) => {
      if (displayName) {
        const userTypingDocRef = doc(
          firestore,
          Collections.UsersTyping,
          displayName
        );

        if (isTyping) {
          await setDoc(
            userTypingDocRef,
            {
              name: displayName,
              createdAt: serverTimestamp(),
            },
            { merge: true }
          );
        } else {
          await deleteDoc(userTypingDocRef);
        }
      }
    },
    [displayName]
  );

  useEffect(() => {
    handleSetUserIsTyping(Boolean(focused));
  }, [focused, handleSetUserIsTyping]);

  const usersTypingRef = collection(firestore, Collections.UsersTyping);
  const q = query(usersTypingRef, orderBy('createdAt', 'desc'));

  const [values] = useCollectionData(q, { idField: 'id' });
  const usersTyping = values?.map((value) => value.name) ?? [];

  const [firstUser, ...remainingUsers] = usersTyping;
  let renderString;

  if (!firstUser) {
    renderString = '';
  } else if (remainingUsers.length) {
    if (remainingUsers.length > 1) {
      renderString = `${firstUser} and ${remainingUsers.length} others are typing`;
    } else {
      renderString = `${firstUser} and 1 other are typing`;
    }
  } else {
    renderString = `${firstUser} is typing`;
  }

  return (
    <Typography
      sx={{ color: '#FAFAFA', fontWeight: 300 }}
      variant="caption"
      ml={1}
      mb={0.2}
    >
      {renderString}
    </Typography>
  );
};

export default WhosTypingHelperText;
