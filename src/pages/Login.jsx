import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      name: "Nikita",
      role: "Cashier",
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-2xl w-[430px]"
      >
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
          POS Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border rounded-xl mb-5 text-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border rounded-xl mb-6 text-lg"
          required
        />

        <button className="w-full bg-blue-600 text-white py-4 rounded-xl text-xl font-bold">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;