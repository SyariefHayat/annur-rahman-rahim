import React, { useState } from 'react';
import { auth } from '@/services/firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
    
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Cek email Anda untuk mengatur ulang kata sandi.");
        } catch (err) {
            setError("Email tidak ditemukan atau terjadi kesalahan.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Lupa Kata Sandi</h2>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleResetPassword} className="space-y-4">
                <input
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Kirim Link Reset
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword