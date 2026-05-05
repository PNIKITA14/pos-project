import { useState } from "react";

const emojiMap = {
  Milk: "🥛",
  Bread: "🍞",
  Rice: "🍚",
  Eggs: "🥚",
  Sugar: "🍬",
  Salt: "🧂",
  Oil: "🛢️",
  Soap: "🧼",
  Shampoo: "🧴",
  "Tea Powder": "☕",
};

const ProductList = ({ products, addToCart }) => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-2xl font-bold text-blue-700">Products</h2>
        <span>{filteredProducts.length} items</span>
      </div>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl px-3 py-2 mb-3"
      />

      <div className="grid grid-cols-3 gap-3">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-blue-50 rounded-xl p-3 shadow">
            <div className="text-3xl">{emojiMap[product.name] || "🛒"}</div>
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-green-700 font-bold">₹{product.price}</p>

            <button
              onClick={() =>
                addToCart({
                  ...product,
                  emoji: emojiMap[product.name] || "🛒",
                })
              }
              className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2"
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