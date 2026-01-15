"use client";

import React, { useState } from "react";
import {
  Scale,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  UserCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { closeAuthModal } from "@/lib/authModalEvents";

type UserRole = "user" | "lawyer";
export type AuthMode = "signin" | "signup";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  rememberMe: boolean;
}

interface LawBridgeAuthProps {
  initialMode?: AuthMode;
}

export default function LawBridgeAuth({
  initialMode = "signin",
}: LawBridgeAuthProps) {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === "signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    setError(null);

    if (isLogin) {
      // Sign in validation
      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        return false;
      }
    } else {
      // Sign up validation
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        setError("All fields are required");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return false;
      }

      if (!formData.agreeTerms) {
        setError("You must agree to the Terms & Conditions");
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
    }

    return true;
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      window.location.href = "/api/auth/google";
    } catch (err) {
      setError("Failed to initiate Google sign in. Please try again.");
      setLoading(false);
      console.error("Google sign in error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        // Sign in
        const result = await signIn(formData.email, formData.password);

        if (result.error) {
          setError(result.error);
        } else {
          setSuccess("Signed in successfully!");
          // Close modal after a short delay
          setTimeout(() => {
            closeAuthModal();
            // Reload to update auth state
            window.location.reload();
          }, 1500);
        }
      } else {
        // Sign up
        const result = await signUp(
          formData.email,
          formData.password,
          formData.fullName,
          formData.phone,
          userRole
        );

        if (result.error) {
          setError(result.error);
        } else {
          setSuccess(
            "Account created successfully! Please check your email inbox (and spam folder) for a verification link. You must verify your email before you can sign in."
          );
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
            rememberMe: false,
          });
          // Switch to sign in after a delay
          setTimeout(() => {
            setIsLogin(true);
            setSuccess(null);
          }, 5000);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900">LawBridge</h1>
              <p className="text-blue-600 text-sm font-semibold">Ethiopia</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Access Justice, Anytime, Anywhere
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
                isLogin
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
                !isLogin
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h3>
            <p className="text-gray-600 text-sm">
              {isLogin
                ? "Enter your credentials to access your dashboard"
                : "Fill in your details to get started"}
            </p>
          </div>

          {/* Role Selection - Only for Register */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Register as <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  aria-pressed={userRole === "user"}
                  onClick={() => setUserRole("user")}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    userRole === "user"
                      ? "border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-300"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-3 rounded-full ${
                        userRole === "user" ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <UserCircle
                        className={`w-8 h-8 ${
                          userRole === "user" ? "text-white" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className={`font-semibold text-lg ${
                          userRole === "user"
                            ? "text-blue-900"
                            : "text-gray-700"
                        }`}
                      >
                        User
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          userRole === "user"
                            ? "text-blue-700"
                            : "text-gray-600"
                        }`}
                      >
                        Get legal help & advice
                      </p>
                    </div>
                  </div>
                  {userRole === "user" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  aria-pressed={userRole === "lawyer"}
                  onClick={() => setUserRole("lawyer")}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    userRole === "lawyer"
                      ? "border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-300"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-3 rounded-full ${
                        userRole === "lawyer" ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <Briefcase
                        className={`w-8 h-8 ${
                          userRole === "lawyer" ? "text-white" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className={`font-semibold text-lg ${
                          userRole === "lawyer"
                            ? "text-blue-900"
                            : "text-gray-700"
                        }`}
                      >
                        Lawyer
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          userRole === "lawyer"
                            ? "text-blue-700"
                            : "text-gray-600"
                        }`}
                      >
                        Offer legal services
                      </p>
                    </div>
                  </div>
                  {userRole === "lawyer" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Social Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-lg py-3 px-4 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-800 font-medium">
                    {success}
                  </p>
                  {!isLogin && (
                    <p className="text-xs text-green-700 mt-2">
                      Didn't receive the email? Check your spam folder or{" "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className="underline font-semibold"
                      >
                        try signing in
                      </button>{" "}
                      after verification.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name - Only for Register */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone - Only for Register */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+251 9__ ___ ___"
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - Only for Register */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password - Only for Login */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Terms & Conditions - Only for Register */}
            {!isLogin && (
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-3.5 px-4 rounded-lg transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {isLogin
                    ? "Sign In"
                    : `Create ${
                        userRole === "lawyer" ? "Lawyer" : "User"
                      } Account`}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Switch Form Type */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>

          {/* Security Badge */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Your data is protected with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
