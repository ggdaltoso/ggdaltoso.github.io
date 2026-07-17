import { useCallback, useEffect, useState } from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirebaseAuth } from '../utils/firebase';

const AUTH_ERROR_MESSAGE = 'Sign-in failed, please try again';

const useChatAuth = ({ onJoin, onLeave } = {}) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return undefined;

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      if (nextUser) {
        setUser(nextUser);
        setAuthReady(true);
        return;
      }

      signInAnonymously(auth).catch(() => setAuthError(AUTH_ERROR_MESSAGE));
    });

    return unsubscribe;
  }, []);

  const setNickname = useCallback(async (displayName) => {
    const auth = getFirebaseAuth();
    if (!auth?.currentUser || !displayName.trim()) return;

    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      const updatedUser = { ...auth.currentUser };
      setUser(updatedUser);
      onJoin?.(updatedUser);
    } catch {
      setAuthError(AUTH_ERROR_MESSAGE);
    }
  }, [onJoin]);

  const signInWithProvider = useCallback(async (Provider) => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    try {
      setAuthError(null);
      const { user: signedInUser } = await signInWithPopup(auth, new Provider());
      onJoin?.(signedInUser);
    } catch {
      setAuthError(AUTH_ERROR_MESSAGE);
    }
  }, [onJoin]);

  const signInWithGoogle = useCallback(
    () => signInWithProvider(GoogleAuthProvider),
    [signInWithProvider],
  );
  const signInWithGithub = useCallback(
    () => signInWithProvider(GithubAuthProvider),
    [signInWithProvider],
  );

  const signOutUser = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth?.currentUser) return;

    const leavingUser = { ...auth.currentUser };

    try {
      if (leavingUser.displayName) await onLeave?.(leavingUser);
      await signOut(auth);
    } catch {
      setAuthError(AUTH_ERROR_MESSAGE);
    }
  }, [onLeave]);

  return {
    user,
    authReady,
    hasJoined: Boolean(user?.displayName),
    setNickname,
    signInWithGoogle,
    signInWithGithub,
    signOutUser,
    authError,
  };
};

export default useChatAuth;
