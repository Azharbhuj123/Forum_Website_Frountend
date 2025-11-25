import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import Location_svg from "../components/Svg_components/Location_svg";
import { Upload_Svg } from "../components/Svg_components/Svgs";
import useActionMutation from "../queryFunctions/useActionMutation";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../queryFunctions/queryFunctions";
import { showError } from "../components/Toaster";

// Yup validation schema
const schema = yup.object().shape({
  listingTitle: yup.string().required("Listing Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  tags: yup.string(),
  zipcode: yup.string().required("Zipcode is required"),
  fullAddress: yup.string().required("Full Address is required"),
   rooms: yup
    .number()
    .typeError("Must be a number")
    .required("Rooms required"),
  bedrooms: yup
    .number()
    .typeError("Must be a number")
    .required("Bedrooms required"),
  bathrooms: yup
    .number()
    .typeError("Must be a number")
    .required("Bathrooms required"),
  yearBuilt: yup.number().typeError("Must be a number"),
  areaSize: yup.number().typeError("Must be a number"),
  roomSize: yup.string(),
  monthlyRent: yup.number().typeError("Must be a number"),
  securityDeposit: yup.number().typeError("Must be a number"),
  maintenanceCharges: yup.number().typeError("Must be a number"),
  amenities: yup.array().of(yup.string()),

 photos: yup
    .array()
    .min(4, "Please upload at least 4 images")
    .max(4, "You can upload up to 4 images")
    .test("fileType", "Only PNG or JPG images are allowed", (files) => {
      if (!files) return true;
      return files.every((file) => {
        // file can be a File object OR a string (url) when editing
        if (typeof file === "string") return true;
        return ["image/jpeg", "image/png"].includes(file.type);
      });
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      listingTitle: "",
      category: "",
      description: "",
      tags: "",
      zipcode: "",
      fullAddress: "",
      amenities: [],
      bedrooms: "",
      bathrooms: "",
      yearBuilt: "",
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
  const location = useLocation();
  const navigate = useNavigate();

  const property_id = location?.search?.split("=")[1];


   const { data, isLoading, refetch } = useQuery({
      queryKey: ["admin-property", property_id],
      queryFn: () => fetchData(`/property/${property_id}`),
      keepPreviousData: true,
      enabled: !!property_id,
    });

    useEffect(() => {
    if (property_id && data?.data) {
      console.log("API Data received:", data.data);
      
      // Reset form with API data
      reset({
        ...data.data,
        // Ensure photos array is properly handled
        photos: data.data.photos || []
      });
    }
  }, [property_id, data?.data]);

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      navigate(`/property-detail/${data?.data?._id}`);
    },
    onErrorCallback: (errmsg) => {
        showError(errmsg)
    },
  });

  const onSubmit = (data, type) => {
    const formData = new FormData();

    // Append only real File objects
    if (data.photos && data.photos.length) {
      data.photos.forEach((item) => {
        if (item instanceof File) {
          formData.append("photos[]", item);
        }
      });
    }

    // Amenities
    if (data.amenities && data.amenities.length) {
      data.amenities.forEach((a) => formData.append("amenities[]", a));
    }

    // Other fields
    Object.keys(data).forEach((key) => {
      if (key !== "photos" && key !== "amenities" && data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    if(!property_id){
    formData.append("is_publish", type === "publish");
    }

    triggerMutation({
      endPoint: property_id ? `/property/${property_id}` : "/property/" ,
      body: formData,
      method: property_id ? "put" : "post",
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
                <label className="input-field-label">Zipcode</label>
                <input
                  type="text"
                  className="form-text-input"
                  placeholder="Zip Code"
                  {...register("zipcode")}
                />
                <p className="error-text">{errors.zipcode?.message}</p>
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
                <label className="input-field-label">Numbers Of Rooms</label>
                <input
                  type="number"
                  className="form-text-input"
                  {...register("rooms")}
                />
                <p className="error-text">{errors.rooms?.message}</p>
              </div>
              <div className="input-field-wrapper">
                <label className="input-field-label">Bedrooms</label>
                <input
                  type="number"
                  className="form-text-input"
                  {...register("bedrooms")}
                />
                <p className="error-text">{errors.bedrooms?.message}</p>
              </div>

              <div className="input-field-wrapper">
                <label className="input-field-label">Bathrooms</label>
                <input
                  type="number"
                  className="form-text-input"
                  {...register("bathrooms")}
                />
                <p className="error-text">{errors.bathrooms?.message}</p>
              </div>

             
            </div>

            <div className="three-column-grid">
              
 <div className="input-field-wrapper">
                <label className="input-field-label">Year Built</label>
                <input
                  type="text"
                  className="form-text-input"
                  {...register("yearBuilt")}
                />
                <p className="error-text">{errors.yearBuilt?.message}</p>
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
                <div aclassName="price-input-wrapper">
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
              render={({ field }) => {
                const files = field.value || [];

                const removeFile = (indexToRemove) => {
                  const updated = files.filter((_, i) => i !== indexToRemove);
                  field.onChange(updated);
                };

                // Helper to get correct src for preview
                const getPreviewUrl = (item) => {
                  if (typeof item === "string") {
                    // item is already a URL from the server
                    return item;
                  }
                  if (item instanceof File || item instanceof Blob) {
                    return URL.createObjectURL(item);
                  }
                  return ""; // fallback
                };

                // Cleanup object URLs when component unmounts or files change
                useEffect(() => {
                  return () => {
                    files.forEach((f) => {
                      if ((f instanceof File || f instanceof Blob) && f.previewUrl) {
                        URL.revokeObjectURL(f.previewUrl);
                      }
                    });
                  };
                }, [files]);

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
                          const newFiles = Array.from(e.target.files || []);
                          field.onChange([...files, ...newFiles]);
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
                                src={getPreviewUrl(file)}
                                alt={`Preview ${index + 1}`}
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

            {errors.photos && <p className="error-text">{errors.photos.message}</p>}
          </section>

          {/* Action Buttons */}
          {
            property_id ? (
              <div className="form-actions-footer">
            

            <button
              disabled={loading}
              type="button"
              className="btn-submit-action"
              onClick={handleSubmit((data) => onSubmit(data, "publish"))}
            >
              {loading ? "Submitting..." : "Save Changes"}
            </button>
          </div>
            ):(
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
            )
          }
          
        </div>
      </div>
    </>
  );
}
