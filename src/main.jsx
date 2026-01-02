import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { LoadScript } from "@react-google-maps/api";
const libraries = ["places"];

import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { GOOGLE_PLACES_API_KEY } from "./BaseUrl.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <LoadScript
      googleMapsApiKey={GOOGLE_PLACES_API_KEY}
      libraries={libraries}
    >
      <App />
    </LoadScript>
  </Provider>
  // </StrictMode>
);
