const BASE_URL = "https://imperial-fit.onrender.com/api/progress";

export const getProgressByUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch progress");
        return await response.json();
    } catch (error) {
        console.error("Error fetching progress:", error);
        throw error;
    }
};

export const createProgressEntry = async (data) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to save progress");
        return await response.json();
    } catch (error) {
        console.error("Error saving progress:", error);
        throw error;
    }
};

export const deleteProgressEntry = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete progress");
        return await response.json();
    } catch (error) {
        console.error("Error deleting progress:", error);
        throw error;
    }
};
