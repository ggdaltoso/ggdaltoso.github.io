import { useCallback, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirebaseFirestore } from '../utils';

const MESSAGES_COLLECTION = 'chatMessages';
const MAX_MESSAGES = 200;

const useChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirebaseFirestore();
    if (!db) {
      setLoading(false);
      return undefined;
    }

    const messagesQuery = query(
      collection(db, MESSAGES_COLLECTION),
      orderBy('createdAt', 'asc'),
      limitToLast(MAX_MESSAGES),
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const sendMessage = useCallback(async ({ uid, displayName, photoURL, text }) => {
    const db = getFirebaseFirestore();
    if (!db) return;

    await addDoc(collection(db, MESSAGES_COLLECTION), {
      uid,
      displayName,
      photoURL: photoURL ?? null,
      text,
      type: 'message',
      createdAt: serverTimestamp(),
    });
  }, []);

  const sendJoinMessage = useCallback(async ({ uid, displayName, photoURL }) => {
    const db = getFirebaseFirestore();
    if (!db) return;

    await addDoc(collection(db, MESSAGES_COLLECTION), {
      uid,
      displayName,
      photoURL: photoURL ?? null,
      type: 'join',
      createdAt: serverTimestamp(),
    });
  }, []);

  return { messages, loading, sendMessage, sendJoinMessage };
};

export default useChatMessages;
