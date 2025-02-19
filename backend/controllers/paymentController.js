const crypto = require('crypto');
const db = require('../config/db');
const razorpay = require('../config/razorpay');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
    const { userId } = req.body;

    try {
       
        const cartItems = await Cart.getItems(userId);
        if (!cartItems.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

       
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to paise

      
        const order = await razorpay.orders.create({
            amount: totalAmount,
            currency: "INR",
            receipt: `receipt_${userId}_${Date.now()}`,
            payment_capture: 1
        });

        res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Error creating order" });
    }
};

exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature, userId } = req.body;

    try {
        
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${order_id}|${payment_id}`)
            .digest('hex');

        if (generatedSignature !== signature) {
            return res.status(400).json({ message: "Invalid payment signature" });
        }

       
        await db.execute(
            'INSERT INTO orders (user_id, order_id, payment_id, status) VALUES (?, ?, ?, ?)',
            [userId, order_id, payment_id, 'Completed']
        );

       
        await Cart.clearCart(userId);

        res.json({ message: "Payment verified and order placed successfully" });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Payment verification failed" });
    }
};
