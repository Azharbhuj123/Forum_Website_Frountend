import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { showError } from "../Toaster";
import useActionMutation from "../../queryFunctions/useActionMutation";
import useStore from "../../stores/store";

export default function Discussion({ isOpen, setIsOpen }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem('token')
const {login_required} =useStore()
  const [filePreviews, setFilePreviews] = useState([]);

  const categories = [
    "Apartment",
    "House",
    "Room",
    "Studio",
    "Office",
    "Shop",
    "Warehouse",
    "Hostel",
    "Vacation Home",
    "Luxury Property",
  ];

  const availableTags = [
    "Rent",
    "Apartment",
    "Advice",
    "Pricing",
    "Moving",
    "Utilities",
    "Safety",
    "Parking",
  ];

  const selectedTags = watch("tags") || [];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setValue(
        "tags",
        selectedTags.filter((t) => t !== tag)
      );
    } else {
      setValue("tags", [...selectedTags, tag]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setValue("photos", files);

    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setFilePreviews(previewURLs);
  };

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      reset();
      setIsOpen(false);
      setFilePreviews([])
    },
    onErrorCallback: (errmsg) => {
      console.log(errmsg);
      showError(errmsg);
    },
  });

  const onSubmit = (data) => {
    if(!token){
      showError(login_required)
      return
    }
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);

    data.tags?.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    if (data.photos && data.photos.length > 0) {
      data.photos.forEach((file) => {
        formData.append("photos[]", file); // MULTIPLE FILES
      });
    }

    console.log("FINAL FORMDATA:", [...formData]);

    triggerMutation({
      endPoint: `/discussion/`,
      body: formData,
      method: "post",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={() => setIsOpen(false)}></div>

      <form className="discussion-modal" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header-section">
          <div className="header-content">
            <h2 className="modal-main-title">Start a Discussion</h2>
            <p className="modal-subtitle">
              Share your experience, ask a question, or start a community
              conversation.
            </p>
          </div>
          <svg
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18"
              stroke="#4A5565"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#4A5565"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="modal-body-content">
          {/* Title */}
          <div className="form-field-group">
            <label className="field-label">Discussion Title</label>
            <input
              className="text-input-field"
              placeholder="What would you like to discuss?"
              {...register("title", { required: true })}
            />
            {errors.title && <p className="error-text">Title is required</p>}
          </div>

          {/* Category */}
          <div className="form-field-group">
            <label className="field-label">Category</label>

            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field} className="select-input-field">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            />

            {errors.category && (
              <p className="error-text">Category is required</p>
            )}
          </div>

          {/* Description */}
          <div className="form-field-group">
            <label className="field-label">Description</label>
            <textarea
              className="textarea-input-field"
              placeholder="Write your discussion details..."
              rows="4"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <p className="error-text">Description is required</p>
            )}
          </div>

          {/* Tags */}
          <div className="form-field-group">
            <label className="field-label">Tags (Optional)</label>

            <div className="tags-container">
              {availableTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`tag-btn ${
                    selectedTags.includes(tag) ? "tag-selected" : ""
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="form-field-group">
            <label className="field-label">Attachments (Optional)</label>

            <Controller
              name="photos"
              control={control}
              defaultValue={[]}
              render={({ field }) => {
                const fileInputRef = React.useRef(null);

                const handleFileChange = (e) => {
                  const selectedFiles = Array.from(e.target.files);

                  // LIMIT TO MAX 4 IMAGES
                  if (selectedFiles.length > 4) {
                    showError("You can upload a maximum of 4 images.");
                    return;
                  }

                  field.onChange(selectedFiles);

                  const previews = selectedFiles.map((f) =>
                    URL.createObjectURL(f)
                  );
                  setFilePreviews(previews);
                };

                return (
                  <>
                    {/* Hidden Input */}
                    <input
                      ref={(el) => {
                        field.ref(el);
                        fileInputRef.current = el;
                      }}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    {/* Upload UI */}
                    <div
                      className="upload-area"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <svg
                        className="upload-icon"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <rect
                          x="8"
                          y="12"
                          width="24"
                          height="20"
                          rx="2"
                          stroke="#CBD5E0"
                          strokeWidth="2"
                        />
                        <circle cx="15" cy="18" r="2" fill="#CBD5E0" />
                        <path
                          d="M8 26L14 20L18 24L26 16L32 22"
                          stroke="#CBD5E0"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p className="upload-text">+ Add Photos (Max 4)</p>
                    </div>

                    {/* Preview */}
                    <div className="preview-container">
                      {filePreviews.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt="preview"
                          className="preview-img"
                        />
                      ))}
                    </div>
                  </>
                );
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer-section">
          <button
            type="button"
            className="cancel-action-btn"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="submit-action-btn"
            type="submit"
          >
            {loading ? "Posting..." : "Start Discussion"}
          </button>
        </div>
      </form>
    </>
  );
}
