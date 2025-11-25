import React, { useRef } from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import SectionOne from "../components/main-web/Business_Components/SectionOne";
import SectionTwo from "../components/main-web/Business_Components/SectionTwo";
import Footer from "../components/main-web/Footer";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchData } from "../queryFunctions/queryFunctions";

import Loader from "../components/Loader";

export default function BusinessDetail() {
  const params = useParams();
const userData = JSON.parse(localStorage.getItem("userData") || "null");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["detail-property", params.id],
    queryFn: () => fetchData(`/property/${params.id}?userId=${userData?._id}`),
    keepPreviousData: true,
  });

  const {
    data: otherProperties,
    isLoading: otherPropertiesLoading,
    refetch: otherPropertiesRefetch,
  } = useQuery({
    queryKey: ["other-properties", params.id],
    queryFn: () => fetchData(`/property/popular/${params.id}`),
    keepPreviousData: true,
  });
  console.log(otherProperties);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <AdminDashboardheader />
      <div className="feautures-main Dashboard-container business-detail-main ">
        <SectionOne
          rental_data={data?.data}
          otherProperties={otherProperties}
          alreadySaved={data?.isSaved}
        />
        <div className="res786">
          <SectionTwo
            rental_data={data?.data}
            otherProperties={otherProperties}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
