const differenceTime = (first, end) => {
    const createdAt = new Date(first);
    const deadline = new Date(end);

    const diffTime = deadline - createdAt; // Selisih dalam milidetik
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Konversi ke hari

    return diffDays;
}

const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
};

export { differenceTime, formatDate };