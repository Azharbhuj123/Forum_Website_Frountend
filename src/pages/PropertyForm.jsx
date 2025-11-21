import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import Location_svg from "../components/Svg_components/Location_svg";
import { Upload_Svg } from "../components/Svg_components/Svgs";
import useActionMutation from "../queryFunctions/useActionMutation";
import { useNavigate } from "react-router-dom";

// Yup validation schema
const schema = yup.object().shape({
  listingTitle: yup.string().required("Listing Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  tags: yup.string(),
  country: yup.string().required("Country is required"),
  fullAddress: yup.string().required("Full Address is required"),
  bedrooms: yup
    .number()
    .typeError("Must be a number")
    .required("Bedrooms required"),
  bathrooms: yup
    .number()
    .typeError("Must be a number")
    .required("Bathrooms required"),
  yearBuilt: yup.number().typeError("Must be a number"),
  furnishing: yup.string(),
  areaSize: yup.number().typeError("Must be a number"),
  roomSize: yup.string(),
  monthlyRent: yup.number().typeError("Must be a number"),
  securityDeposit: yup.number().typeError("Must be a number"),
  maintenanceCharges: yup.number().typeError("Must be a number"),
  amenities: yup.array().of(yup.string()),

  photos: yup
    .array()
    .min(4, "Please upload at least 4 image")
    .max(4, "You can upload up to 4 images")
    .test("fileType", "Only PNG or JPG images are allowed", (files) => {
      return files
        ? files.every((file) => ["image/jpeg", "image/png"].includes(file.type))
        : true;
    }),
});

const amenitiesList = [
  "Air Conditioning",
  "Swimming Pool",
  "Central Heating",
  "Laundry Room",
  "Gym",
  "Alarm",
  "Window Covering",
  "Wifi",
  "Pets Allow",
  "Refrigerator",
  "Dryer",
];

export default function PropertyForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      listingTitle: "",
      category: "",
      description: "",
      tags: "",
      country: "",
      fullAddress: "",
      amenities: [],
      bedrooms: "",
      bathrooms: "",
      yearBuilt: "",
      furnishing: "",
      time: "",
      areaSize: "",
      roomSize: "",
      garages: "",
      energyClass: "",
      energyIndex: "",
      monthlyRent: "",
      securityDeposit: "",
      maintenanceCharges: "",
    },
  });

  const navigate = useNavigate();

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      navigate("/property-detail");
    },
    onErrorCallback: (errmsg) => {
       
    },
  });

  const onSubmit = (data, type) => {
    const formData = new FormData();

    // Append photos correctly as photos[]
    if (data.photos && data.photos.length) {
      data.photos.forEach((file) => {
        if (file instanceof File) {
          formData.append("photos[]", file); // always use photos[]
        }
      });
    }

    // Append amenities
    if (data.amenities && data.amenities.length) {
      data.amenities.forEach((amenity) => {
        formData.append("amenities[]", amenity);
      });
    }

    // Append other fields
    Object.keys(data).forEach((key) => {
      if (key !== "photos" && key !== "amenities" && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    if (type == "draft") {
      formData.append("is_publish", false);
    } else {
      formData.append("is_publish", true);
    }

    // Send FormData
    triggerMutation({
      endPoint: "/property/",
      body: formData,
      method: "post",
    });
  };

  return (
    <>
      <AdminDashboardheader />
      <div className="property-form-container Dashboard-container">
        <div className="property-form-wrapper">
          <button className="back-button" onClick={() => window.history.back()}>
            <span className="back-arrow">‹</span> Back
          </button>

          {/* Basic Information Section */}
          <section className="form-section-block">
            <h2 className="section-heading-title">Basic Information</h2>

            <div className="input-field-wrapper">
              <label className="input-field-label">Listing Title</label>
              <input
                type="text"
                className="form-text-input"
                placeholder="Villa on Hollywood Boulevard"
                {...register("listingTitle")}
              />
              <p className="error-text">{errors.listingTitle?.message}</p>
            </div>

            <div className="input-field-wrapper">
              <label className="input-field-label">Category</label>
              <input
                type="text"
                className="form-text-input"
                placeholder="Modern Condo"
                {...register("category")}
              />
              <p className="error-text">{errors.category?.message}</p>
            </div>

            <div className="input-field-wrapper">
              <label className="input-field-label">Listing Description</label>
              <input
                type="text"
                className="form-text-input"
                placeholder="Property Type (e.g. Residential, Commercial)"
                {...register("description")}
              />
              <p className="error-text">{errors.description?.message}</p>
            </div>

            <div className="input-field-wrapper tags-field">
              <label className="input-field-label">Tags</label>
              <input
                type="text"
                className="form-text-input"
                placeholder="Add tags"
                {...register("tags")}
              />
            </div>
          </section>

          {/* Location Details Section */}
          <section className="form-section-block">
            <h2 className="section-heading-title">Location Details</h2>

            <div className="two-column-grid">
              <div className="input-field-wrapper">
                <label className="input-field-label">Country</label>
                <input
                  type="text"
                  className="form-text-input"
                  placeholder="Zip Code"
                  {...register("country")}
                />
                <p className="error-text">{errors.country?.message}</p>
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">Full Address</label>
                <input
                  type="text"
                  className="form-text-input"
                  placeholder="Enter full address"
                  {...register("fullAddress")}
                />
                <p className="error-text">{errors.fullAddress?.message}</p>
              </div>
            </div>

            <div className="map-placeholder-section">
              <div className="map-icon-container">
                <Location_svg />
              </div>
              <p className="map-placeholder-text">
                Map preview will appear here
              </p>
            </div>
          </section>

          {/* Property Details Section */}
          <section className="form-section-block">
            <h2 className="section-heading-title">Property Details</h2>

            <div className="three-column-grid">
              <div className="input-field-wrapper">
                <label className="input-field-label">Bedrooms</label>
                <input
                  type="text"
                  className="form-text-input"
                  {...register("bedrooms")}
                />
                <p className="error-text">{errors.bedrooms?.message}</p>
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">Bathrooms</label>
                <input
                  type="text"
                  className="form-text-input"
                  {...register("bathrooms")}
                />
                <p className="error-text">{errors.bathrooms?.message}</p>
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">Year Built</label>
                <input
                  type="text"
                  className="form-text-input"
                  {...register("yearBuilt")}
                />
                <p className="error-text">{errors.yearBuilt?.message}</p>
              </div>
            </div>

            <div className="three-column-grid">
              <div className="input-field-wrapper">
                <label className="input-field-label">Furnishing</label>
                <input
                  type="text"
                  className="form-text-input"
                  placeholder="Default (owner)"
                  {...register("furnishing")}
                />
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">Area Size</label>
                <input
                  type="text"
                  className="form-text-input"
                  {...register("areaSize")}
                />
                <p className="error-text">{errors.areaSize?.message}</p>
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">Available From</label>
                <input
                  type="text"
                  className="form-text-input"
                  {...register("roomSize")}
                />
              </div>
            </div>

            <div className="amenities-section">
              <label className="input-field-label amenities-label">
                Amenities
              </label>
              <div className="amenities-grid">
                <Controller
                  name="amenities"
                  control={control}
                  render={({ field }) => (
                    <>
                      {amenitiesList.map((amenity) => (
                        <label
                          key={amenity}
                          className="amenity-checkbox-wrapper"
                        >
                          <input
                            type="checkbox"
                            value={amenity}
                            checked={field.value.includes(amenity)}
                            onChange={() => {
                              if (field.value.includes(amenity)) {
                                field.onChange(
                                  field.value.filter((a) => a !== amenity)
                                );
                              } else {
                                field.onChange([...field.value, amenity]);
                              }
                            }}
                          />
                          <span className="amenity-checkbox-label">
                            {amenity}
                          </span>
                        </label>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="form-section-block">
            <h2 className="section-heading-title">Pricing</h2>

            <div className="three-column-grid">
              <div className="input-field-wrapper">
                <label className="input-field-label">Monthly Rent</label>
                <div className="price-input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    type="text"
                    className="form-text-input price-input"
                    {...register("monthlyRent")}
                  />
                </div>
                <p className="error-text">{errors.monthlyRent?.message}</p>
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">Security Deposit</label>
                <div className="price-input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    type="text"
                    className="form-text-input price-input"
                    {...register("securityDeposit")}
                  />
                </div>
                <p className="error-text">{errors.securityDeposit?.message}</p>
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">
                  Maintenance Charges (Inclusive)
                </label>
                <div className="price-input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input
                    type="text"
                    className="form-text-input price-input"
                    {...register("maintenanceCharges")}
                  />
                </div>
                <p className="error-text">
                  {errors.maintenanceCharges?.message}
                </p>
              </div>
            </div>
          </section>

          {/* Upload Photos Section */}
          <section className="form-section-block">
            <h2 className="section-heading-title">Upload Photos</h2>

            <Controller
              name="photos"
              control={control}
              defaultValue={[]}
              render={({ field }) => {
                const files = field.value || [];

                const removeFile = (indexToRemove) => {
                  const updatedFiles = files.filter(
                    (_, i) => i !== indexToRemove
                  );
                  field.onChange(updatedFiles);
                };

                return (
                  <label htmlFor="upload-input" className="upload-label">
                    <div className="upload-photos-area">
                      <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        id="upload-input"
                        onChange={(e) => {
                          const selectedFiles = Array.from(e.target.files);
                          field.onChange([...files, ...selectedFiles]);
                        }}
                      />

                      <div className="upload-icon-wrapper">
                        <Upload_Svg />
                      </div>
                      <p className="upload-instructions-text">
                        Drag & drop or click to upload images
                      </p>
                      <p className="upload-format-text">PNG, JPG up to 10MB</p>

                      {files.length > 0 && (
                        <div className="uploaded-images-preview">
                          {files.map((file, index) => (
                            <div key={index} className="preview-image-wrapper">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                                className="preview-image"
                              />
                              <button
                                type="button"
                                className="remove-image-btn"
                                onClick={() => removeFile(index)}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                );
              }}
            />

            {errors.photos && (
              <p className="error-text">{errors.photos.message}</p>
            )}
          </section>

          {/* Action Buttons */}
          <div className="form-actions-footer">
            <button
              disabled={loading}
              type="button"
              onClick={handleSubmit((data) => onSubmit(data, "draft"))}
              className="btn-cancel-action"
            >
              {loading ? "Submitting..." : "Save as draft"}
            </button>

            <button
              disabled={loading}
              type="button"
              className="btn-submit-action"
              onClick={handleSubmit((data) => onSubmit(data, "publish"))}
            >
              {loading ? "Submitting..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
