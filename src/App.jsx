import Routes from "./Routes/Routes";
import Scroll from "./ScrollToTop/Scroll";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import toast, { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();

 
  return (
    <QueryClientProvider client={queryClient}>

    <BrowserRouter>
      <Scroll />

      <Routes />
      <ToastContainer />
      <Toaster />
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
