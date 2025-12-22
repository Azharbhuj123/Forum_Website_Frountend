import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import Footer from "../components/main-web/Footer";
import profile from "../assets/Images/profile.png";
import Switch from "react-switch"; // make sure this is installed
import { Location_Svg, Webiste_SVg } from "../components/Svg_components/Svgs";
import useActionMutation from "../queryFunctions/useActionMutation";
import { showError, showSuccess } from "../components/Toaster";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../queryFunctions/queryFunctions";

const profileSchema = yup.object({
  name: yup.string().required("Display name is required"),
  bio: yup.string().max(500, "Bio must be less than 500 characters"),
  location: yup.string(),
  website: yup.string().url("Please enter a valid URL"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[+]?[\d\s\-()]*$/, "Please enter a valid phone number"),
password: yup
  .string()
  .nullable()
  .notRequired()
  .test(
    "password-length",
    "Password must be at least 6 characters",
    function (value) {
      if (!value) return true; // user ne password nahi dala → OK
      return value.length >= 6; // user ne dala → length check
    }
  ),
  // twofactor: yup.string(),
  coverPhoto: yup.mixed(),
  profilePhoto: yup.mixed(),
});

export default function EditProfile() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [publicProfile, setPublicProfile] = useState(false);
  const [showEmailPublic, setShowEmailPublic] = useState(false);
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [preview, setPreview] = useState(userData?.profile_img);
  const [preview_cover, setPreviewCover] = useState(null);


  const { data, isLoading } = useQuery({
    queryKey: ["user-detail"],
    queryFn: () =>
      fetchData(
        `/auth/my-detail`
      ),
    keepPreviousData: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      location: "",
      website: "",
      email: "",
      phone: "",
      password: "",
      //  twofactor: "",
      coverPhoto: null,
      profilePhoto: null,
    },
  });



  useEffect(() => {
  if (data) {
    reset({
      name: data.name || "",
      bio: data.basic_info?.bio || "",
      location: data.basic_info?.location || "",
      website: data.basic_info?.website || "",
      email: data.email || "",
      phone: data.phone_number || "",
      coverPhoto: data.cover_img || null,
      profilePhoto: data.profile_img || null,
      password: "" // leave blank for security
    });
    setPublicProfile(data.privacy_settings?.public_profile)
    setShowEmailPublic(data.privacy_settings?.public_email)
    setNotifyByEmail(data.privacy_settings?.email_notify)
    setPreview(data?.profile_img)
    setPreviewCover(data?.cover_img)
  }
}, [data, ]);







const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
       showSuccess("Profile updated successfully");
    },
    onErrorCallback: (errmsg) => {
      console.log(errmsg);
      showError(errmsg);
    },
  });


 const onSubmit = (data) => {
  const formData = new FormData();

  // Append normal text fields
  formData.append("name", data.name);
  formData.append("bio", data.bio);
  formData.append("location", data.location);
  formData.append("website", data.website);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("password", data.password);

  // Append boolean values (must convert to string)
  formData.append("publicProfile", publicProfile ? "true" : "false");
  formData.append("showEmailPublic", showEmailPublic ? "true" : "false");
  formData.append("notifyByEmail", notifyByEmail ? "true" : "false");

  // Append files only if selected
  if (data.coverPhoto instanceof File) {
    formData.append("coverPhoto", data.coverPhoto);
  }

  if (data.profilePhoto instanceof File) {
    formData.append("profilePhoto", data.profilePhoto);
  }

  // Debug: show all values
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

 triggerMutation({
      endPoint: `/auth/update-profile`,
      body: formData,
      method: "patch",
    });
};


  const triggerFileInput = (ref) => ref.current.click();

  const handleChangeSwitch = (value, state) => state(value);

  const coverPhotoRef = useRef(null);
  const profilePhotoRef = useRef(null);

  return (
    <div>
      <AdminDashboardheader />
      <div className="feautures-main Dashboard-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="smitchell-edit-container">
            <h1 className="smitchell-edit-title">Edit Profile</h1>
            <div className="cover-contianer">
              <h2 className="smitchell-edit-section-header">
                Profile & Cover Photos
              </h2>

              {/* --- Cover Photo Section --- */}
              <div className="smitchell-edit-cover-photo-section">
                <p className="smitchell-edit-label">Cover Photo</p>

                <Controller
                  control={control}
                  name="coverPhoto"
                  render={({ field }) => (
                    <div
                      className="smitchell-edit-drag-drop-area"
                      onClick={() => triggerFileInput(coverPhotoRef)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];

                        field.onChange(file); // update react-hook-form
                        console.log(file, "file");

                        if (file) {
                          setPreviewCover(URL.createObjectURL(file)); // update preview UI
                        }
                      }}
                    >
                      {preview_cover ? (
                        <div className="smitchell-edit-upload-icon">
                          <img
                            src={preview_cover}
                            className="smitchell-edit-cover-preview"
                            alt="cover preview"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="smitchell-edit-upload-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                              fill="none"
                            >
                              <path
                                d="M24 6V30"
                                stroke="#EF7235"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M34 16L24 6L14 16"
                                stroke="#EF7235"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M42 30V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V30"
                                stroke="#EF7235"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="smitchell-edit-drag-text">
                            Drag and drop photos here
                          </p>
                          <p className="smitchell-edit-recommended-size">
                            Recommended size: 1500 × 500px
                          </p>
                          <p className="smitchell-edit-or-text">
                            or click to browse
                          </p>

                          <button
                            className="smitchell-edit-choose-button"
                            type="button"
                          >
                            Choose Files
                          </button>
                        </>
                      )}

                      <input
                        type="file"
                        ref={coverPhotoRef}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          field.onChange(file); // FORM UPDATE
                          if (file) {
                            setPreviewCover(URL.createObjectURL(file)); // PREVIEW UPDATE
                          }
                        }}
                        className="smitchell-edit-hidden-input"
                        accept="image/*"
                      />
                    </div>
                  )}
                />
              </div>

              {/* --- Profile Photo Section --- */}
              <h2 className="smitchell-edit-section-header">Profile Photo</h2>

              <Controller
                control={control}
                name="profilePhoto"
                render={({ field }) => (
                  <div className="smitchell-edit-profile-upload">
                    <div
                      className="smitchell-edit-profile-avatar-wrapper"
                      onClick={() => triggerFileInput(profilePhotoRef)}
                    >
                      <img
                        src={preview} // SHOW PREVIEW HERE
                        alt="Profile"
                        className="smitchell-edit-profile-avatar"
                      />

                      <div className="smitchell-edit-camera-icon-overlay">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                        >
                          <path
                            d="M2.66699 4.66669C3.77156 4.66669 4.66699 3.77126 4.66699 2.66669C4.66699 1.56212 3.77156 0.666687 2.66699 0.666687C1.56242 0.666687 0.666992 1.56212 0.666992 2.66669C0.666992 3.77126 1.56242 4.66669 2.66699 4.66669Z"
                            stroke="white"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="smitchell-edit-profile-text-group">
                      <p className="smitchell-edit-upload-text">
                        Upload a new profile photo
                      </p>
                      <p className="smitchell-edit-recommended-size">
                        Recommended size: 400 × 400px
                      </p>
                    </div>

                    <input
                      type="file"
                      ref={profilePhotoRef}
                      className="smitchell-edit-hidden-input"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(file);

                        if (file) {
                          const url = URL.createObjectURL(file);
                          setPreview(url); // UPDATE PREVIEW
                        }
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="basic-info-form-container unique-form-wrapper">
            <h2 className="basic-info-form-title custom-section-title">
              Basic Information
            </h2>
            <div className="form-field-group">
              <label htmlFor="name" className="form-label custom-label">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input unique-display-name-input"
                placeholder="Enter your display name"
                {...register("name")}
              />
              {errors.name && (
                <span className="error-text">{errors.name.message}</span>
              )}
            </div>

            <div className="form-field-group">
              <label htmlFor="bio" className="form-label custom-label">
                Bio
              </label>
              <textarea
                id="bio"
                className="form-textarea unique-bio-textarea"
                placeholder="Tell us about yourself..."
                {...register("bio")}
              ></textarea>
              {errors.bio && (
                <span className="error-text">{errors.bio.message}</span>
              )}
            </div>

            <div className="form-field-group">
              <label htmlFor="location" className="form-label custom-label">
                <Location_Svg /> Location
              </label>
              <input
                type="text"
                id="location"
                className="form-input unique-location-input"
                placeholder="Enter your location"
                {...register("location")}
              />
              {errors.location && (
                <span className="error-text">{errors.location.message}</span>
              )}
            </div>

            <div className="form-field-group">
              <label htmlFor="website" className="form-label custom-label">
                <Webiste_SVg /> Website
              </label>
              <input
                type="text"
                id="website"
                className="form-input unique-website-input"
                placeholder="Enter your website URL"
                {...register("website")}
              />
              {errors.website && (
                <span className="error-text">{errors.website.message}</span>
              )}
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="basic-info-form-container unique-form-wrapper">
            <h2 className="basic-info-form-title custom-section-title">
              Contact Information
            </h2>

            <div className="form-field-group">
              <label htmlFor="email" className="form-label custom-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input unique-display-name-input"
                placeholder="Enter your email address"
                {...register("email")}
                disabled
              />
              {errors.email && (
                <span className="error-text">{errors.email.message}</span>
              )}
            </div>

            <div className="form-field-group">
              <label htmlFor="phone" className="form-label custom-label">
                Phone Number (Optional)
              </label>
              <input
                type="text"
                id="phone"
                className="form-input unique-location-input"
                placeholder="Enter your phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone.message}</span>
              )}
            </div>
          </div>

          {/* PRIVACY SETTINGS */}
          <div className="basic-info-form-container unique-form-wrapper">
            <h2 className="basic-info-form-title custom-section-title">
              Privacy Settings
            </h2>
            <div className="title-box">
              <div className="head">
                <h3>Public Profile</h3>
                <p>Allow others to view your profile and reviews</p>
              </div>
              <Switch
                onChange={(checked) =>
                  handleChangeSwitch(checked, setPublicProfile)
                }
                checked={publicProfile}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={`#DF5750`}
                offColor="#ccc"
                onHandleColor="#fff"
                offHandleColor="#fff"
              />
            </div>
            <div className="title-box">
              <div className="head">
                <h3>Show Email to Public</h3>
                <p>Display your email address on your public profile</p>
              </div>
              <Switch
                onChange={(checked) =>
                  handleChangeSwitch(checked, setShowEmailPublic)
                }
                checked={showEmailPublic}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={`#DF5750`}
                offColor="#ccc"
                onHandleColor="#fff"
                offHandleColor="#fff"
              />
            </div>
            <div className="title-box">
              <div className="head">
                <h3>Email Notifications</h3>
                <p>
                  Receive notifications about reviews, messages, and activity
                </p>
              </div>
              <Switch
                onChange={(checked) =>
                  handleChangeSwitch(checked, setNotifyByEmail)
                }
                checked={notifyByEmail}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={`#DF5750`}
                offColor="#ccc"
                onHandleColor="#fff"
                offHandleColor="#fff"
              />
            </div>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className="basic-info-form-container unique-form-wrapper">
            <h2 className="basic-info-form-title custom-section-title">
              Account Settings
            </h2>

            <div className="form-field-group">
              <input
                type="password"
                id="password"
                placeholder="Change Password"
                className="form-input unique-display-name-input"
                {...register("password")}
              />
              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </div>

            {/* <div className="form-field-group">
              <input
                type="text"
                id="twofactor"
                placeholder="Two-Factor Authentication"
                className="form-input unique-location-input"
                {...register("twofactor")}
              />
              {errors.twofactor && <span className="error-text">{errors.twofactor.message}</span>}
            </div> */}

            <div className="deactivate-account">
              <button type="button">Deactivate Account</button>
            </div>
          </div>

          <div className="actions-button-pro">
            <button type="button" className="close">
              Close
            </button>
            <button disabled={loading} type="submit" className="save">
             
              {loading ?  "Saving...":"Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
