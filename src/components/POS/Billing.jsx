import { useState } from "react";

const Billing = ({ cart, total, clearCart }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  const gst = total * 0.05;
  const finalTotal = total + gst;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      subtotal: total,
      gst,
      total: finalTotal,
    };

    try {
      await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      setShowReceipt(true);
      clearCart();
    } catch (error) {
      alert("Order failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-700 mb-4">Billing</h2>

      <p>Subtotal: ₹{total.toFixed(2)}</p>
      <p>GST (5%): ₹{gst.toFixed(2)}</p>

      <h3 className="text-xl font-bold mt-3">
        Total: ₹{finalTotal.toFixed(2)}
      </h3>

      <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Checkout
      </button>

      {showReceipt && (
        <div className="mt-4 p-4 bg-green-100 border rounded">
          <h3 className="text-lg font-bold text-green-700">
            Order Successful ✅
          </h3>
          <p>Total Paid: ₹{finalTotal.toFixed(2)}</p>
          <p>Items: {cart.length}</p>
        </div>
      )}
    </div>
  );
};

export default Billing;