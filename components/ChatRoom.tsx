import { collection, limit, orderBy, query } from "@firebase/firestore";
import React from "react";
import { firestore } from "../utils/firebase";
import { useCollectionData } from "react-firebase9-hooks/firestore";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@material-ui/styles";
import CircularProgress from "@mui/material/CircularProgress";

const MessageContainer = styled(Paper)(({ sentByMe }) => ({
    background: "#219ebc",
    borderRadius: sentByMe ? "15px 2px 15px 15px" : "2px 15px 15px 15px",
    color: "white",
    padding: "1rem",
}));

const ChatRoom = () => {
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    const [values, loading, error] = useCollectionData(q, { idField: "id" });

    if (loading) return <CircularProgress />;
    if (error) return <h1>Something fucky happened</h1>;

    return (
        <section style={{ width: "100%" }}>
            <Paper elevation={3}>
                <Box p={5} height="85vh" overflow="auto">
                    <Stack spacing={3}>
                        {values.map(({ id, text }, index) => (
                            <Box
                                key={id}
                                minWidth="150px"
                                maxWidth="250px"
                                alignSelf={index % 2 === 0 ? "flex-end" : "flex-start"}
                            >
                                <MessageContainer elevation={0} sentByMe={index % 2 === 0}>
                                    <Box>{text}</Box>
                                </MessageContainer>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Paper>
        </section>
    );
};

export default ChatRoom;
