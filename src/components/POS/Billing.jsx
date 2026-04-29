const Billing = ({ total, clearCart }) => {
  const gst = total * 0.05;
  const final = total + gst;

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-lg font-bold">Billing</h2>

      <div className="mt-2 text-gray-700">
        <p>Subtotal: ₹{total}</p>
        <p>GST (5%): ₹{gst.toFixed(2)}</p>
      </div>

      <h3 className="mt-2 text-xl font-bold">
        Total: ₹{final.toFixed(2)}
      </h3>

      <button
        onClick={clearCart}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default Billing;