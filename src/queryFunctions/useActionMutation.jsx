import { useState } from "react";
import { actionData } from "./queryFunctions";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { showError } from "../components/Toaster";

 

const useActionMutation = ({ onSuccessCallback, onErrorCallback }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ endPoint, body, method }) =>
      actionData(endPoint, method, body),

    onSuccess: (data) => {
      setLoading(false);
      if (onSuccessCallback) onSuccessCallback(data);
    },

    onError: (error) => {
      setLoading(false);

      // React Query receives what we throw, which is error.response
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      if (onErrorCallback) onErrorCallback(errorMsg);

      // Check suspend logic
      if (errorResponse?.data?.is_suspend) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        showError(errorResponse.data.message || "Your account is suspended");
        navigate("/register");
      }
    },
  });

  const triggerMutation = ({ endPoint, body, method = "post" }) => {
    setLoading(true);
    mutation.mutate({ endPoint, body, method });
  };

  return { triggerMutation, loading, error };
};



export default useActionMutation;
