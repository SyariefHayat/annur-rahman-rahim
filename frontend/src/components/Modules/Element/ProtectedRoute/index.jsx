import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

import { userAtom } from "@/jotai/atoms";

const ProtectedRoute = () => {
    const [user] = useAtom(userAtom);

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
