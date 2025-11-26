import React from "react";
import Chart2_Svg from "../../Svg_components/Chart2_Svg";
import dish_svg from "../../../assets/Images/dish.png";
import beauty from "../../../assets/Images/beauty.png";
import education from "../../../assets/Images/education.png";
import fit from "../../../assets/Images/fit.png";
import tech from "../../../assets/Images/tech.png";
import art from "../../../assets/Images/art.png";
import service from "../../../assets/Images/service.png";
import travel from "../../../assets/Images/travel.png";
import dpOr from "../../../assets/Images/dp-or.png";
import Discussion_Svg from "../../Svg_components/Discussion_Svg";
import Comment_Svg from "../../Svg_components/Comment_Svg";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../queryFunctions/queryFunctions";
import { useNavigate } from "react-router-dom";

function TopCategory() {
 
const navigate = useNavigate()
 const { data, isLoading } = useQuery({
    queryKey: ["landing-discussion"],
    queryFn: () =>
      fetchData(
        `/discussion?limit=4`
      ),
    keepPreviousData: true,
  });


 
  return (
    <div className="top-category">
      {/* <div className="top-cat-head">
        <Chart2_Svg />
        <h1> Top Categories</h1>
      </div>

      <div className="top-cat-items">
        {top_category.map((item) => (
          <div className="top-cat-item" key={item.id}>
            <img src={item.img} alt="" />
            <h2>{item.label}</h2>
            <p>{item.value}</p>
          </div>
        ))}
      </div> */}
  {data?.data?.length > 0 && (

<>
      <div className="top-cat-two-head">
        <div className="heading">
          <Discussion_Svg />
          <h1>Discussion Threads</h1>
        </div>

        <p onClick={()=>navigate('/discussions')} className="viewall">View All {">"}</p>
      </div>

      <div className="main-theard">
        {data?.data.map((item) => (
          <div className="single-theard" key={item._id}>
            <h2 className="question">{item.title}</h2>
            <div className="reply-user">
              <img src={item?.user?.profile_img} alt="" />
              <p className="name">{item?.user?.name} • {item?.category}</p>
            </div>
            <div className="meta-div">
              <div className="status">
                <p>

                  <Comment_Svg /> {item.comments?.length} comments
                </p>
                <p> {item.viewsCount} views</p>
              </div>
              <p>{item.time}</p>
            </div>
          </div>
        ))}
     
      </div>
      </>
        )}




    </div>
  );
}

export default TopCategory;
