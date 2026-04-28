import { useState } from "react";
import { products } from "./data/products";

import ProductList from "./components/POS/ProductList.jsx";
import Cart from "./components/POS/Cart.jsx";
import Billing from "./components/POS/Billing.jsx";

function App() {
  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // UPDATE QUANTITY
  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (type === "inc") return { ...item, qty: item.qty + 1 };
          if (type === "dec" && item.qty > 1)
            return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
    );
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="h-screen grid grid-cols-3 gap-4 p-4 bg-gray-100">
      
      {/* PRODUCTS */}
      <div className="bg-white p-4 rounded shadow overflow-y-auto">
        <ProductList products={products} addToCart={addToCart} />
      </div>

      {/* CART */}
      <div className="bg-white p-4 rounded shadow overflow-y-auto">
        <Cart
          cart={cart}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
        />
      </div>

      {/* BILLING */}
      <div className="bg-white p-4 rounded shadow flex flex-col justify-between">
        <Billing total={total} clearCart={clearCart} />
      </div>

    </div>
  );
}

export default App;