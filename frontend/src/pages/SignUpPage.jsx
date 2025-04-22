import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessagesSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const { theme } = useThemeStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-base-100 animate-fade-in" data-theme={theme}>
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-base-100/80 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-200 animate-bounce">
                <MessagesSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold text-base-content">Create Account</h1>
              <p className="text-sm text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-base-content mb-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40 group-focus-within:text-primary" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-base-300 rounded-lg bg-base-100 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content mb-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40 group-focus-within:text-primary" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-base-300 rounded-lg bg-base-100 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content mb-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40 group-focus-within:text-primary" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 border border-base-300 rounded-lg bg-base-100 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <div className="p-1 rounded-full hover:bg-primary/10 transition-all duration-200">
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-base-content/40" />
                    ) : (
                      <Eye className="h-5 w-5 text-base-content/40" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-primary-content rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2 text-primary-content/70" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline hover:text-primary/80 transition-all duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:block">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share experiences, and keep your loved ones close"
        />
      </div>
    </div>
  );
};

export default SignUpPage;