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
import { getFirebaseAuth } from '../utils';

const AUTH_ERROR_MESSAGE = 'Sign-in failed, please try again';

const useChatAuth = () => {
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
      setUser({ ...auth.currentUser });
    } catch {
      setAuthError(AUTH_ERROR_MESSAGE);
    }
  }, []);

  const signInWithProvider = useCallback(async (Provider) => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    try {
      setAuthError(null);
      await signInWithPopup(auth, new Provider());
    } catch {
      setAuthError(AUTH_ERROR_MESSAGE);
    }
  }, []);

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
    if (!auth) return;

    try {
      await signOut(auth);
    } catch {
      setAuthError(AUTH_ERROR_MESSAGE);
    }
  }, []);

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
