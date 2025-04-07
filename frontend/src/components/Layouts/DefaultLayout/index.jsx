import React from 'react'
import useAutoLogout from '@/hooks/useAutoLogout';

const DefaultLayout = ({ children }) => {
    useAutoLogout();

    return (
        <div className="relative font-Poppins">
            {children}
        </div>
    )
}

export default DefaultLayout