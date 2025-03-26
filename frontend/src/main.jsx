import "./index.css";

import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Donasi from "./pages/Donasi";
import DetailDonasi from "./pages/DetailDonasi";
import Article from "./pages/Article";
import DetailArticle from "./pages/DetailArticle";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ForgotPassword from "./components/Modules/SignIn/ForgotPassword";
import ProtectedRoute from "./components/Modules/Element/ProtectedRoute";
import { useAtom } from "jotai";
import { userAtom } from "./jotai/atoms";
import { listenToAuth } from "./store/userAuth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/donation",
        element: <Donasi />
    },
    {
        path: "/donation/:id",
        element: <DetailDonasi />
    },
    {
        path: "/article",
        element: <Article />
    },
    {
        path: "/article/:id",
        element: <DetailArticle />
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "/about-us",
        element: <About />
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Dashboard />
            }
        ]
    }
])

const App = () => {
    const [, setUser] = useAtom(userAtom);

    useEffect(() => {
        listenToAuth(setUser);
    }, []);

    return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)