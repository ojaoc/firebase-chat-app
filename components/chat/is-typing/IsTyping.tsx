import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import { useFormControl } from '@mui/material/FormControl';
import React, { useCallback, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Collections from '../../../utils/enums/collections.enum';
import { auth, firestore } from '../../../utils/firebase';
import IsTypingLabel from './IsTypingLabel';

const IsTyping = () => {
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

    return () => {
      handleSetUserIsTyping(false);
    };
  }, [focused, handleSetUserIsTyping]);

  // Retrieve users typing from firestore
  const usersTypingRef = collection(firestore, Collections.UsersTyping);
  const q = query(usersTypingRef, orderBy('createdAt', 'desc'));

  const [values] = useCollectionData(q, { idField: 'id' });
  const usersTyping =
    values?.map((value) => value.name).filter((name) => name !== displayName) ??
    [];

  return <IsTypingLabel usersTyping={usersTyping} />;
};

export default IsTyping;
