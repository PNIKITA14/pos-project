import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, []);

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="bg-blue-700 text-white p-5 rounded-2xl shadow-lg flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">SmartMart Dashboard</h1>
          <p className="text-blue-100">Sales and order overview</p>
        </div>

        <button
  onClick={() => {
    localStorage.removeItem("user");
    navigate("/login");
  }}
>
  Logout
</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">
            ₹{totalSales.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">System Status</h2>
          <p className="text-3xl font-bold text-green-600">Active</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/pos")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold mb-6"
      >
        Open POS Billing
      </button>

      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          orders.slice(0, 5).map((order) => (
            <div
              key={order._id}
              className="border-b py-3 flex justify-between"
            >
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-gray-500">
                  Items: {order.items.length}
                </p>
              </div>

              <p className="font-bold text-green-600">
                ₹{order.total.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;