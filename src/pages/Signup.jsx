import React, { useState } from "react";
import supabase from "../supabase/auth";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <>
      {isloading && <Loader />}
      <div className="flex min-h-screen flex-1">
        <div
          className="relative lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1612366272533-cb0cc3074fc7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 hidden lg:flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold text-center p-4">
              Renting Made Easy
              <br /> "Find what you need, when you need it."
            </h2>
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 w-full lg:w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://dpbexlknorwqhblxxmfl.supabase.co/storage/v1/object/sign/Assets/rentiq-high-resolution-logo-transparent.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBc3NldHMvcmVudGlxLWhpZ2gtcmVzb2x1dGlvbi1sb2dvLXRyYW5zcGFyZW50LnBuZyIsImlhdCI6MTczNzQ2NTc0MSwiZXhwIjo0ODkxMDY1NzQxfQ.xuU4RhE0QuAtjicJoDLz01F9fkqJWKIndBuIEtb4Xgo&t=2025-01-21T13%3A22%3A22.166Z"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Create a new Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={signup} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    autoComplete="name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {error && <h1 className="text-rose font-bold">{error}</h1>}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-rose px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
