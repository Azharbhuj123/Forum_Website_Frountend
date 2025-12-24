import React, { useEffect, useState } from "react";
import Chart2_Svg from "../../Svg_components/Chart2_Svg";
import dpOr from "../../../assets/Images/dp-or.png";
import {
  Clock_gray,
  Clock_Svg,
  Reply_Svg,
  View_svg,
} from "../../Svg_components/Svgs";
import ViewProfile_svg from "../../Svg_components/ViewProfile_svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../queryFunctions/queryFunctions";
import { Skeleton } from "antd";
import useStore from "../../../stores/store";
import { MdDelete } from "react-icons/md";
import DeleteSure from "../../Modals/DeleteSure";
import useActionMutation from "../../../queryFunctions/useActionMutation";
import { showError, showSuccess } from "../../Toaster";
import { set } from "react-hook-form";

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const now = new Date();

  const diffMs = now - date; // difference in milliseconds
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  // Same day → Today or hours ago
  const isToday = date.toDateString() === now.toDateString();

  // Yesterday check
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  // If today
  if (isToday) {
    if (diffHours >= 1) return `${diffHours} hours ago`;
    if (diffMinutes >= 1) return `${diffMinutes} minutes ago`;
    return "Just now";
  }

  // If yesterday
  if (isYesterday) {
    return "Yesterday";
  }

  // Else → return short date
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();

  return `${d}/${m}/${y}`;
}

export default function SectionTwo({fectch_func}) {
  const [filterState, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(4);
  const [del_id ,setDelId] = useState(null);
  const [open ,setOpen] = useState(false);
  const { setDiscussionRefetch } = useStore();
  const userData = JSON.parse(localStorage.getItem("userData"));


  const { data, isLoading ,refetch } = useQuery({
    queryKey: ["user-discussion", search, filterState, limit],
    queryFn: () =>
      fetchData(
        `/discussion?limit=${limit}&filter=${filterState}&search=${search}`
      ),
    keepPreviousData: true,
  });

   // send refetch function to store **once**
  useEffect(() => {
    setDiscussionRefetch(refetch);
  }, [refetch, setDiscussionRefetch]);

  const filters = [
    "All",
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
  const card_data = [
    {
      id: 1,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
    {
      id: 2,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
    {
      id: 3,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
    {
      id: 4,
      title: "Weekend gateway recommendations near the city",
      user: "Elena Rodriguez • 2024-11-02",
      category: "Travel",
      replies: 64,
      views: 2302,
      time: "3 hours ago",
    },
  ];

  const navigate = useNavigate();
const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (res) => {
         refetch()
         setOpen(false)
         showSuccess("Discussion deleted successfully")
    },
    onErrorCallback: (errmsg) => {
      showError(errmsg);
    },
  });

  const handleDelete = (id)=>{
    setDelId(id)
    setOpen(true)
  }

  const onConfirm = ()=>{
    triggerMutation({
      endPoint: `/discussion/${del_id}`,
      method: "delete",
    });
  }

  return (
    <div className="discussion-main-card">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search discussions..."
      />
      <div className="filters-box">
        {filters.map((filter, index) => (
          <button
            onClick={() => setFilter(filter)}
            key={index}
            className={filterState === filter ? "active" : ""}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="main-discussion-cards">
        {isLoading ? (
          <>
            <Skeleton active paragraph={{ rows: 0 }} />
            <Skeleton active paragraph={{ rows: 0 }} />
            <Skeleton active paragraph={{ rows: 0 }} />
          </>
        ) : (
          data?.data?.length ===0 ?(
 <div className="no-property">
            <p>No Discussions Found!</p>
          </div>
          ):(

          data?.data.map((card) => (
            <div
              className="discussion-card"
              key={card._id}
              onClick={() => navigate(`/discussions-detail/${card._id}`)}
            >
              <div className="head">
                <h1>{card.title}</h1>
                <div style={{
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  gap:"5px"
                }}>

                <Chart2_Svg />
                {userData?._id === card?.user?._id && 
                <MdDelete 
                onClick={(e) => {
            e.stopPropagation(); // ✅ Stop card click
            handleDelete(card._id);
          }} size={18} color="#FF002F "/> 
          }
                </div>
              </div>
              <div className="reply-user padding">
                <img src={card?.user?.profile_img} alt="" />
                <p className="name">
                  {card?.user?.name} • {card?.createdAt?.split("T")[0]}
                </p>
              </div>
              <div className="feautures">
                <p className="tarvel">{card.category}</p>
                <p className="reply">
                  <Reply_Svg /> {card.comments?.length} Replies
                </p>

                <p className="reply">
                  <View_svg />
                  {card.viewsCount} views
                </p>
                <p className="reply">
                  <Clock_gray /> {formatDate(card.createdAt)}
                </p>
              </div>
            </div>
          ))
          )

        )}
      </div>
      {data?.totalCount > limit && (
        <div className="load-more">
          <button onClick={() => setLimit(limit + 4)}>
            Load More Discussions
          </button>
        </div>
      )}
      <DeleteSure open={open} onConfirm={onConfirm} onCancel={()=>setOpen(false)} loading={loading} />
    </div>
  );
}
