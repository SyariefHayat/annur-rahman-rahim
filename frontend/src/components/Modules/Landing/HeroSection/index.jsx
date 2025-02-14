import React, { useEffect, useState } from 'react'

const slides = [
    "/slide-1.png",
    "/slide-2.png",
    "/slide-3.png",
    "/slide-4.png"
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        <section 
            className="w-full h-screen rounded-2xl bg-cover bg-center flex items-end justify-center p-5 animate-fadeIn"
            style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        >
            <div className="flex items-center justify-center gap-3">
            {slides.map((_, index) => (
                <button
                    key={index}
                    className={`w-4 h-4 cursor-pointer hover:scale-120 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}
                    onClick={() => setCurrentIndex(index)}
                />
            ))}
            </div>
        </section>
    )
}

export default HeroSection