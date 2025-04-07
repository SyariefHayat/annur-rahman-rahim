import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useEffect, useRef, useState } from "react";

import { userAtomStorage } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/services/express/apiInstance";

const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 menit
// const INACTIVITY_LIMIT = 10000; // Untuk testing: 10 detik

const useAutoLogout = () => {
    const timeoutRef = useRef(null);
    const countdownRef = useRef(null);
    
    const [user, setUser] = useAtom(userAtomStorage);
    const [remainingTime, setRemainingTime] = useState(INACTIVITY_LIMIT);

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const handleSignOut = async () => {
            try {
                const signOutToken = await apiInstanceExpress.delete("sign-in", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (signOutToken.status === 204) {
                    await signOut(auth);
                    setUser(null);
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            }
        };

        const resetTimer = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (countdownRef.current) clearInterval(countdownRef.current);

            setRemainingTime(INACTIVITY_LIMIT);

            timeoutRef.current = setTimeout(() => {
                handleSignOut();
            }, INACTIVITY_LIMIT);

            countdownRef.current = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1000) {
                        clearInterval(countdownRef.current);
                        return 0;
                    }
                    return prev - 1000;
                });
            }, 1000);
        };

        const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        resetTimer();

        return () => {
            clearTimeout(timeoutRef.current);
            clearInterval(countdownRef.current);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [user]);

    // useEffect(() => {
    //     if (!user) return;
    //     const minutes = Math.floor(remainingTime / 60000);
    //     const seconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, "0");
    //     console.log(`⏳ Sisa waktu sebelum logout otomatis: ${minutes}:${seconds}`);
    // }, [remainingTime]);
};

export default useAutoLogout;