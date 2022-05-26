import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Axios from "../../lib/axios";
const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passportAlert, setPassportAlert] = useState(false);
  const [againPassword, setAgainPassword] = useState("");
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPassportAlert(false);

    if (form.password !== againPassword) {
      return setPassportAlert(true);
    }
    try {
      const res = await Axios.post("/auth/register", form, {});

      res.data && router.push("/auth/login");
    } catch (err) {
      setError(err.response);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-bgGr shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/30 -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <div className="relative min-w-[320px] sm:min-w-[420px] px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="py-5">
                <h1 className="text-3xl   font-poiret text-center">look@me</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className=" text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                        autoComplete="off"
                        id="username"
                        name="username"
                        type="text"
                        className="peer text-sm placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="User Name"
                      />
                      <label
                        htmlFor="username"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-base"
                      >
                        User Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="peer text-sm placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer text-sm placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        onChange={(e) => setAgainPassword(e.target.value)}
                        autoComplete="off"
                        id="passwordAgain"
                        name="passwordAgain"
                        type="password"
                        className="peer text-sm placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password Again"
                      />
                      <label
                        htmlFor="passwordAgain"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password Again
                      </label>
                      {passportAlert && (
                        <>
                          <div className="py-2">
                            <a className="text-xs text-red-700 border-b border-red-700 font-semibold">
                              Passports do not match !
                            </a>
                          </div>
                        </>
                      )}
                      {error && (
                        <>
                          <div className="py-2">
                            <a className="text-xs text-red-700 border-b border-red-700 font-semibold">
                              {error.data.errors.message}
                            </a>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="relative space-y-2">
                      <button
                        type="submit"
                        className="w-full focus:outline-none text-primaryBlue text-sm py-2.5 px-5 rounded-md border border-primaryBlue hover:bg-green-50"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                  <button className="w-full text-sm text-right ">
                    <a
                      href="/auth/login"
                      className="border-b border-black/50 hover:text-primaryBlue"
                    >
                      Log In
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
