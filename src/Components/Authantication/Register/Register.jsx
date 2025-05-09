import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("grocery_users")) || [];
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      setMessage("This email is already registered. Please log in.");
      return;
    }

    const updatedUsers = [...users, formData];
    localStorage.setItem("grocery_users", JSON.stringify(updatedUsers));
    sessionStorage.setItem("grocery_userLoggedIn", JSON.stringify(true));

    // تسجيل الدخول مباشرة
    const loginUser = updatedUsers.find(
      (user) => user.email === formData.email
    );
    sessionStorage.setItem("grocery_currentUser", JSON.stringify(loginUser));

    navigate("/"); // أو "/dashboard" حسب ما تحب
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Register</h2>

        {message && (
          <p className="text-red-500 text-center text-sm mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <span
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-2 top-2 cursor-pointer text-gray-600">
                {formData.showPassword ? "🙈" : "👁"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
