import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { IoMdLock, IoMdPerson } from "react-icons/io";
import { SiFacebook } from "react-icons/si";

import useActionMutation from "../queryFunctions/useActionMutation";
import { Link, useNavigate } from "react-router-dom";
import { showError } from "../components/Toaster";
import { GoVerified } from "react-icons/go";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, GOOGLE_CLIENT_ID } from "../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import GoogleButton from "react-google-button";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

// ==================== Schemas ==================== //
const signInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const signUpSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const forgotSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const resetSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  otp: yup.string().required("OTP is required"),
});

// ==================== Page Components (Outside Main Component) ==================== //
const SignInPage = ({
  signInForm,
  handleSubmit,
  onSignIn,
  loading,
  setCurrentPage,
  onSignInGoogle,
  onSignInFacebook,
}) => {
  const { register, formState } = signInForm;

useEffect(() => {
    const interval = setInterval(() => {
      if (window.FB) {
        window.FB.XFBML.parse();
        clearInterval(interval);
      }
    }, 100);
  }, []);
  return (
    <div className="auth-page-container">
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-illustration-circle"></div>
          <div className="auth-illustration-dots"></div>
          <h2 className="auth-visual-title">Find Your Next Rental</h2>
          <p className="auth-visual-description">
            Browse listings, connect with landlords, and discuss your favorite
            properties
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to manage your listings and participate in property
              discussions
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onSignIn)}>
            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              {formState.errors.email && (
                <p className="error-text">{formState.errors.email.message}</p>
              )}
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <IoMdLock />
                </span>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>
              {formState.errors.password && (
                <p className="error-text">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="auth-forgot-link">
              <div
                onClick={() => setCurrentPage("forgot")}
                className="auth-link-text"
              >
                Forgot password?
              </div>
            </div>

            <button
              type="submit"
              className="auth-primary-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-divider">
            <span className="auth-divider-text">or</span>
          </div>
          {/* <button
            onClick={onSignInGoogle}
            className="auth-primary-button google-btn new"
            style={{
              background: "#FFF",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <FcGoogle size={30} color="#4285F4" /> Sign in with Google
          </button> */}

          {/* <GoogleLoginButton
            className="google-login-btn"
            onClick={onSignInGoogle}
          /> */}

            <div className="social-btn-div">

          <button onClick={onSignInGoogle} className="gsi-material-button">
  <div className="gsi-material-button-state"></div>
  <div className="gsi-material-button-content-wrapper">
    <div className=" google-login-btn gsi-material-button-icon">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ display: "block",stroke: "none" }}
        className="google-login-btn"
      >
        <path stroke="none" fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path   stroke="none"  fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path  stroke="none"  fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path   stroke="none" fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        <path   stroke="none" fill="none" d="M0 0h48v48H0z" />
      </svg>
    </div>
    <span className="gsi-material-button-contents">Sign in with Google</span>
    <span style={{ display: "none" }}>Sign in with Google</span>
  </div>
</button>

      <button onClick={onSignInFacebook} className="fb-login-btn">
        <svg className="fb-icon" viewBox="0 0 36 36" fill="white" height="24" width="24">
          <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 9.202 6.906 16.791 15.819 17.87v-12.65H11.07v-5.22h4.749v-3.978c0-4.691 2.794-7.281 7.073-7.281 2.049 0 4.194.365 4.194.365v4.608h-2.363c-2.328 0-3.054 1.445-3.054 2.927v3.359h5.199l-.831 5.22h-4.368v12.65z" />
        </svg>
        <span className="fb-text">Continue with Facebook</span>
      </button>
            </div>



 

          {/* <FacebookLoginButton
            className="facebook-login-btn"
            onClick={onSignInFacebook}
          /> */}

          {/* <button
           onClick={onSignInGoogle}
            className="auth-primary-button facebook-btn new"
            style={{
              background: "#FFF",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <SiFacebook size={24} color="" /> Continue with Facebook
          </button> */}
          <div className="auth-divider">
            <span className="auth-divider-text">or</span>
          </div>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <button
              onClick={() => setCurrentPage("signup")}
              className="auth-link-button"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const SignUpPage = ({
  signUpForm,
  handleSubmit,
  onSignUp,
  loading,
  setCurrentPage,
}) => {
  const { register, formState } = signUpForm;
  return (
    <div className="auth-page-container">
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-illustration-circle"></div>
          <div className="auth-illustration-dots"></div>
          <h2 className="auth-visual-title">List and Discuss Rentals</h2>
          <p className="auth-visual-description">
            Add your own rental listings, join discussions, and explore
            properties from our community
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

          <form className="auth-form" onSubmit={handleSubmit(onSignUp)}>
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <IoMdPerson />
                </span>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Enter your full name"
                  {...register("name")}
                />
              </div>
              {formState.errors.name && (
                <p className="error-text">{formState.errors.name.message}</p>
              )}
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              {formState.errors.email && (
                <p className="error-text">{formState.errors.email.message}</p>
              )}
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <IoMdLock />
                </span>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Create a password"
                  {...register("password")}
                />
              </div>
              {formState.errors.password && (
                <p className="error-text">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <IoMdLock />
                </span>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                />
              </div>
              {formState.errors.confirmPassword && (
                <p className="error-text">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="auth-primary-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="auth-divider">
            <span className="auth-divider-text">or</span>
          </div>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <button
              onClick={() => setCurrentPage("signin")}
              className="auth-link-button"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ForgotPage = ({
  forgotForm,
  handleSubmit,
  onForgot,
  loading,
  setCurrentPage,
}) => {
  const { register, formState } = forgotForm;
  return (
    <div className="auth-page-container">
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-illustration-circle"></div>
          <div className="auth-illustration-dots"></div>
          <h2 className="auth-visual-title">Reset Your Password</h2>
          <p className="auth-visual-description">
            Enter your email and we'll send you a verification code to reset
            your password
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">Forgot Password</h1>
            <p className="auth-subtitle">
              Don't worry — it happens. We'll help you reset it.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onForgot)}>
            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              {formState.errors.email && (
                <p className="error-text">{formState.errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="auth-primary-button"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>

          <p style={{ marginTop: "20px" }} className="auth-switch-text">
            Remember your password?{" "}
            <button
              onClick={() => setCurrentPage("signin")}
              className="auth-link-button"
            >
              Back to Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ResetPage = ({
  resetForm,
  handleSubmit,
  onReset,
  loading,
  setCurrentPage,
}) => {
  const { register, formState } = resetForm;
  return (
    <div className="auth-page-container">
      <div className="auth-visual-section">
        <div className="auth-visual-content">
          <div className="auth-illustration-circle"></div>
          <div className="auth-illustration-dots"></div>
          <h2 className="auth-visual-title">Reset Your Password</h2>
          <p className="auth-visual-description">
            Enter your email and the OTP to reset your password
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
              Don't worry — it happens. We'll help you reset it.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onReset)}>
            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  {...register("email")}
                  disabled
                />
              </div>
              {formState.errors.email && (
                <p className="error-text">{formState.errors.email.message}</p>
              )}
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Verification Code</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <GoVerified />
                </span>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Enter verification code"
                  {...register("otp")}
                />
              </div>
              {formState.errors.otp && (
                <p className="error-text">{formState.errors.otp.message}</p>
              )}
            </div>

            <div className="auth-input-group">
              <label className="auth-label">New Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <IoMdLock />
                </span>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>
              {formState.errors.password && (
                <p className="error-text">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="auth-input-group">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <IoMdLock />
                </span>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
              </div>
              {formState.errors.confirmPassword && (
                <p className="error-text">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="auth-primary-button"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p style={{ marginTop: "20px" }} className="auth-switch-text">
            Remember your password?{" "}
            <button
              onClick={() => setCurrentPage("signin")}
              className="auth-link-button"
            >
              Back to Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Component ==================== //
const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState("signin");
  const navigate = useNavigate();

  // ------------- React Hook Form ------------- //
  const signInForm = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onSubmit",
  });
  const signUpForm = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onSubmit",
  });
  const forgotForm = useForm({
    resolver: yupResolver(forgotSchema),
    mode: "onSubmit",
  });
  const resetForm = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      if (data?.forgot) {
        resetForm.reset({ email: forgotForm.getValues("email") });
        setCurrentPage("reset");
        return;
      }
      if (data?.token) {
        const role = data?.user?.role;
        navigate(role === "Admin" ? "/AdminDashboard" : "/");
        localStorage.setItem("token", data?.token);
        localStorage.setItem("userData", JSON.stringify(data?.user));
      }
      setCurrentPage("signin");
      signInForm.reset();
      signUpForm.reset();
      forgotForm.reset();
      resetForm.reset();
    },
    onErrorCallback: (errmsg) => showError(errmsg),
  });

  // ==================== Handlers ==================== //
  const onSignIn = (data) => {
    triggerMutation({
      endPoint: "/auth/login",
      body: data,
      method: "post",
    });
  };

  const onSignInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const data = {
        name: user.displayName,
        email: user.email,
        profile_img: user.photoURL,
      };

      // Hit your backend
      triggerMutation({
        endPoint: "/auth/login-google",
        body: data,
        method: "post",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  const onSignInFacebook = async () => {
    const facebookProvider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const data = {
        name: user.displayName,
        email: user.email,
        profile_img: user.photoURL,
      };

      // Hit your backend
      triggerMutation({
        endPoint: "/auth/login-google",
        body: data,
        method: "post",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const onSignUp = (data) => {
    triggerMutation({
      endPoint: "/auth/register",
      body: data,
      method: "post",
    });
  };

  const onForgot = (data) => {
    triggerMutation({
      endPoint: "/auth/forgot-password",
      body: data,
      method: "post",
    });
  };

  const onReset = (data) => {
    triggerMutation({
      endPoint: "/auth/reset-password",
      body: data,
      method: "post",
    });
  };

  return (
    <>
      {currentPage === "signin" && (
        <SignInPage
          signInForm={signInForm}
          handleSubmit={signInForm.handleSubmit}
          onSignIn={onSignIn}
          onSignInGoogle={onSignInGoogle}
          onSignInFacebook={onSignInFacebook}
          loading={loading}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "signup" && (
        <SignUpPage
          signUpForm={signUpForm}
          handleSubmit={signUpForm.handleSubmit}
          onSignUp={onSignUp}
          loading={loading}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "forgot" && (
        <ForgotPage
          forgotForm={forgotForm}
          handleSubmit={forgotForm.handleSubmit}
          onForgot={onForgot}
          loading={loading}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "reset" && (
        <ResetPage
          resetForm={resetForm}
          handleSubmit={resetForm.handleSubmit}
          onReset={onReset}
          loading={loading}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default AuthPages;
