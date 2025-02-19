const db = require('../config/db');


exports.getProducts = async (req, res) => {
    try {
        const [products] = await db.execute('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to retrieve products.' });
    }
};


exports.selectProduct = async (req, res) => {
    console.log('Request Body:', req.body); 

    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ message: 'User ID and Product ID are required.' });
    }

    try {
        const query = `
            INSERT INTO orders (user_id, product_id, payment_status)
            VALUES (?, ?, 'Pending')
        `;
        await db.execute(query, [user_id, product_id]);
        res.json({ message: 'Product added to checkout.' });
    } catch (error) {
        console.error('Error adding product to checkout:', error);
        res.status(500).json({ message: 'Failed to add product to checkout.' });
    }
};

