import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      alert("Login Successful");
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(100,116,139,0.08)]">
        <div className="mb-7 text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">
            Sign In
          </span>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-500 via-teal-400 to-emerald-500">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Use your account details to sign in and continue.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-200"
            />
            {formik.errors.email && <p className="mt-2 text-sm text-rose-400">{formik.errors.email}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-200"
            />
            {formik.errors.password && <p className="mt-2 text-sm text-rose-400">{formik.errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-linear-to-r from-cyan-400 via-teal-400 to-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-200/40 transition hover:from-cyan-300 hover:via-teal-300 hover:to-emerald-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-semibold text-cyan-600 hover:text-teal-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;