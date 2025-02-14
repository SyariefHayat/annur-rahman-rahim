import { apiInstanceExpress } from "../express/apiInstance";

export const getDataArticlesById = async (article_id) => {
    try {
        const response = await apiInstanceExpress.get("article/" + article_id);
        if (response.status === 200) return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}