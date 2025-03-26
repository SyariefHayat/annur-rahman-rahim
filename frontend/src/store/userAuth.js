import { getAuth, onAuthStateChanged } from "firebase/auth";

export const listenToAuth = (setUser) => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
};
