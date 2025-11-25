import React from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import SectionOne from "../components/main-web/DiscussionsDetail/SectionOne";
import SectionThree from "../components/main-web/Discussions/SectionThree";
import SectionTwo from "../components/main-web/DiscussionsDetail/SectionTwo";
import Footer from "../components/main-web/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../queryFunctions/queryFunctions";
import Loader from "../components/Loader";

export default function DiscussionsDetail() {
  const params = useParams();

  const { data, isLoading ,refetch } = useQuery({
    queryKey: ["user-discussion-id", params.id],
    queryFn: () => fetchData(`/discussion/${params.id}`),
    keepPreviousData: true,
  });

  if(isLoading) return <Loader/>

  return (
    <div>
      <AdminDashboardheader />
      <div className="feautures-main Dashboard-container">
        <div className="section-divider">
          <div className="divider-one">
            <SectionOne  data={data} refetch={refetch}/>
          </div>
          <div className="divider-two">
            <SectionTwo data={data} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
