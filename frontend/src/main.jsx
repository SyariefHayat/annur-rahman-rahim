import { useAtom } from "jotai";
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import "./index.css";
import { userAtomStorage } from "./jotai/atoms";
import { listenToAuth } from "./store/userAuth";
import ForgotPassword from "./components/Modules/SignIn/ForgotPassword";
import ProtectedRoute from "./components/Modules/Element/ProtectedRoute";

import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Donasi from "./pages/Donasi";
import Landing from "./pages/Landing";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DetailDonasi from "./pages/DetailDonasi";
import DetailArticle from "./pages/DetailArticle";
import PostArticle from "./pages/PostArticle";

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
        path: "/profile/:id",
        element: <Profile />
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
        path: "/add-article/:id",
        element: <PostArticle />
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
    const [, setUser] = useAtom(userAtomStorage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listenToAuth((user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    return <RouterProvider router={router} />;
};


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)