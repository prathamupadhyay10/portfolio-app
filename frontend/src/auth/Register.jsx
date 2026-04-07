import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "bg-gray-700" };
    if (password.length < 6) return { label: "Weak", color: "bg-red-500" };
    if (password.length < 10) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) return toast.error("All fields are required");
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    if (!acceptedTerms) return toast.error("Please accept the terms and conditions");

    const res = await register(name, email, password);
    if (res.success) {
      toast.success("Account Created! 🚀");
      navigate("/");
    } else {
      toast.error(res.msg);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account ✨
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 transition"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
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

        {/* Password Strength */}
        {password && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1 px-1">
              <span className="text-gray-400">Strength: {strength.label}</span>
            </div>
            <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.label === "Weak" ? "33%" : strength.label === "Medium" ? "66%" : "100%" }}></div>
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 transition"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Terms */}
        <div className="flex items-center gap-2 mb-6 px-1">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-500"
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I agree to the <span className="text-yellow-400 cursor-pointer hover:underline font-bold">Terms & Conditions</span>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-800 transition duration-300 text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-yellow-400/10"
        >
          {isLoading ? <Loader2 className="animate-spin text-black" size={24} /> : "Create Account"}
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 font-bold cursor-pointer hover:underline uppercase tracking-widest text-[10px]"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
