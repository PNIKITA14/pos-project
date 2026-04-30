import { useState } from "react";
import { products } from "../data/products";
import ProductList from "../components/POS/ProductList";
import Cart from "../components/POS/Cart";
import Billing from "../components/POS/Billing";

const POS = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

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

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-700 text-white px-6 py-4 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🛒 SmartMart POS</h1>
          <p className="text-blue-100">Supermarket Billing Counter</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Cashier: Nikita</p>
          <p className="text-blue-100">Items in cart: {itemCount}</p>
        </div>
      </header>

      <main className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section className="lg:col-span-5 bg-white rounded-2xl shadow-xl p-4">
          <ProductList products={products} addToCart={addToCart} />
        </section>

        <section className="lg:col-span-4 bg-white rounded-2xl shadow-xl p-4">
          <Cart
            cart={cart}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
          />
        </section>

        <section className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-4">
          <Billing total={total} clearCart={clearCart} />
        </section>
      </main>
    </div>
  );
};

export default POS;