import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { IoMdLock, IoMdPerson } from "react-icons/io";
import useActionMutation from "../queryFunctions/useActionMutation";
import { useNavigate } from "react-router-dom";
import { showError } from "../components/Toaster";

// Yup schemas
const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const signUpSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState("signin");

  // React Hook Form setup
  const {
    register: signInRegister,
    handleSubmit: handleSignInSubmit,
    reset: signInReset,
    formState: { errors: signInErrors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    reset: signUpReset,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const navigate = useNavigate();



  const { triggerMutation, loading } = useActionMutation({
      onSuccessCallback: (data) => {
        if(data?.token){
            navigate(`/`)
            localStorage.setItem("token", data?.token)
            localStorage.setItem("userData",JSON.stringify(data?.user))
        }
       setCurrentPage("signin")
       signUpReset();
       signInReset();
      },
      onErrorCallback: (errmsg) => {
          showError(errmsg)
      },
    });

  const onSignIn = (data) => {
    console.log("Signin data:", data);

triggerMutation({
      endPoint: '/auth/login' ,
      body: data,
      method: "post",
    });
    
   
    // handle sign in API call
  };

  const onSignUp = (data) => {
    console.log("Signup data:", data);
    // handle sign up API call
    triggerMutation({
      endPoint: '/auth/register' ,
      body: data,
      method: "post",
    });
  };

  const SignInPage = () => (
    <div className="auth-page-container">
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-illustration-circle"></div>
          <div className="auth-illustration-dots"></div>
          <h2 className="auth-visual-title">Find Your Next Rental</h2>
          <p className="auth-visual-description">
            Browse listings, connect with landlords, and discuss your favorite properties
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to manage your listings and participate in property discussions
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSignInSubmit(onSignIn)}>
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="signin-email">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon"><MdEmail /></span>
                <input
                  type="email"
                  id="signin-email"
                  className="auth-input"
                  placeholder="Enter your email"
                  {...signInRegister("email")}
                />
              </div>
              {signInErrors.email && <p className="error-text">{signInErrors.email.message}</p>}
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="signin-password">Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon"><IoMdLock /></span>
                <input
                  type="password"
                  id="signin-password"
                  className="auth-input"
                  placeholder="Enter your password"
                  {...signInRegister("password")}
                />
              </div>
              {signInErrors.password && <p className="error-text">{signInErrors.password.message}</p>}
            </div>

            <div className="auth-forgot-link">
              <a href="#" className="auth-link-text">Forgot password?</a>
            </div>

            <button type="submit" className="auth-primary-button" disabled={loading}> {loading ? "Signing In..." : "Sign In"}</button>
          </form>

          <div className="auth-divider"><span className="auth-divider-text">or</span></div>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <button onClick={() => setCurrentPage("signup")} className="auth-link-button">
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const SignUpPage = () => (
    <div className="auth-page-container">
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-illustration-circle"></div>
          <div className="auth-illustration-dots"></div>
          <h2 className="auth-visual-title">List and Discuss Rentals</h2>
          <p className="auth-visual-description">
            Add your own rental listings, join discussions, and explore properties from our community
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">Join the Rental Community</h1>
            <p className="auth-subtitle">
              Share your listings and participate in property discussions
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSignUpSubmit(onSignUp)}>
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="signup-name">Full Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon"><IoMdPerson /></span>
                <input
                  type="text"
                  id="signup-name"
                  className="auth-input"
                  placeholder="Enter your full name"
                  {...signUpRegister("name")}
                />
              </div>
              {signUpErrors.name && <p className="error-text">{signUpErrors.name.message}</p>}
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="signup-email">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon"><MdEmail /></span>
                <input
                  type="email"
                  id="signup-email"
                  className="auth-input"
                  placeholder="Enter your email"
                  {...signUpRegister("email")}
                />
              </div>
              {signUpErrors.email && <p className="error-text">{signUpErrors.email.message}</p>}
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="signup-password">Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon"><IoMdLock /></span>
                <input
                  type="password"
                  id="signup-password"
                  className="auth-input"
                  placeholder="Create a password"
                  {...signUpRegister("password")}
                />
              </div>
              {signUpErrors.password && <p className="error-text">{signUpErrors.password.message}</p>}
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="signup-confirm-password">Confirm Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon"><IoMdLock /></span>
                <input
                  type="password"
                  id="signup-confirm-password"
                  className="auth-input"
                  placeholder="Confirm your password"
                  {...signUpRegister("confirmPassword")}
                />
              </div>
              {signUpErrors.confirmPassword && <p className="error-text">{signUpErrors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="auth-primary-button">{loading ? "Loading..." : "Create Account"}</button>
          </form>

          <div className="auth-divider"><span className="auth-divider-text">or</span></div>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <button onClick={() => setCurrentPage("signin")} className="auth-link-button">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return <>{currentPage === "signin" ? <SignInPage /> : <SignUpPage />}</>;
};

export default AuthPages;
