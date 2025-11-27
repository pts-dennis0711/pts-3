const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Create a new order in the database
 * @param {Object} orderData - The order data including items, shipping, payment
 * @param {Object} customerData - Customer information
 * @returns {Promise<Object>} Response with success status and order ID
 */
export const createOrder = async (orderData, customerData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order: orderData,
                customer: customerData,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create order');
        }

        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Helper to normalize DB order to frontend format
const normalizeOrder = (order) => {
    if (!order) return null;
    return {
        ...order,
        shipping: order.shipping_address || order.shipping,
        payment: order.payment_details || order.payment,
        createdAt: order.created_at || order.createdAt,
        grandTotal: order.grand_total || order.grandTotal || order.total, // Fallback to total if grandTotal missing
        userId: order.user_id || order.userId,
        sessionId: order.session_id || order.sessionId,
        customerId: order.customer_id || order.customerId,
        updatedAt: order.updated_at || order.updatedAt,
        // Ensure numeric values are numbers
        total: parseFloat(order.total),
        tax: parseFloat(order.tax),
    };
};

/**
 * Get order details by order ID
 * @param {string} orderId - The order ID
 * @returns {Promise<Object>} Order details with items
 */
export const getOrder = async (orderId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch order');
        }

        return normalizeOrder(data.order);
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

/**
 * Get all orders for a specific user
 * @param {string} userId - The user ID or session ID
 * @param {number} limit - Maximum number of orders to fetch (default: 50)
 * @returns {Promise<Array>} Array of orders
 */
export const getUserOrders = async (userId, limit = 50) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/user/${userId}?limit=${limit}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch user orders');
        }

        return data.orders.map(normalizeOrder);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

/**
 * Get all orders (admin only)
 * @param {number} limit - Maximum number of orders to fetch (default: 100)
 * @param {string} status - Filter by status (optional)
 * @returns {Promise<Array>} Array of orders
 */
export const getAllOrders = async (limit = 100, status = null) => {
    try {
        let url = `${API_BASE_URL}/api/orders?limit=${limit}`;
        if (status) {
            url += `&status=${status}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch orders');
        }

        return data.orders.map(normalizeOrder);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};
