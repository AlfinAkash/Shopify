import React, { useEffect, useState } from 'react';
import { getCartItems, createOrder, verifyPayment } from '../../api/api';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await getCartItems();
                setCartItems(data);
                const totalPrice = data.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setTotal(totalPrice);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCart();
    }, []);

    const handlePayment = async () => {
        try {
            const { data } = await createOrder({ userId: 1 }); 

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "AlfinAkash Factory",
                description: "Purchase Items",
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        await verifyPayment({
                            order_id: data.orderId,
                            payment_id: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                            userId: 1
                        });

                        alert("Payment successful!");
                        setCartItems([]);
                        setTotal(0);
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment failed. Please try again.");
                    }
                },
                prefill: {
                    name: "Akash A",
                    email: "a.alfinakash1@gmail.com",
                    contact: "9150407570"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.product_id}>
                        {item.name} - ₹{item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <h3>Total: ₹{total}</h3>
            <button onClick={handlePayment}>Pay with Razorpay</button>
        </div>
    );
};

export default Checkout;
