import { apiInstanceExpress } from "../express/apiInstance"

export const getDataDonationsById = async (donation_id) => {
    try {
        const response = await apiInstanceExpress.get("donation/" + donation_id);
        if (response.status === 200) return response.data;
    } catch (error) {
        console.error(error);
    }
}