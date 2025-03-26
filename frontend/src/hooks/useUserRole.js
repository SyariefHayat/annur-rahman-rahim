import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const useUserRole = () => {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                fetchUserRole(user.email);
            } else {
                setRole("");
                setLoading(false);
            }
        });

        return () => unsubscribe;
    }, []);

    const fetchUserRole = async (email) => {
        try {
            const response = await apiInstanceExpress.get(`check-user/${email}`);
            if (response.status === 200) setRole(response.data?.role);
        } catch (error) {
            console.error("Error fetching user role:", error);
        } finally {
            setLoading(false);
        }
    }

    return { role, loading };
};

export default useUserRole;