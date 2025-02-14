import React from 'react'

const DefaultLayout = ({ children }) => {
    return (
        <div className="relative font-Poppins px-16">
            {children}
        </div>
    )
}

export default DefaultLayout