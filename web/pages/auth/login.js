import { useState } from "react";
import Axios from "../../lib/axios";
import { useAuth } from "../../states/auth";

const Login = () => {
  const { login } = useAuth();
  const [validateError, setValidateError] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/auth/login", form);
      login(res.data.user, res.data.accessToken);
      setError(null);
      setValidateError(null);
      console.log(res);
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 401 || err.response.status === 404) {
        return setValidateError(err.response.data.message);
      }
      setError(true);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-bgGr shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/30 -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-3xl   font-poiret text-center">look@me</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handleSubmit}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                      className="peer placeholder-transparent h-10 w-full border-b-[1px] border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  {validateError && (
                    <div>
                      <a className="text-xs text-red-700 border-b border-red-700">
                        {validateError}
                      </a>
                    </div>
                  )}
                  {error && (
                    <div>
                      <a className="text-xs text-red-700 border-b border-red-700">
                        <div>
                          <a className="text-xs text-red-700 border-b border-red-700">
                            An error occured, please try again !
                          </a>
                        </div>
                      </a>
                    </div>
                  )}
                  <div className="relative space-y-2">
                    <button
                      type="submit"
                      className="w-full focus:outline-none text-gray-600 text-sm py-2.5 px-5 rounded-md border border-gray-600 hover:bg-gray-50"
                    >
                      Log in
                    </button>

                    <button className="w-full text-[10px] text-right ">
                      <a className="border-b border-black/50 ">
                        Forgot Your Password?
                      </a>
                    </button>

                    <button
                      type="button"
                      className="w-full focus:outline-none text-primaryBlue text-sm py-2.5 px-5 rounded-md border border-primaryBlue hover:bg-green-50"
                    >
                      <a href="/auth/register">Sign Up</a>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
