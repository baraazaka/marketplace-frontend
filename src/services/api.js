
const API_URL = "http://localhost:5000";




export async function getProducts() {

    const response = await fetch(
        `${API_URL}/api/products`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}


export async function getProductById(id) {

    const response = await fetch(
        `${API_URL}/api/products/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    return response.json();
}


