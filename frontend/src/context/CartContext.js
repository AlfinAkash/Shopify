import React, { createContext, useContext, useState, useEffect } from 'react';
import { addToCart as addToCartAPI, getCart as getCartAPI, removeFromCart as removeFromCartAPI } from '../api/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCartAPI(1); 
                setCart(response.data);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await addToCartAPI({
                user_id: 1, 
                product_id: product.id,
                quantity: 1,
            });
            setCart(response.data);
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await removeFromCartAPI({
                user_id: 1, 
                product_id: productId,
            });
            setCart(response.data);
        } catch (error) {
            console.error('Failed to remove product from cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
