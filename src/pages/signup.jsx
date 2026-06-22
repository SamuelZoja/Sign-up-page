import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Signup() {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert("Signup Successful");
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(100,116,139,0.08)]">
        <div className="mb-7 text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700">
            Sign Up
          </span>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-500 via-teal-400 to-emerald-500">
            Create your account
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign up with your details to get started.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-200"
            />
            {formik.errors.name && <p className="mt-2 text-sm text-rose-400">{formik.errors.name}</p>}
          </div>

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

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-200"
            />
            {formik.errors.confirmPassword && <p className="mt-2 text-sm text-rose-400">{formik.errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-linear-to-r from-cyan-400 via-teal-400 to-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-200/40 transition hover:from-cyan-300 hover:via-teal-300 hover:to-emerald-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/" className="font-semibold text-sky-600 hover:text-teal-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
