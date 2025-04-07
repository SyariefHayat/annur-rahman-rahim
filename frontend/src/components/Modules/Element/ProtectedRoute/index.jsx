import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { userAtomStorage } from "@/jotai/atoms";

const ProtectedRoute = () => {
    const [user] = useAtom(userAtomStorage);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, [])

    if (!isHydrated) return <div className="text-center p-4">Loading...</div>

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
