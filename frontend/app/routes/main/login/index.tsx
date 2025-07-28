import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import type { TResponse } from "@/interface/globalInterface";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loggedUser } = useAppSelector((store) => store.auth);
  const [login, { isLoading, isError }] = useLoginMutation();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (loggedUser && !isError) {
      navigate(from, { replace: true });
    }
  }, [loggedUser, isError, from, navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const loginInfo = {
      email,
      password,
    };

    const res = (await login(loginInfo)) as TResponse;

    if (res?.data?.success) {
      const { user, accessToken } = res?.data?.data;
      dispatch(userLoggedIn({ user, token: accessToken }));
      localStorage.setItem("token", accessToken);
      toast.success("Login successful");
      setError("");
    }
    if (res?.error) {
      setError(res?.error?.data?.message);
      console.log(res);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="border rounded px-4 py-6 border-neutral-300">
          <form onSubmit={handleLogin} className="w-[90%] sm:w-[420px]">
            <div>
              <h2 className="text-2xl font-medium text-center">Login</h2>
            </div>
            <br />
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                placeholder="********"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <br />
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer text-base-100 bg-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
