import React from "react";
import { createOrder, verifyPayment } from "../../api/api";
import "./Payment.css";

const Payment = () => {
  const handlePayment = async () => {
    const { data } = await createOrder({ userId: 1, productId: 1 });
    console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);

    const options = {
      key: "rzp_test_D2huYxwxY9jGTv",
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderId,
      handler: async (response) => {
        await verifyPayment({
          order_id: data.orderId,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          userId: 1,
        });
        alert("Payment Successful!");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <button className="pay-btn" onClick={handlePayment}>
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
