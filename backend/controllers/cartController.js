
const db = require('../config/db');


exports.addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    try {
        const query = `
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
        `;
        await db.query(query, [user_id, product_id, quantity || 1]);

       
        const [cartItems] = await db.query(`
            SELECT c.product_id, c.quantity, p.name, p.price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?;
        `, [user_id]);

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getCart = async (req, res) => {
    const { user_id } = req.params;

    try {
        const [cartItems] = await db.query(`
            SELECT c.product_id, c.quantity, p.name, p.price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?;
        `, [user_id]);

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.removeFromCart = async (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    try {
        const query = `DELETE FROM cart WHERE user_id = ? AND product_id = ?;`;
        await db.query(query, [user_id, product_id]);

       
        const [cartItems] = await db.query(`
            SELECT c.product_id, c.quantity, p.name, p.price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?;
        `, [user_id]);

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
