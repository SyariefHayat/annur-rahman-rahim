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
    // const { id } = useParams();

    // const [amount, setAmount] = useState("");
    // const [rawAmount, setRawAmount] = useState("");
    // const [dataDonations, setDataDonations] = useState(null);

    // useEffect(() => {
    //     getDataDonationsById(id).then((result) => {
    //         setDataDonations(result?.data)
    //     })
    // }, [id]);


    // const handleChange = (e) => {
    //     // Hanya mengizinkan angka
    //     const value = e.target.value.replace(/\D/g, "");

    //     // Ubah format
    //     let formattedValue = new Intl.NumberFormat("id-ID").format(value);
        
    //     // set nilai
    //     setAmount(formattedValue);
    //     setRawAmount(value);
    // };

    return (
        <DefaultLayout>
            <Navbar position={"relative"}/>
            <Footer />
        </DefaultLayout>
    )
}

export default DetailDonasi