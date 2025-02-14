import { apiInstanceExpress } from "@/services/express/apiInstance";
import { useEffect, useRef, useState } from "react";

const PaymentButton = ({ amount, email }) => {
    const snapContainerRef = useRef(null);
    const [snapToken, setSnapToken] = useState(null);
    const [isTransaction, setIsTransaction] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "YOUR_CLIENT_KEY");
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      const handlePayment = async () => {
        setIsTransaction(true);

        try {
          const orderId = `DONASI-${new Date().getTime()}`;
          const response = await apiInstanceExpress.post("create-transaction", {
            amount,
            orderId,
            email,
          });
    
          setSnapToken(response.data.token);
        } catch (error) {
          console.error("Error creating transaction:", error);
        }
      };
    
      useEffect(() => {
        if (snapToken && window.snap && snapContainerRef.current) {
          window.snap.embed(snapToken, { embedId: "snap-container" });
        }
      }, [snapToken]);
    

    return (
        <div>
            <button onClick={handlePayment} className="w-full text-center p-3 mt-5 bg-red-400 rounded-md text-white cursor-pointer">
                Lanjut Pembayaran
            </button>
            
            {/* Container untuk menampilkan Snap Embed */}
            <div className={`${isTransaction ? "absolute" : "hidden"} w-full h-full top-0 left-0 bg-[#f3f3f3] py-16`}>
                <div id="snap-container" ref={snapContainerRef} className="w-[500px] h-full mx-auto rounded-md border border-gray-300 shadow-md"></div>
            </div>
        </div>
    );
};

export default PaymentButton;
