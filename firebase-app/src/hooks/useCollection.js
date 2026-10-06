import { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// hook generico con el CRUD basico de cualquier coleccion de firestore
const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // filters: [["campo", "==", valor], ...]
  const getAll = async (filters = []) => {
    setIsPending(true);
    setError(null);

    try {
      let q = query(collection(db, table));

      for (const [field, op, value] of filters) {
        q = query(q, where(field, op, value));
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      setResults(docs);
      setIsPending(false);
      return docs;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return [];
    }
  };

  const add = async (data) => {
    try {
      const ref = await addDoc(collection(db, table), data);
      return ref.id;
    } catch (err) {
      setError(err.message);
    }
  };

  const update = async (id, data) => {
    try {
      await updateDoc(doc(db, table, id), data);
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await deleteDoc(doc(db, table, id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { results, isPending, error, getAll, add, update, remove };
};

export default useCollection;
