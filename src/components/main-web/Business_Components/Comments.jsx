import React, { useState } from "react";
import dpOr from "../../../assets/Images/dp-or.png";
import photo from "../../../assets/Images/photo.png";
import { Like_Svg, Like_Svg2, White_Chat_Svg } from "../../Svg_components/Svgs";

 

export default function CommentsSection({sectionTwoRef}) {
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState({
    helpful: 234,
    ownerResponse: 12,
    marcusComment: 12,
  });

  const handleLike = (key) => {
    setLikes((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  return (
    <>
      <div className="reviews-container">
        {/* Reviews Header */}
        <div className="reviews-header">
          <h2 className="reviews-title">Reviews (1)</h2>
          <div className="sort-dropdown">
            <span>Newest</span>
            <span>▼</span>
          </div>
        </div>

        {/* Review Card */}
        <div ref={sectionTwoRef}  className="review-card">
          <div className="review-header">
            <div className="reviewer-info">
              <div className="reviewer-avatar">
                <img src={dpOr} alt="Sarah Mitchell" />
              </div>
              <div className="reviewer-details">
                <div className="reviewer-name-row">
                  <h3 className="reviewer-name">Sarah Mitchell</h3>
                  <span className="badge badge-top">Top Reviewer</span>
                  <span className="badge badge-local">Local Guide</span>
                </div>
                <div className="review-meta">
                  <div className="stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <span className="review-date">2024-11-01</span>
                </div>
              </div>
            </div>
            <button className="flag-button">⚑</button>
          </div>

          <h4 className="review-title">Best Properties in Town!</h4>

          <p className="review-text">
            I've been coming to La Cocina Mexicana for months now, and every
            visit is better than the last. The carne asada tacos are absolutely
            incredible - perfectly seasoned and cooked to perfection. The
            ambiance is perfect for both family dinners and casual meetups. The
            staff is incredibly attentive and friendly. The salsa verde is to
            die for! Highly recommend trying their weekend brunch menu as well.
          </p>

          <div className="review-image">
            <img src={photo} alt="Food" />
          </div>

          <div className="review-actions">
            <button
              className="action-button"
              onClick={() => handleLike("helpful")}
            >
              <Like_Svg />
              <span>Helpful ({likes.helpful})</span>
            </button>
            <button className="action-button">
              <White_Chat_Svg />
              <span>Comment (2)</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3 className="comments-title">Comments (2)</h3>

          {/* Comment Input */}
          <div   sclassName="comment-input-wrapper">
            <textarea
              className="comment-input"
              placeholder="Share your thoughts..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="post-button">Post Comment</button>
          </div>

          {/* Owner Response */}
          <div className="comment-card owner-response">
            <div className="comment-header">
              <div className="commenter-info">
                <div className="commenter-avatar">
                  <img src={dpOr} alt="Owner" />
                </div>
                <div className="commenter-details">
                  <div className="reviewer-name-row">
                    <span className="badge badge-owner">Owner Response</span>
                  </div>
                  <span className="comment-date">2024-11-02</span>
                </div>
              </div>
              <button
                className="like-button"
                onClick={() => handleLike("ownerResponse")}
              >
                <Like_Svg2 />

                <span>{likes.ownerResponse}</span>
              </button>
            </div>
            <p className="comment-text">
              Thank you so much, Sarah! We're thrilled you enjoyed your
              experience. Can't wait to see you again!
            </p>
          </div>

          {/* User Comment */}
          <div className="comment-card">
            <div className="comment-header">
              <div className="commenter-info">
                <div className="commenter-avatar">
                  <img src={dpOr} alt="Marcus Chen" />
                </div>
                <div className="commenter-details">
                  <h4 className="commenter-name">Marcus Chen</h4>
                  <span className="comment-date">2024-11-02</span>
                </div>
              </div>
              <button
                className="like-button"
                onClick={() => handleLike("marcusComment")}
              >
                <Like_Svg2 />
                <span>{likes.marcusComment}</span>
              </button>
            </div>
            <p className="comment-text">
              Great review! I completely agree about the ambiance. Have you
              tried their weekend brunch?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
