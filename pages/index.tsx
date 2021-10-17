import React, { useEffect } from "react";
import { getUsers } from "../utils/users";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const snap = await getUsers();
      snap.docs.forEach((doc) => console.log(doc.data()));
    }
    fetchData();
  }, []);

  return <h1>Swag</h1>;
}
