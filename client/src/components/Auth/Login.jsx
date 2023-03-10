import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosUserInstance } from "../../instance/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/home");
      }
    } catch (error) {}
  });

  const handleusername = (e) => {
    setUsername(e.target.value);
    setErrors({});
  };

  const handlepassword = (e) => {
    setPassword(e.target.value);
    setErrors({});
  };

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      if (!username.trim()) {
        setErrors(() => ({
          username: "Username is required",
        }));
        return;
      }

      if (!password.trim()) {
        setErrors(() => ({
          password: "Password is required",
        }));
        return;
      }
      console.log(username, password);
      const res = await axiosUserInstance.post("/login", {
        username,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        toast.error("invalid username/password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  return (
    <div className="flex h-screen bg-gray-200">
      <ToastContainer />
      <div className="m-auto w-full max-w-sm">
        <div className="text-center text-2xl font-medium text-gray-900">
          Login
        </div>
        <div className="bg-white p-8 mt-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`border-2 p-3 w-full rounded-lg ${
                  errors.username ? "border-red-500" : ""
                }`}
                type="text"
                id="username"
                value={username}
                onChange={(event) => handleusername(event)}
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`border-2 p-3 w-full rounded-lg ${
                  errors.password ? "border-red-500" : ""
                }`}
                type="password"
                id="password"
                value={password}
                onChange={(event) => handlepassword(event)}
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg p-3 w-full font-medium"
              style={{ backgroundColor: "rgba(25, 199, 163, 100)" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
