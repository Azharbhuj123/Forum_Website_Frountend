import React, { useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import Search_Svg from "../Svg_components/Search_Svg";
import { useNavigate, useNavigation } from "react-router-dom";
import PropertyTable from "./PropertyTable";
import { fetchData } from "../../queryFunctions/queryFunctions";
import { useQuery } from "@tanstack/react-query";
import fake1 from "../../assets/Images/fake1.png";

export default function Listings() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [status,setStatus] = useState('')
  const [search,setSearch] = useState('')
  const [statusTitle,setStatusTitle] = useState("Filter by Status")

  const { data, isLoading } = useQuery({
    queryKey: ["admin-property", page,status,search],
    queryFn: () => fetchData(`/property?page=${page}&limit=3&status=${status}&search=${search}`),
    keepPreviousData: true,
  });

   const items = [
    {
      label: "Published",
      key: 'published',
    },
    {
      label: "Not Published",
      key: 'notpublished',
    },
    
  ];

  const handleMenuClick = (e) => {
    console.log("click", e);
    const find_arr = items.find((item) => item.key == e.key)
    setStatus(e.key)
    setStatusTitle(find_arr?.label)
  };
 

  const properties =
    data?.data?.map((property, index) => ({
      id: property?._id,
      thumbnail: property.photos[0] || "/placeholder.png", // use first photo or placeholder
      title: property.listingTitle,
      category: property.category,
      categoryColor: "#ffe7d6", // optional: dynamic color logic
      categoryTextColor: "#ff8c42",
      location: property.fullAddress + ", " + property.country,
      price: `$${property.monthlyRent}`, // add currency
      status: property?.is_publish ? "Published" : "Draft", // or dynamic if you have a status field
      statusColor: property?.is_publish ? "#d4f4dd" : "#f0f0f0",
      statusTextColor: property?.is_publish ? "#2da849" : "#888",
    })) || [];

  // How many listings per page?
  const listingsPerPage = 10;

  // Pagination handler
  const onPageChange = (newPage) => {
    setPage(newPage);
  };

 

  return (
    <div className="main-list-div">
      <div className="filter-search">
        <Search_Svg className="search-icon" />
        <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search listings..." />
        <div className="filter-box">
          <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <Button>
              <Space>
                {statusTitle}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          {/* <button onClick={() => navigate("/property-form")}>
            + Add Listings
          </button> */}
        </div>
      </div>
      <PropertyTable
        properties={properties}
          totalListings={data?.totalItems}
  totalPages={data?.totalPages}     // <-- ADD THIS
        currentPage={page}
        listingsPerPage={listingsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
