
const API_URL = "http://localhost:5000";


// ========================================
// Products
// ========================================

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


// ========================================
// Auth
// ========================================

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


export async function signupUser(
    fullName,
    email,
    password
) {

    const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: fullName,
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Signup failed"
        );
    }

    return data;
}


// ========================================
// Cart
// ========================================

export async function getMyCart() {

    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/carts/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.error || "Failed to fetch cart"
        );
    }

    return response.json();
}


export async function createCart() {

    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/carts`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.error || "Failed to create cart"
        );
    }

    return response.json();
}


// ========================================
// Cart Items
// ========================================

// Get current user's cart items
export async function getMyCartItems() {

    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/cart-items/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.error || "Failed to fetch cart items"
        );
    }

    return response.json();
}


// Add product to cart
export async function addToCart(
    cartId,
    productId,
    quantity
) {

    const token =
        localStorage.getItem("access_token");

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

        const data =
            await response.json();

        throw new Error(
            data.error ||
            "Failed to add product to cart"
        );
    }

    return response.json();
}


// Update cart item quantity
export async function updateCartItem(
    id,
    quantity
) {

    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/cart-items/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                quantity
            })
        }
    );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.error ||
            "Failed to update cart item"
        );
    }

    return response.json();
}


// Remove item from cart
export async function deleteCartItem(id) {

    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/cart-items/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        const data =
            await response.json();

        throw new Error(
            data.error ||
            "Failed to remove cart item"
        );
    }

    return response.json();
}

export async function getMyWishlist() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}/api/wishlists/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.error || "Failed to fetch wishlist"
        );
    }

    return response.json();
}


export async function createWishlist() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}/api/wishlists`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to create wishlist"
        );
    }

    return data;
}


export async function getMyWishlistItems() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/wishlist-items/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch wishlist items"
        );
    }

    return data;
}


export async function addToWishlist(
    wishlistId,
    productId
) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/wishlist-items`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                wishlist_id: wishlistId,
                product_id: productId
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to add product to wishlist"
        );
    }

    return data;
}


export async function deleteWishlistItem(id) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/wishlist-items/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to remove product from wishlist"
        );
    }

    return data;
}


export async function createOrder(shipping_address) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            shipping_address
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
    }

    return data;
}


export async function getMyOrders() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch orders"
        );
    }

    return data;
}

export async function getOrderById(id) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch order"
        );
    }

    return data;
}

export async function getProductReviews(productId) {
    const response = await fetch(
        `${API_URL}/api/reviews/product/${productId}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch product reviews"
        );
    }

    return data;
}

export async function createReview(product_id, rating, comment) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            product_id,
            rating,
            comment
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to create review");
    }

    return data;
}


export async function getCategories() {
    const response = await fetch(`${API_URL}/api/categories`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch categories");
    }

    return data;
}

export async function getCategoryById(id) {
    const response = await fetch(
        `${API_URL}/api/categories/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch category");
    }

    return data;
}


export async function getCategoryProducts(id) {
    const response = await fetch(
        `${API_URL}/api/categories/${id}/products`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch category products"
        );
    }

    return data;
}


export async function getMyProfile() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/profiles/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch profile"
        );
    }

    return data;
}


export async function updateMyProfile(full_name, avatar_url) {
    const token = localStorage.getItem("access_token");

    const profileResponse = await fetch(
        `${API_URL}/api/profiles/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const profile = await profileResponse.json();

    if (!profileResponse.ok) {
        throw new Error(
            profile.error || "Failed to fetch current profile"
        );
    }

    const response = await fetch(
        `${API_URL}/api/profiles/${profile.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                full_name,
                avatar_url
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to update profile"
        );
    }

    return data;
}


