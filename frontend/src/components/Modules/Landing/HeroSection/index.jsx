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
            className="w-full h-96 sm:h-screen px-5"
        >
            <div  
                className="w-full h-full p-5 animate-fadeIn rounded-2xl flex items-end justify-center bg-cover bg-center"
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
            </div>
        </section>
    )
}

export default HeroSection