import { useEffect, useRef, useState } from "react";
import { LinkedList } from "../datos/ListaEnlazada";
import { DoublyLinkedList } from "../datos/ListaDobleEnlazada";
import { CircularLinkedList } from "../datos/ListaCircular";
import { CircularDoublyLinkedList } from "../datos/ListaCircularDoble";
import { mockPatients, mockDoctors, mockCommittee } from "../datos/datosMock";

const ROTATION_MS = 10000; // Cada 10 segundos cambia el medico 

export function useClinic() {
  const [waiting, setWaiting] = useState(() => {
    const l = new LinkedList();
    mockPatients.forEach((p) => l.append(p));
    return l;
  });

  const [history, setHistory] = useState(() => new DoublyLinkedList());

  const [rotation, setRotation] = useState(() => {
    const l = new CircularLinkedList();
    mockDoctors.forEach((d) => l.append(d));
    return l;
  });

  const [committee, setCommittee] = useState(() => {
    const l = new CircularDoublyLinkedList();
    mockCommittee.forEach((m) => l.append(m));
    return l;
  });

  const [countdown, setCountdown] = useState(ROTATION_MS / 1000);

  // Uso el waiting del closure en vez de setWaiting
  // porque aqui tengo que disparar tambien el setHistory y si lo meto
  // adentro del updater se ejecuta dos veces en dev (strict mode) y
  // duplica el paciente en el historial

  const attendPatient = (id) => {
    const copy = waiting.clone();
    const removed = copy.remove(id);
    if (!removed) return;

    setWaiting(copy);
    setHistory((prev) => {
      const h = prev.clone();
      h.append({ ...removed, attendedAt: new Date().toLocaleTimeString() });
      return h;
    });
  };

  const addPatient = (name, reason) => {
    setWaiting((prev) => {
      const copy = prev.clone();
      copy.append({ id: Date.now(), name, reason });
      return copy;
    });
  };

  const rotateNow = () => {
    setRotation((prev) => {
      const copy = prev.clone();
      copy.rotate();
      return copy;
    });
    setCountdown(ROTATION_MS / 1000);
  };

  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRotation((prev) => {
        const copy = prev.clone();
        copy.rotate();
        return copy;
      });
      setCountdown(ROTATION_MS / 1000);
    }, ROTATION_MS);

    const tick = setInterval(() => {
      setCountdown((s) => (s > 1 ? s - 1 : ROTATION_MS / 1000));
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(tick);
    };
  }, []);

  const committeeNext = () => {
    setCommittee((prev) => {
      const copy = prev.clone();
      copy.next();
      return copy;
    });
  };

  const committeePrev = () => {
    setCommittee((prev) => {
      const copy = prev.clone();
      copy.previous();
      return copy;
    });
  };

  return {
    waitingPatients: waiting.toArray(),
    history: history.toArray(),
    doctors: rotation.toArray(),
    committeeMembers: committee.toArray(),
    countdown,
    attendPatient,
    addPatient,
    rotateNow,
    committeeNext,
    committeePrev,
  };
}