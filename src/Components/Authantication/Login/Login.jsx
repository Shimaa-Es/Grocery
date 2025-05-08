import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import animation from "../../../assets/animations/loginAnimation.gif";
import { groceryContext } from "../../Layout/Layout";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "user@gmail.com",
      password: "User1234",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [logInError, setLogInError] = useState("");

  // Scrolling Bug Fixed
  window.scroll({ top: 0 });

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const { userLoggedInState } = useContext(groceryContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;

  if (isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Login handler
  const onSubmit = (data) => {
    // Simulated user database
    const users = JSON.parse(localStorage.getItem("grocery_users")) || [];

    // Check if user exists
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!user) {
      setLogInError("User not found. Please register.");
      navigate("/register");
    } else {
      setLogInError("");
      sessionStorage.setItem("grocery_userLoggedIn", JSON.stringify(true));
      setIsUserLoggedIn(true);
      navigate(from);
    }
  };

  return (
    <section className="h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8">
      <Fade in={true}>
        <Container>
          <div className="grid md:grid-cols-2">
            {/* Animation */}
            <div className="col hidden md:flex items-center justify-center">
              <img
                className="lg:max-h-80 max-h-[17rem]"
                src={animation}
                alt="login"
              />
            </div>
            {/* Form */}
            <div className="flex md:justify-start justify-center">
              <div className="flex items-center max-w-[26rem] p-4 h-80">
                <div className="lg:space-y-10 md:space-y-8 space-y-10">
                  {/* Form Title */}
                  <h3 className="text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl">
                    Log In
                  </h3>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-center lg:space-y-7 md:space-y-6 space-y-7"
                    action="login"
                    method="post">
                    {/* Email */}
                    <TextField
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      label="Email"
                      size="small"
                      error={errors.email ? true : false}
                      helperText={errors.email ? errors.email.message : ""}
                      fullWidth
                      color="success"
                      variant="outlined"
                    />

                    {/* Password */}
                    <TextField
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[A-Z])[a-zA-Z0-9]{6,}$/,
                          message:
                            "Minimum 6 characters with one uppercase letter",
                        },
                      })}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      size="small"
                      error={errors.password ? true : false}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                      color="success"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <VisibilityOff fontSize="inherit" />
                              ) : (
                                <Visibility fontSize="inherit" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* Display the alert only if there is a login error */}
                    {logInError && (
                      <p className="text-red-600 text-sm font-medium">
                        {logInError}
                      </p>
                    )}

                    {/* Submit-btn */}
                    <Button
                      sx={{ textTransform: "capitalize" }}
                      type="submit"
                      color="success"
                      variant="contained">
                      Log in
                    </Button>
                    {/* Register */}
                    <p className="text-sm text-gray-500">
                      Don't have an account?{" "}
                      <span
                        onClick={() => navigate("/register")}
                        className="text-green-600 cursor-pointer hover:underline">
                        Register
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Fade>
    </section>
  );
};

export default Login;
