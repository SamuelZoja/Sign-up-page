import { useState } from "react";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const signupSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  children,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-xs font-medium tracking-[0.02em] text-slate-500 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm transition duration-150 outline-none ${
            error
              ? "border-rose-400 bg-rose-50 text-rose-900 focus:border-rose-500"
              : "border-slate-200 bg-white text-slate-900 focus:border-emerald-400"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-500 hover:text-slate-700"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(values, { abortEarly: false });
      setErrors({});
      alert("Login successful");
    } catch (err) {
      const fieldErrors = {};
      err.inner.forEach((error) => {
        fieldErrors[error.path] = error.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field
        label="Email Address"
        id="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
      />
      <Field
        label="Password"
        id="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.password}
      />

      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
          />
          Remember me
        </label>
        <button
          type="button"
          className="font-semibold text-emerald-500 hover:text-emerald-600"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.99]"
      >
        Sign in
      </button>

      <p className="mt-5 text-center text-xs text-slate-500">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-emerald-500 hover:text-emerald-600"
        >
          Create one
        </button>
      </p>
    </form>
  );
}

function SignupForm({ onSwitch }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(values, { abortEarly: false });
      setErrors({});
      alert("Signup successful");
    } catch (err) {
      const fieldErrors = {};
      err.inner.forEach((error) => {
        fieldErrors[error.path] = error.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field
        label="Full Name"
        id="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Oloye Ade"
        error={errors.name}
      />
      <Field
        label="Email Address"
        id="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
      />
      <Field
        label="Password"
        id="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Min. 8 chars, 1 uppercase, 1 number"
        error={errors.password}
      />
      <Field
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        placeholder="Re-enter your password"
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        className="w-full rounded-2xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:scale-[0.99]"
      >
        Create account
      </button>

      <p className="mt-5 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-emerald-500 hover:text-emerald-600"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default function AuthCard() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-300/10 backdrop-blur-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "login" ? "Sign in to your account" : "Get started today"}
          </p>
        </div>

        <div className="mb-6 flex gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-2xl py-2 text-sm font-semibold transition ${
              mode === "login"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-2xl py-2 text-sm font-semibold transition ${
              mode === "signup"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign up
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("signup")} />
        ) : (
          <SignupForm onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
