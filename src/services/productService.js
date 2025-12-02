// API service for fetching product data
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${slug}`);
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const getProductsByCategory = async (categorySlug) => {
    try {
        const products = await getAllProducts();
        return products.filter(p => p.category_slug === categorySlug);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};
