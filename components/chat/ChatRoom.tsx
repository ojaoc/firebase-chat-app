import { collection, limit, orderBy, query } from '@firebase/firestore';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper, { PaperProps } from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React, { useRef } from 'react';
import { useCollectionData } from 'react-firebase9-hooks/firestore';
import { auth, firestore } from '../../utils/firebase';
import MessageForm from './MessageForm';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ExtraPaperProps {
  sentByMe: Boolean;
}

const MessageContainer = styled(Paper)(
  ({ sentByMe }: PaperProps & ExtraPaperProps) => ({
    position: 'relative',
    background: '#E3AB44',
    borderRadius: sentByMe ? '15px 2px 15px 15px' : '2px 15px 15px 15px',
    color: 'black',
    padding: '0.5rem 0.8rem',
  })
);

const ChatRoom = () => {
  const dummy = useRef<HTMLDivElement>(null);

  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'));

  const [values, loading, error] = useCollectionData(q, { idField: 'id' });

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <h1>Something fucky happened</h1>;

  return (
    <section style={{ width: '100%' }}>
      <Paper elevation={3}>
        <Box p={3} minHeight="70vh" maxHeight="80vh" overflow="auto">
          <Stack spacing={3}>
            {values?.map(
              ({ id, uid, photoURL, text, displayName, createdAt }) => {
                const sentByMe = auth?.currentUser?.uid === uid;

                return (
                  <>
                    <Box
                      key={id}
                      minWidth="150px"
                      maxWidth="250px"
                      alignSelf={sentByMe ? 'flex-end' : 'flex-start'}
                      display="flex"
                      flexDirection="column"
                      justifyContent={sentByMe ? 'flex-end' : 'flex-start'}
                    >
                      <Box
                        display="flex"
                        justifyContent={sentByMe ? 'flex-end' : 'flex-start'}
                      >
                        {!sentByMe && (
                          <Box mr={1}>
                            <Avatar alt="user-avatar" src={photoURL} />
                          </Box>
                        )}
                        <MessageContainer elevation={0} sentByMe={sentByMe}>
                          {!sentByMe && (
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              sx={{ fontWeight: 500, color: '#5E5139' }}
                            >
                              {displayName}
                            </Typography>
                          )}

                          <Typography variant="body1">{text}</Typography>
                        </MessageContainer>
                      </Box>
                      <Box display="flex" alignSelf="flex-end" mt={0.3}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                          sx={{
                            fontWeight: 500,
                            color: '#747E83',
                            fontSize: 10,
                          }}
                        >
                          {createdAt && dayjs.unix(createdAt.seconds).fromNow()}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                );
              }
            )}
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
