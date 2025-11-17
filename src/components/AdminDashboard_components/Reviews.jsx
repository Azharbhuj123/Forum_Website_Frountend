import React from "react";
import Remove_svg from "../Svg_components/Remove_svg";
import Approve_Svg from "../Svg_components/Approve_Svg";
import dp from "../../assets/Images/dp.png";
const Reviews = () => {



  return (
    <>
      <div className="Reviews">
        <div className="Main-Reviews-box">
          <div className="Reviews-heading">
            <h1>Recent Reviews</h1>

            <span><button>Filter</button> <button>Export</button></span>
          </div>
          <div className="Reviews-box">
            <div className="Reviews-box-list">
              <div className="Reviews-box-list-title">
                <div className="Reviews-box-list-dp">
                  <img src={dp} alt="" />
                  <span><h2>Sarah Mitchell</h2> <h3>reviewed</h3> <h4>La Cocina Mexicana</h4></span>
                </div>
                <p>Best Mexican Food in Town!</p>
                <h3>2024-11-01</h3>
              </div>
              <div className="Reviews-box-list-btn">
                <button><Approve_Svg /> Approve</button>
                <button> <Remove_svg /> Remove  </button>
              </div>
            </div>

            <div className="Reviews-box-list">
              <div className="Reviews-box-list-title">
                <div className="Reviews-box-list-dp">
                  <img src={dp} alt="" />
                  <span><h2>Sarah Mitchell</h2> <h3>reviewed</h3> <h4>La Cocina Mexicana</h4></span>
                </div>
                <p>Best Mexican Food in Town!</p>
                <h3>2024-11-01</h3>
              </div>
              <div className="Reviews-box-list-btn">
                <button><Approve_Svg /> Approve</button>
                <button> <Remove_svg /> Remove  </button>
              </div>
            </div>

            <div className="Reviews-box-list">
              <div className="Reviews-box-list-title">
                <div className="Reviews-box-list-dp">
                  <img src={dp} alt="" />
                  <span><h2>Sarah Mitchell</h2> <h3>reviewed</h3> <h4>La Cocina Mexicana</h4></span>
                </div>
                <p>Best Mexican Food in Town!</p>
                <h3>2024-11-01</h3>
              </div>
              <div className="Reviews-box-list-btn">
                <button><Approve_Svg /> Approve</button>
                <button> <Remove_svg /> Remove  </button>
              </div>
            </div>

            <div className="Reviews-box-list">
              <div className="Reviews-box-list-title">
                <div className="Reviews-box-list-dp">
                  <img src={dp} alt="" />
                  <span><h2>Sarah Mitchell</h2> <h3>reviewed</h3> <h4>La Cocina Mexicana</h4></span>
                </div>
                <p>Best Mexican Food in Town!</p>
                <h3>2024-11-01</h3>
              </div>
              <div className="Reviews-box-list-btn">
                <button><Approve_Svg /> Approve</button>
                <button> <Remove_svg /> Remove  </button>
              </div>
            </div>

            <div className="Reviews-box-list">
              <div className="Reviews-box-list-title">
                <div className="Reviews-box-list-dp">
                  <img src={dp} alt="" />
                  <span><h2>Sarah Mitchell</h2> <h3>reviewed</h3> <h4>La Cocina Mexicana</h4></span>
                </div>
                <p>Best Mexican Food in Town!</p>
                <h3>2024-11-01</h3>
              </div>
              <div className="Reviews-box-list-btn">
                <button><Approve_Svg /> Approve</button>
                <button> <Remove_svg /> Remove  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
