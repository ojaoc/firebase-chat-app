import { firestore } from "./firebase";
import {
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";

const getUsers = async (): Promise<QuerySnapshot<DocumentData>> =>
  await getDocs(collection(firestore, "users"));

export { getUsers };
