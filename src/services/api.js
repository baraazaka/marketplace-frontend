
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

export async function addToCart(cartId, productId, quantity) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/cart-items`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                cart_id: cartId,
                product_id: productId,
                quantity
            })
        }
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.error || "Failed to add product to cart"
        );
    }

    return response.json();
}


export async function loginUser(email, password) {
    const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Login failed"
        );
    }

    return data;
}

