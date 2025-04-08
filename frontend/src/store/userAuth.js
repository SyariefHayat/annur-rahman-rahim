import { apiInstanceExpress } from "@/services/express/apiInstance";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

export const listenToAuth = (setUser) => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            try {
                const token = await getIdToken(firebaseUser);

                const response = await apiInstanceExpress.post("verify-token", { token });

                const userData = response.data.data;
                setUser({
                    name: userData.name,
                    email: userData.email,
                    bio: userData.bio,
                    role: userData.role,
                    token: userData.token,
                    id: userData._id,
                });
            } catch (error) {
                console.error("Token verification failed:", err);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    });
};
