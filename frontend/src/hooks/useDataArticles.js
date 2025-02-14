import { getDataArticles } from "@/services/database/getDataArticles";
import { useState, useEffect } from "react";

const useDataArticles = () => {
    const [dataArticles, setDataArticles] = useState([]);

    useEffect(() => {
        getDataArticles().then((result) => {
            setDataArticles(result.data);
        })
    });

    return { dataArticles };
}

export default useDataArticles;