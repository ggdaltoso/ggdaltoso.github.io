import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { getFirebaseFirestore } from '../utils';

const PRESENCE_COLLECTION = 'presence';
const HEARTBEAT_INTERVAL_MS = 30 * 1000;
const ONLINE_WINDOW_MS = 60 * 1000;

const toDate = (timestamp) => (timestamp?.toDate ? timestamp.toDate() : null);

const useChatPresence = (user) => {
  const [presenceDocs, setPresenceDocs] = useState([]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const db = getFirebaseFirestore();
    if (!db) return undefined;

    const unsubscribe = onSnapshot(
      collection(db, PRESENCE_COLLECTION),
      (snapshot) => {
        setPresenceDocs(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), HEARTBEAT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user) return undefined;

    const db = getFirebaseFirestore();
    if (!db) return undefined;

    const heartbeat = () => {
      setDoc(doc(db, PRESENCE_COLLECTION, user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL ?? null,
        lastSeen: serverTimestamp(),
      });
    };

    heartbeat();
    const interval = setInterval(heartbeat, HEARTBEAT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [user?.uid, user?.displayName, user?.photoURL]);

  const onlineUsers = presenceDocs.filter((presence) => {
    const lastSeen = toDate(presence.lastSeen);
    return lastSeen && now - lastSeen.getTime() <= ONLINE_WINDOW_MS;
  });

  return { onlineUsers, onlineCount: onlineUsers.length };
};

export default useChatPresence;
