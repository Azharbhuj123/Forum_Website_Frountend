import React from "react";
import FilterBox from "./FilterBox";
import BusinessCard from "./BusinessCard";
import MapView from "./MapView";
import { Pagination, Skeleton } from "antd";

export default function SearchItems({ data, isLoading , setPage ,setFinalQuery,final_query }) {
  const start = (data?.currentPage - 1) * 3 + 1;
  const end = Math.min(data?.currentPage * 3, data?.totalItems);

 
  
  return (
    <div className="search-items-main">
      <div className="search-items-left">
        <FilterBox  final_query={final_query} setFinalQuery={setFinalQuery}/>
      </div>
      <div className="search-items-center">
        <p className="para-status">
          Showing {start}-{end} of {data?.totalItems} results
        </p>
        {isLoading ? (
          <>
            <Skeleton active paragraph={{ rows: 0 }} />
            <Skeleton active paragraph={{ rows: 0 }} />

            <Skeleton active paragraph={{ rows: 0 }} />
          </>
        ) : data?.data?.length === 0 ? (
          <div className="no-property">
            <p>No Property Found!</p>
          </div>
        ) : (
          data?.data?.map((item, index) => <BusinessCard item={item} />)
        )}
        {data?.totalPages !== 1 && (
          <div className="pagination">
            <Pagination
              current={data?.currentPage} // controlled current page
              total={data?.totalItems} // total number of items
              pageSize={Math.ceil(data?.totalItems / data?.totalPages)} // items per page
              onChange={(page) => setPage(page)} // handle page change
            />
          </div>
        )}
      </div>
      <div className="search-items-right">
        <MapView />
      </div>
    </div>
  );
}
