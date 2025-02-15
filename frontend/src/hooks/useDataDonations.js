import { getDataDonations } from "@/services/database/getDataDonations";
import { useState, useEffect } from "react"

const useDataDonations = () => {
    const [dataDonations, setDataDonations] = useState([]);

    useEffect(() => {
        getDataDonations().then((result) => {
            setDataDonations(result?.data);
        })
    });

    return { dataDonations };
}

export default useDataDonations;