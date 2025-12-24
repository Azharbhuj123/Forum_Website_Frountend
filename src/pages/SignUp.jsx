import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { IoMdLock, IoMdPerson } from "react-icons/io";
import useActionMutation from "../queryFunctions/useActionMutation";
import { Link, useNavigate } from "react-router-dom";
import { showError } from "../components/Toaster";
import { GoVerified } from "react-icons/go";

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
  oldPass: yup
    .string() 
    .required("Old Password is required"),
  otp: yup.string().required("OTP is required"),
});

// ==================== Page Components (Outside Main Component) ==================== //
const SignInPage = ({ signInForm, handleSubmit, onSignIn, loading, setCurrentPage }) => {
  const { register, formState } = signInForm;
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

const SignUpPage = ({ signUpForm, handleSubmit, onSignUp, loading, setCurrentPage }) => {
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
                <p className="error-text">{formState.errors.password.message}</p>
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

const ForgotPage = ({ forgotForm, handleSubmit, onForgot, loading, setCurrentPage }) => {
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

const ResetPage = ({ resetForm, handleSubmit, onReset, loading, setCurrentPage }) => {
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
              <label className="auth-label">Old Password</label>
              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  <IoMdLock />
                </span>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Enter your old password"
                  {...register("oldPass")}
                />
              </div>
              {formState.errors.oldPass && (
                <p className="error-text">{formState.errors.oldPass.message}</p>
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
                <p className="error-text">{formState.errors.password.message}</p>
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
  const signInForm = useForm({ resolver: yupResolver(signInSchema), mode: "onSubmit" });
  const signUpForm = useForm({ resolver: yupResolver(signUpSchema), mode: "onSubmit" });
  const forgotForm = useForm({ resolver: yupResolver(forgotSchema), mode: "onSubmit" });
  const resetForm = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit"
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