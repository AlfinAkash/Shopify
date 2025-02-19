import { createOrder } from '../api/api';

export const handlePayment = async (amount) => {
    try {
        const { data } = await createOrder(amount); 
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, 
            amount: data.amount,
            currency: "INR",
            name: "Cashback App",
            description: "Purchase Product",
            order_id: data.orderId,
            handler: function (response) {
                alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
            },
            prefill: {
                name: "Akash",
                email: "a.alfinakash1@gmail.com",
                contact: "9150407570"
            },
            theme: { color: "#3399cc" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Razorpay Error:", error);
        alert("Payment Failed!");
    }
};
