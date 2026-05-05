const Cart = ({ cart, updateQty, removeFromCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-4">Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 shadow"
          >
            <h3 className="text-lg font-semibold">
              {item.emoji} {item.name}
            </h3>

            <p className="text-gray-700 mb-2">
              ₹{item.price} × {item.qty}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item._id, "dec")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-bold">{item.qty}</span>

              <button
                onClick={() => updateQty(item._id, "inc")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-gray-700 text-white px-3 py-1 rounded ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;