import { collection, limit, orderBy, query } from "@firebase/firestore";
import React from "react";
import { firestore } from "../utils/firebase";
import { useCollectionData } from "react-firebase9-hooks/firestore";

const ChatRoom = () => {
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    const [values, loading, error] = useCollectionData(q, { idField: "id" });

    if (loading) return <h1>loading...</h1>;
    if (error) return <h1>Something fucky happened</h1>;

    console.log(error);

    return (
        <div>
            {values.map(({ id, text }) => (
                <p key={id}>{text}</p>
            ))}
        </div>
    );
};

export default ChatRoom;
