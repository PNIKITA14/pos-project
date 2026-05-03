const Cart = ({ cart, updateQty, removeFromCart }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-600">
                ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.id, "dec")}
                className="px-2 bg-gray-200"
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => updateQty(item.id, "inc")}
                className="px-2 bg-gray-200"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;