import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return toast.error("Please fill all fields");

    const res = await login(email, password);
    if (res.success) {
      toast.success("Login Successful! 🎉");
      navigate("/");
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-800 transition duration-300 text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-400/10"
        >
          {isLoading ? (
            <Loader2 className="animate-spin text-black" size={24} />
          ) : (
            "Login"
          )}
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-400 font-bold cursor-pointer hover:underline uppercase tracking-widest text-[10px]"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
