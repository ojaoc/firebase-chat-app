import { collection, orderBy, query } from '@firebase/firestore';
import { Typography } from '@mui/material';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../utils/firebase';

const WhosTypingHelperText = () => {
  const usersTypingRef = collection(firestore, 'usersTyping');
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
