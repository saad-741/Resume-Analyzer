import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Registration failed");
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800
    text-sm text-white transition-all duration-200 outline-none
    focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500
    placeholder:text-slate-600`;

  const labelClass = "block text-xs font-semibold text-slate-400 mb-1.5";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Get started
        </span>
        <h1 className="text-2xl font-bold text-white mb-2">
          Create an account
        </h1>
        <p className="text-slate-500 text-sm">
          Get started with our platform today.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input {...register("first_name")} className={inputClass} placeholder="Jane" />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input {...register("last_name")} className={inputClass} placeholder="Doe" />
          </div>
        </div>

        {/* Fields */}
        <div>
          <label className={labelClass}>Username</label>
          <input {...register("username", { required: true })} className={inputClass} placeholder="johndoe" />
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" {...register("email", { required: true })} className={inputClass} placeholder="jane@example.com" />
        </div>

        <div>
          <label className={labelClass}>Password</label>
          <input type="password" {...register("password", { required: true })} className={inputClass} placeholder="••••••••" />
        </div>

        <button
          disabled={isSubmitting}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:shadow-none"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-orange-400 hover:text-orange-300 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}