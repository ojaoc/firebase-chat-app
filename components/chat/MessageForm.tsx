import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import React, { FormEvent, RefObject, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/system/Box';
import { auth, firestore } from '../../utils/firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { Typography } from '@mui/material';

interface MessageFormProps {
  dummyDivRef: RefObject<HTMLDivElement>;
}

const MessageForm = ({ dummyDivRef }: MessageFormProps) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { uid, photoURL, displayName } = auth.currentUser ?? {};

    await addDoc(collection(firestore, 'messages'), {
      text: message,
      createdAt: serverTimestamp(),
      displayName,
      uid,
      photoURL,
    });

    dummyDivRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const GetWhosTypingString = (usersTyping: String[]) => {
    const [firstUser, ...remainingUsers] = usersTyping;

    if (!firstUser) {
      return '';
    } else if (remainingUsers) {
      if (remainingUsers.length > 1) {
        return `${firstUser} and ${remainingUsers.length} others are typing`;
      }
      return `${firstUser} and other are typing`;
    } else {
      return `${firstUser} is typing`;
    }
  };

  return (
    <section>
      <form onSubmit={handleSendMessage}>
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <Typography
              sx={{ color: '#CDCDCD', fontWeight: 300 }}
              variant="body2"
              ml={1}
              mb={0.3}
            >
              {GetWhosTypingString([])}
            </Typography>
          </Box>
          <Box display="flex">
            <TextField
              color="secondary"
              variant="filled"
              size="small"
              hiddenLabel
              fullWidth
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Box ml={1}>
              <IconButton
                color="secondary"
                aria-label="send-message"
                type="submit"
                disabled={!Boolean(message)}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </form>
    </section>
  );
};

export default MessageForm;
