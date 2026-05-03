import { useState } from "react";

const ProductList = ({ products, addToCart }) => {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <div className="font-semibold">{item.name}</div>
            <div className="text-gray-600">₹{item.price}</div>

            <button
              onClick={() => addToCart(item)}
              className="mt-2 w-full bg-blue-500 text-white py-1 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;