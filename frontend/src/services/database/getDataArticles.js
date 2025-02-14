import { apiInstanceExpress } from "../express/apiInstance";

export const getDataArticles = async () => {
    try {
        const articles = await apiInstanceExpress.get("article");
        if (articles.status === 200) return articles.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}