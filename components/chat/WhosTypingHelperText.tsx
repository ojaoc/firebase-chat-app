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
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Collections from '../../utils/enums/collections.enum';
import { auth, firestore } from '../../utils/firebase';

// eslint-disable-next-line react/display-name
const BoxForMotion = forwardRef((props: any, ref) => (
  <Box {...props} ref={ref} />
));

const MotionComponent = motion(BoxForMotion);

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

    return () => {
      handleSetUserIsTyping(false);
    };
  }, [focused, handleSetUserIsTyping]);

  const usersTypingRef = collection(firestore, Collections.UsersTyping);
  const q = query(usersTypingRef, orderBy('createdAt', 'desc'));

  const [values] = useCollectionData(q, { idField: 'id' });
  const usersTyping =
    values?.map((value) => value.name).filter((name) => name !== displayName) ??
    [];

  const [firstUser, ...remainingUsers] = usersTyping;
  let renderString;

  if (!firstUser) {
    return null;
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
    <MotionComponent
      position="absolute"
      top="-22px"
      display="flex"
      alignItems="center"
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <Typography sx={{ color: '#FAFAFA' }} variant="caption" ml={1}>
        {renderString}
      </Typography>
      <Box display="flex" ml={2.8}>
        <div className="dot-flashing"></div>
      </Box>
    </MotionComponent>
  );
};

export default WhosTypingHelperText;
