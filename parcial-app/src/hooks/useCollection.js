import { useState } from "react";
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
import { db } from "../firebase/config";

// CRUD generico sobre una coleccion de Firestore
export function useCollection(table) {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const getAll = async (filters = []) => {
    setIsPending(true);
    setError(null);
    try {
      let q = query(collection(db, table));
      filters.forEach(([campo, op, valor]) => {
        q = query(q, where(campo, op, valor));
      });
      const snap = await getDocs(q);
      setResults(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  const add = async (data) => {
    const ref = await addDoc(collection(db, table), data);
    return ref.id;
  };

  const update = (id, data) => updateDoc(doc(db, table, id), data);

  const remove = (id) => deleteDoc(doc(db, table, id));

  return { results, isPending, error, getAll, add, update, remove };
}
