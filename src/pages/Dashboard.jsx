import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="bg-blue-700 text-white p-5 rounded-2xl shadow-lg flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">SmartMart Dashboard</h1>
          <p className="text-blue-100">Sales and inventory overview</p>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-bold"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">₹12,450</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-3xl font-bold text-blue-600">58</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Low Stock Items</h2>
          <p className="text-3xl font-bold text-red-600">7</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/pos")}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
      >
        Open POS Billing
      </button>
    </div>
  );
};

export default Dashboard;