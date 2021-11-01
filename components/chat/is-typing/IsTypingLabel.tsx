import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

interface IsTypingLabelProps {
  usersTyping: String[];
}

// eslint-disable-next-line react/display-name
const BoxForMotion = forwardRef((props: any, ref) => (
  <Box {...props} ref={ref} />
));

const MotionComponent = motion(BoxForMotion);

const IsTypingLabel = ({ usersTyping }: IsTypingLabelProps) => {
  const [firstUser, ...remainingUsers] = usersTyping;
  let text;

  if (!firstUser) {
    return null;
  }

  if (remainingUsers.length) {
    text =
      remainingUsers.length > 1
        ? `${firstUser} and ${remainingUsers.length} others are typing`
        : `${firstUser} and 1 other are typing`;
  } else {
    text = `${firstUser} is typing`;
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
        {text}
      </Typography>
      <Box display="flex" ml={2.8}>
        <div className="dot-flashing"></div>
      </Box>
    </MotionComponent>
  );
};

export default IsTypingLabel;
