import React, { useState } from "react";
import AdminDashboardheader from "../components/AdminDashboard_components/AdminDashboardheader";
import SearchComponent from "../components/main-web/SearchComponent";
import SearchItems from "../components/main-web/SearchItems";
import Footer from "../components/main-web/Footer";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../queryFunctions/queryFunctions";

export default function SearchBusiness() {
  const location = useLocation();
  const searchQuery = location.state;
  const [page, setPage] = useState(1);
  const [final_query, setFinalQuery] = useState(searchQuery);


  const { data, isLoading, refetch } = useQuery({
    queryKey: ["search-business", final_query, page],
    queryFn: () =>
      fetchData(
        `/property?searchQuery=${encodeURIComponent(
          JSON.stringify(final_query)
        )}&status=published&page=${page}&limit=3`
      ),
    keepPreviousData: true,
  });
  return (
    <div>
      <AdminDashboardheader />
      <div className="feautures-main Dashboard-container">
        <SearchComponent
          data={data}
          final_query={final_query}
          setFinalQuery={setFinalQuery}
        />
        <SearchItems
          data={data}
          isLoading={isLoading}
          setPage={setPage}
          final_query={final_query}
          setFinalQuery={setFinalQuery}
        />
      </div>
      <Footer />
    </div>
  );
}
