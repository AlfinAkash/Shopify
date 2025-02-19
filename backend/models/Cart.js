const db = require('../config/db');

const Cart = {
    addItem: async (userId, productId, quantity = 1) => {
        const query = `
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
        `;
        await db.execute(query, [userId, productId, quantity]);
    },

    getItems: async (userId) => {
        const query = `
            SELECT p.id, p.name, p.price, c.quantity
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        `;
        const [rows] = await db.execute(query, [userId]);
        return rows;
    },

    removeItem: async (userId, productId) => {
        const query = `DELETE FROM cart WHERE user_id = ? AND product_id = ?`;
        await db.execute(query, [userId, productId]);
    },

    clearCart: async (userId) => {
        const query = `DELETE FROM cart WHERE user_id = ?`;
        await db.execute(query, [userId]);
    }
};

module.exports = Cart;
