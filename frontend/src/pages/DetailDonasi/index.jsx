import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React, { useEffect, useState } from 'react'
import Navbar from '../Landing/Navbar'
import { useParams } from 'react-router-dom'
import { getDataDonationsById } from '@/services/database/getDataDonationsById'
import Footer from '@/components/Modules/Landing/Footer'
import ProgressBar from '@/components/Modules/Element/ProgressBar'
import { differenceTime } from '@/utils/formatDate'
import PaymentButton from '@/components/Modules/Landing/PaymentButton'

const DetailDonasi = () => {
    const { id } = useParams();

    const [amount, setAmount] = useState("");
    const [rawAmount, setRawAmount] = useState("");
    const [dataDonations, setDataDonations] = useState(null);

    useEffect(() => {
        getDataDonationsById(id).then((result) => {
            setDataDonations(result?.data)
        })
    }, [id]);


    const handleChange = (e) => {
        // Hanya mengizinkan angka
        const value = e.target.value.replace(/\D/g, "");

        // Ubah format
        let formattedValue = new Intl.NumberFormat("id-ID").format(value);
        
        // set nilai
        setAmount(formattedValue);
        setRawAmount(value);
    };

    return (
        <DefaultLayout>
            <Navbar />
            {dataDonations && (
                <div className="w-full h-full flex justify-between">
                    <div className="w-[60%] h-full flex flex-col gap-5 border border-gray-300 rounded-md shadow-md p-5">
                        <h3 className="text-5xl font-bold">{dataDonations.title}</h3>
                        <p className="text-lg">{dataDonations.desc}</p>
                        <img src={`http://localhost:8000${dataDonations.image}`} alt="" />
                    </div>
                    <div className="w-[35%] h-full">
                        <div className="w-full border border-gray-300 rounded-md p-5">
                            <div className="w-full max-w-sm">
                                <label className="block text-gray-700 mb-1">Masukkan Nominal Donasi</label>
                                <div className="flex items-center bg-gray-100 rounded-lg p-3">
                                    <span className="text-lg font-bold text-gray-800 mr-2">Rp</span>
                                    <input
                                    type="text"
                                    value={amount}
                                    onChange={handleChange}
                                    className={`bg-transparent outline-none w-full text-right ${amount && amount != 0 ? "text-gray-800 font-bold" : "text-gray-500"} text-lg`}
                                    placeholder="0"
                                    />
                                </div>
                            </div>
                            <PaymentButton amount={rawAmount} email={"test@gmail.com"} />
                        </div>
                        <div className="w-full border border-gray-300 rounded-md p-5 mt-5">
                            <div>
                                <div className="flex items-center justify-between">
                                    <p>Terkumpul: Rp {dataDonations.collectedAmount.toLocaleString("id-ID")}</p>
                                    <p>Target: Rp {dataDonations.targetAmount.toLocaleString("id-ID")}</p>
                                </div>
                                <ProgressBar targetAmount={dataDonations.targetAmount} collectedAmount={dataDonations.collectedAmount}/>
                                <div className="flex items-center justify-between">
                                    <p>{dataDonations.donors.length} Donatur</p>
                                    <p>{differenceTime(dataDonations.createdAt, dataDonations.deadline)} hari lagi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer style={"mt-10"} />
        </DefaultLayout>
    )
}

export default DetailDonasi