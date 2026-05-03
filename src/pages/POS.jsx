import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/POS/ProductList";
import Cart from "../components/POS/Cart";
import Billing from "../components/POS/Billing";

const fallbackProducts = [
  { _id: "1", name: "Milk", price: 50 },
  { _id: "2", name: "Bread", price: 30 },
  { _id: "3", name: "Rice", price: 100 },
  { _id: "4", name: "Eggs", price: 60 },
  { _id: "5", name: "Sugar", price: 45 },
  { _id: "6", name: "Salt", price: 20 },
  { _id: "7", name: "Oil", price: 150 },
  { _id: "8", name: "Soap", price: 35 },
  { _id: "9", name: "Shampoo", price: 120 },
  { _id: "10", name: "Tea Powder", price: 80 },
];

const POS = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(fallbackProducts);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setProducts(data);
      })
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (_id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id
          ? {
              ...item,
              qty:
                type === "inc"
                  ? item.qty + 1
                  : item.qty > 1
                  ? item.qty - 1
                  : item.qty,
            }
          : item
      )
    );
  };

  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🛒 SmartMart POS</h1>
          <p>Supermarket Billing Counter</p>
        </div>

        <div className="text-right">
          
          <p>Items in cart: {itemCount}</p>
          <p>Cashier: {JSON.parse(localStorage.getItem("user"))?.name || "Guest"}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-blue-700 px-3 py-1 rounded mr-2"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
            localStorage.removeItem("user");
           navigate("/login");
          }}
          >
           Logout
          </button>
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
          <Billing cart={cart} total={total} clearCart={clearCart} />
        </section>
      </main>
    </div>
  );
};

export default POS;