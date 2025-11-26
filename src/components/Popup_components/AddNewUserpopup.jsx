import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FirstName_svg from "../Svg_components/FirstName_svg";
import MailAddress_svg from "../Svg_components/mailAddress_svg";
import Password_svg from "../Svg_components/Password_svg";
import UserRole_svg from "../Svg_components/UserRole_svg";
import PhoneNumber_svg from "../Svg_components/PhoneNumber_svg";
import Location_svg from "../Svg_components/Location_svg";
import Uplode_svg from "../Svg_components/Uplode_svg";
import dp_img from "../../assets/Images/dp-img.png";
import Close_svg from "../Svg_components/Close_svg";
import { showError } from "../Toaster";
import useActionMutation from "../../queryFunctions/useActionMutation";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../queryFunctions/queryFunctions";

 

// Yup validation schema
const schema = yup.object({
  lastName: yup.string().required("Last name is required"),
  firstName: yup.string().required("First name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  userRole: yup.string().required("User role is required").default("User"),
  profilePicture: yup
    .mixed()
    .test(
      "required",
      "Profile picture is required",
      (value) => value && value.length > 0
    ),
});

const AddNewUserpopup = ({ closePopup, refetch, edit_id }) => {
  const schema = yup.object({
    lastName: yup.string().required("Last name is required"),
    firstName: yup.string().required("First name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: edit_id 
      ? yup.string().min(8, "Password must be at least 8 characters").optional()
      : yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: edit_id
      ? yup.string().oneOf([yup.ref("password"), null], "Passwords must match").optional()
      : yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
    userRole: yup.string().required("User role is required").default("User"),
    profilePicture: edit_id
      ? yup.mixed().optional()
      : yup
          .mixed()
          .required("Profile picture is required")
          .test(
            "fileLength",
            "Profile picture is required",
            (value) => value && value.length > 0
          ),
  });

  const [preview, setPreview] = useState(dp_img);
  const fileInputRef = useRef(null);
  const hasInitialized = useRef(false);
  
  // Get default values based on mode
  const getDefaultValues = () => {
    if (edit_id) {
      return {
        userRole: "User",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        bio: "",
        location: "",
        profilePicture: null,
      };
    }
    return {
      userRole: "User",
      password: "",
      confirmPassword: "",
      profilePicture: null,
    };
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-user-view", edit_id],
    queryFn: () => fetchData(`/admin/view-user/${edit_id}`),
    keepPreviousData: true,
    enabled: !!edit_id,
  });

  // Fixed useEffect - only run when necessary and avoid infinite loops
  useEffect(() => {
    // Only proceed if we have data, are in edit mode, and haven't initialized yet
    if (!data || !edit_id || hasInitialized.current) return;

    const nameParts = data.name ? data.name.split(" ") : ["", ""];
    
    const resetData = {
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      username: data.username || nameParts[0] || "",
      email: data.email || "",
      phoneNumber: data.phone_number || "",
      bio: data.basic_info?.bio || "",
      location: data.basic_info?.location || "",
      website: data.basic_info?.website || "",
      userRole: data.role || "User",
      profilePicture: null,
    };

    // Mark as initialized BEFORE resetting to prevent re-runs
    hasInitialized.current = true;
    
    reset(resetData);

    if (data.profile_img) {
      setPreview(data.profile_img);
    }
  }, [data, edit_id, reset]); // Add all dependencies

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview && preview !== dp_img && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []); // Empty dependency array - only run on unmount

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (res) => {
      refetch();
      closePopup();
    },
    onErrorCallback: (errmsg) => {
      showError(errmsg);
    },
  });

  const onSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userRole", formData.userRole);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      
      // Only append password if provided
      if (formData.password) {
        formDataToSend.append("password", formData.password);
        formDataToSend.append("confirmPassword", formData.confirmPassword);
      }
      
      formDataToSend.append("phoneNumber", formData.phoneNumber || "");
      formDataToSend.append("location", formData.location || "");
      formDataToSend.append("bio", formData.bio || "");

      if (formData.profilePicture && formData.profilePicture[0]) {
        formDataToSend.append("profilePicture", formData.profilePicture[0]);
      }

      const endpoint = edit_id ? `/admin/update-user/${edit_id}` : "/admin/add-user";
      const method = edit_id ? "put" : "post";

      triggerMutation({
        endPoint: endpoint,
        method: method,
        body: formDataToSend,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    field.onChange(e.target.files);
    
    // Clean up previous preview URL if it was a blob
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(dp_img);
    }
  };

  // If loading in edit mode, show loading state
  if (edit_id && isLoading) {
    return (
      <div className="popup-overly-box">
        <div className="popup-box">
          <div className="loading-state">Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overly-box">
      <div className="popup-box">
        <div className="popup-heading">
          <span>
            <h2>{edit_id ? "Edit User" : "Add New User"}</h2>
            <p>
              {edit_id 
                ? "Update user account information" 
                : "Create a new user account with administrative controls"
              }
            </p>
          </span>
          <div className="close-btn" onClick={closePopup}>
            <span>
              <Close_svg />
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="Add-New-User-box">
            {/* Profile Photo */}
            <div className="Profile-Photo">
              <div className="Profile-Photo-dp-box">
                <div
                  className="Profile-Photo-img"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ cursor: "pointer" }}
                >
                  <img src={preview} alt="Profile Preview" />
                </div>

                <div className="Profile-Photo-icon-uplode">
                  <Controller
                    name="profilePicture"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e, field)}
                      />
                    )}
                  />
                  <Uplode_svg />
                </div>
              </div>
              {errors.profilePicture && (
                <p className="error-text">{errors.profilePicture.message}</p>
              )}

              <span>
                <h2>Profile Photo</h2>
                <p>Upload a profile picture for the user</p>
              </span>
            </div>

            {/* User Info */}
            <div className="Add-New-User-group-box">
              <div className="Add-New-User-group Haf-width">
                <span>
                  <FirstName_svg />
                  <label>Last Name *</label>
                </span>
                <input type="text" {...register("lastName")} />
                {errors.lastName && (
                  <p className="error-text">{errors.lastName.message}</p>
                )}
              </div>

              <div className="Add-New-User-group Haf-width">
                <span>
                  <FirstName_svg />
                  <label>First Name *</label>
                </span>
                <input type="text" {...register("firstName")} />
                {errors.firstName && (
                  <p className="error-text">{errors.firstName.message}</p>
                )}
              </div>

              <div className="Add-New-User-group">
                <span>
                  <FirstName_svg />
                  <label>Username *</label>
                </span>
                <input type="text" {...register("username")} />
                {errors.username && (
                  <p className="error-text">{errors.username.message}</p>
                )}
                <p>This will be displayed publicly</p>
              </div>

              <div className="Add-New-User-group">
                <span>
                  <MailAddress_svg />
                  <label>Email Address *</label>
                </span>
                <input type="email" {...register("email")} />
                {errors.email && (
                  <p className="error-text">{errors.email.message}</p>
                )}
              </div>

              {!edit_id && (
                <>
                  <div className="Add-New-User-group Haf-width">
                    <span>
                      <Password_svg />
                      <label>Password *</label>
                    </span>
                    <input type="password" {...register("password")} />
                    {errors.password && (
                      <p className="error-text">{errors.password.message}</p>
                    )}
                    <p>Minimum 8 characters</p>
                  </div>

                  <div className="Add-New-User-group Haf-width">
                    <span>
                      <Password_svg />
                      <label>Confirm Password *</label>
                    </span>
                    <input type="password" {...register("confirmPassword")} />
                    {errors.confirmPassword && (
                      <p className="error-text">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </>
              )}

              {edit_id && (
                <>
                  <div className="Add-New-User-group Haf-width">
                    <span>
                      <Password_svg />
                      <label>New Password</label>
                    </span>
                    <input type="password" {...register("password")}  />
                    {errors.password && (
                      <p className="error-text">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="Add-New-User-group Haf-width">
                    <span>
                      <Password_svg />
                      <label>Confirm New Password</label>
                    </span>
                    <input type="password" {...register("confirmPassword")}  />
                    {errors.confirmPassword && (
                      <p className="error-text">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </>
              )}

              <div className="Add-New-User-group">
                <span>
                  <UserRole_svg />
                  <label>User Role *</label>
                </span>
                <input disabled type="text" {...register("userRole")} />
                {errors.userRole && (
                  <p className="error-text">{errors.userRole.message}</p>
                )}
                <p>Standard user privileges</p>
              </div>

              <div className="Add-New-User-group Haf-width">
                <span>
                  <PhoneNumber_svg />
                  <label>Phone Number</label>
                </span>
                <input type="number" {...register("phoneNumber")} />
              </div>

              <div className="Add-New-User-group Haf-width">
                <span>
                  <Location_svg />
                  <label>Location</label>
                </span>
                <input type="text" {...register("location")} />
              </div>

              <div className="Add-New-User-group">
                <span>
                  <label>Bio</label>
                </span>
                <textarea
                  placeholder="Tell us about this user..."
                  {...register("bio")}
                />
              </div>
            </div>
          </div>

          <div className="popup-btn-box">
            <button type="button" className="no-bg" onClick={closePopup}>
              {edit_id ? "Close" : "Cancel"} 
            </button>
            {!edit_id &&(

            <button type="submit" disabled={loading}>
              {loading 
                ? (edit_id ? "Updating..." : "Creating...") 
                : (edit_id ? "Update User" : "Create User")
              }
            </button>
            )}

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUserpopup;

