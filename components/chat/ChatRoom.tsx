import { collection, limit, orderBy, query } from '@firebase/firestore';
import React, { Component, useRef } from 'react';
import { auth, firestore } from '../../utils/firebase';
import { useCollectionData } from 'react-firebase9-hooks/firestore';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@material-ui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import MessageForm from './MessageForm';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';

const MessageContainer = styled(Paper)(({ sentByMe }) => ({
  background: '#219ebc',
  borderRadius: sentByMe ? '15px 2px 15px 15px' : '2px 15px 15px 15px',
  color: 'white',
  padding: '1rem',
}));

const ChatRoom = () => {
  const dummy = useRef();

  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [values, loading, error] = useCollectionData(q, { idField: 'id' });

  if (loading) return <CircularProgress />;
  if (error) return <h1>Something fucky happened</h1>;

  return (
    <section style={{ width: '100%' }}>
      <Paper elevation={3}>
        <Box p={3} minHeight="70vh" maxHeight="80vh" overflow="auto">
          <Stack spacing={3}>
            {values.map(({ id, uid, photoURL, text }, index) => {
              const sentByMe = auth.currentUser.uid === uid;

              return (
                <>
                  <Box
                    key={id}
                    minWidth="150px"
                    maxWidth="250px"
                    alignSelf={sentByMe ? 'flex-end' : 'flex-start'}
                    display="flex"
                    justifyContent={sentByMe ? 'flex-end' : 'flex-start'}
                  >
                    {!sentByMe && (
                      <Box mr={1}>
                        <Avatar alt="user-avatar" src={photoURL} />
                      </Box>
                    )}
                    <MessageContainer elevation={0} sentByMe={sentByMe}>
                      <Box>{text}</Box>
                    </MessageContainer>
                  </Box>
                </>
              );
            })}
            <div ref={dummy}></div>
          </Stack>
        </Box>
        <Box p={1.5}>
          <MessageForm dummyDivRef={dummy} />
        </Box>
      </Paper>
    </section>
  );
};

export default ChatRoom;
