export const BASE_URL = "https://opentdb.com/api.php?";
export const CATEGORY_URL = "https://opentdb.com/api_category.php"

export async function apiFetchAllCategories() {
    try {
        const response = await fetch(`${CATEGORY_URL}`);

        if (!response.ok) {
            throw new Error("Could not find categories 🤔");
        }
        const data = await response.json();
        return [ null, data ];
    } catch (e) {
        return [ e.message, [] ];
    }
}