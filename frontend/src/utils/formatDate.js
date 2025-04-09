// Menghitung selisih hari antara dua tanggal
const differenceTime = (first, end) => {
    const createdAt = new Date(first);
    const deadline = new Date(end);

    const diffTime = deadline - createdAt; // Selisih dalam milidetik
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Konversi ke hari

    return diffDays;
};

// Format tanggal menjadi "Month DD, YYYY" (contoh: April 9, 2025)
const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
};

// Menampilkan waktu relatif seperti "3 menit yang lalu"
const getRelativeTime = (createdAt) => {
    const now = new Date();
    const past = new Date(createdAt);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "baru saja";
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    return `${days} hari yang lalu`;
};

export { differenceTime, formatDate, getRelativeTime };
