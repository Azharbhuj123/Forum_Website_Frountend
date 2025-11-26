import { toast } from "react-hot-toast";

// ✅ Show success message
export const showSuccess = (message = "Success!") => {
  toast.success(message, {
    duration: 4000, // 4 seconds
    position: "top-right",
    style: {
      borderRadius: "8px",
      background: "#4BB543",
      fontFamily:"Poppins",

      color: "#fff",
      padding: "10px 15px",
      fontWeight: "500",
    },
  });
};

// ❌ Show error message
export const showError = (message = "Something went wrong!") => {
  toast.error(message, {
    duration: 4000, // 4 seconds
    position: "top-right",
    style: {
      borderRadius: "8px",
      background: "#FFF0F0",
      fontFamily:"Poppins",
      color: "#000",
      padding: "10px 15px",
      fontWeight: "500",
    },
  });
};
