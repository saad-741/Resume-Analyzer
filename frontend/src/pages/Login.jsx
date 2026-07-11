import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      await login(response.access, response.refresh);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid credentials");
    }
  };

  // Helper for consistent input styles
  const inputClass = `w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800
    text-sm text-white transition-all duration-200 outline-none
    focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500
    placeholder:text-slate-600`;

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8 text-center -mt-5">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Sign in
        </span>
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back
        </h1>
        <p className="text-slate-500 text-sm">
          Enter your details to sign in.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Username
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            className={inputClass}
            placeholder="name@company.com"
          />
          {errors.username && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={inputClass}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full mt-2 bg-orange-500 hover:bg-orange-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center"
        >
          {isSubmitting ? "Authenticating..." : "Sign in"}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-orange-400 hover:text-orange-300 transition-colors">
          Create an account
        </Link>
      </p>
    </div>
  );
}