import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import SendIcon from '@mui/icons-material/Send';
import { FilledInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/system/Box';
import React, { FormEvent, RefObject, useState } from 'react';
import Collections from '../../utils/enums/collections.enum';
import { auth, firestore } from '../../utils/firebase';
import WhosTypingHelperText from './WhosTypingHelperText';

interface MessageFormProps {
  dummyDivRef: RefObject<HTMLDivElement>;
}

const MessageForm = ({ dummyDivRef }: MessageFormProps) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { uid, photoURL, displayName } = auth.currentUser ?? {};

    await addDoc(collection(firestore, Collections.Messages), {
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
          <FormControl
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <WhosTypingHelperText />
            <FilledInput
              color="secondary"
              size="small"
              hiddenLabel
              fullWidth
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>
          <Box ml={1} display="flex" alignSelf="flex-end">
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
