import { apiInstanceExpress } from "../express/apiInstance"

export const getDataDonations = async () => {
    try {
        const response = await apiInstanceExpress.get("donation");
        if (response.status === 200) return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};