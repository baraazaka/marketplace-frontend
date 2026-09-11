
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



export async function getMyProducts() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/products/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch seller products"
        );
    }

    return data;
}




export async function createProduct(productData) {
    const token = localStorage.getItem("access_token");

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("brand", productData.brand);
    formData.append("category_id", productData.category_id);
    formData.append("image", productData.image);

    const response = await fetch(
        `${API_URL}/api/products`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to create product"
        );
    }

    return data;
}

export async function updateProduct(id, productData) {
    const token = localStorage.getItem("access_token");

    const formData = new FormData();

    if (productData.name !== undefined) {
        formData.append("name", productData.name);
    }

    if (productData.description !== undefined) {
        formData.append("description", productData.description);
    }

    if (productData.price !== undefined) {
        formData.append("price", productData.price);
    }

    if (productData.stock !== undefined) {
        formData.append("stock", productData.stock);
    }

    if (productData.brand !== undefined) {
        formData.append("brand", productData.brand);
    }

    if (productData.category_id !== undefined) {
        formData.append("category_id", productData.category_id);
    }

    // Only send image if the seller selected a new one
    if (productData.image) {
        formData.append("image", productData.image);
    }

    const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to update product"
        );
    }

    return data;
}


export async function deleteProduct(id) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/products/${id}`,
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
            data.error || "Failed to delete product"
        );
    }

    return data;
}


export async function getSellerOrders() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/seller`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch seller orders"
        );
    }

    return data;
}


export async function getSellerOrderById(id) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/seller/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch seller order"
        );
    }

    return data;
}


export async function updateSellerOrderStatus(
    id,
    status
) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/seller/${id}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                status
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to update seller order status"
        );
    }

    return data;
}

export async function getSellerDashboard() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/seller/dashboard`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch seller dashboard"
        );
    }

    return data;
}


export async function getSellerAnalytics() {
    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/seller/analytics`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch seller analytics"
        );
    }

    return data;
}


export async function getAdminDashboard() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/admin/dashboard`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch admin dashboard"
        );
    }

    return data;
}

export async function getAdminAnalytics() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/admin/analytics`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch admin analytics"
        );
    }

    return data;
}

export async function getAdminOverview() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/admin/overview`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch admin overview"
        );
    }

    return data;
}



export async function getAdminUsers() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/profiles`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch users"
        );
    }

    return data;
}



export async function updateAdminUserRole(id, role) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/profiles/${id}/role`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                role
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to update user role"
        );
    }

    return data;
}



export async function deleteAdminUser(id) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/profiles/${id}`,
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
            data.error ||
            "Failed to delete user"
        );
    }

    return data;
}

export async function getAdminOrders() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch admin orders"
        );
    }

    return data;
}


export async function updateAdminOrderStatus(
    id,
    status
) {
    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/orders/admin/${id}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                status
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to update order status"
        );
    }

    return data;
}


export async function getAdminProducts() {
    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/products/admin`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to fetch admin products"
        );
    }

    return data;
}

export async function createAdminCategory(name) {
    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/categories`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to create category"
        );
    }

    return data;
}


export async function deleteAdminCategory(id) {
    const token =
        localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/api/categories/${id}`,
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
            data.error ||
            "Failed to delete category"
        );
    }

    return data;
}

