import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import React, { FormEvent, RefObject, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/system/Box';
import { auth, firestore } from '../../utils/firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';

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

  return (
    <section>
      <form onSubmit={handleSendMessage}>
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
      </form>
    </section>
  );
};

export default MessageForm;
