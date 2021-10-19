import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import React, { FormEvent, MutableRefObject, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/system/Box';
import { auth, firestore } from '../../utils/firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';

const MessageForm = ({ dummyDivRef }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(firestore, 'messages'), {
      text: message,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    dummyDivRef.current.scrollIntoView({ behaviour: 'smooth' });
  };

  return (
    <section>
      <form onSubmit={handleSendMessage}>
        <Box display="flex">
          <TextField
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
              color="primary"
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
