import React, { useEffect, useState } from "react";
import dpOr from "../../../assets/Images/dp-or.png";
import photo from "../../../assets/Images/photo.png";
import { Like_Svg, Like_Svg2, White_Chat_Svg } from "../../Svg_components/Svgs";
import ReactStars from "react-rating-stars-component";
import useActionMutation from "../../../queryFunctions/useActionMutation";
import { showError, showSuccess } from "../../Toaster";
import useStore from "../../../stores/store";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../queryFunctions/queryFunctions";
import { Skeleton } from "antd";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

export default function CommentsSection({ sectionTwoRef, property }) {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [comment_id, setComment_id] = useState(null);
  const [reply_review, setReply_review] = useState("");
  const [comments, setComments] = useState([]);

  const [reply_reviews, setReply_reviews] = useState([]);
  const [reply_reviews_limit, setReply_reviews_limit] = useState(3);
  const [reviews_limit, setReviews_limit] = useState(3);
  const [postCmtLoading, setPostCmtLoading] = useState(false);
  const { login_required } = useStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["property-reviews", property?._id, reviews_limit],
    queryFn: () =>
      fetchData(
        `/review/${property?._id}?limit=${reviews_limit}&userId=${userData?._id}`
      ),
    keepPreviousData: true,
  });
  const { data: commentData, isLoading: commentLoading } = useQuery({
    queryKey: ["property-comment", comment_id, reply_reviews_limit],
    queryFn: () =>
      fetchData(
        `/review/reply-review?property=${property?._id}&review_id=${comment_id}&limit=${reply_reviews_limit}`
      ),
    keepPreviousData: true,
    enabled: !!comment_id,
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      setComments(data.data);
    } else {
      setComments([]);
    }
  }, [data, property?._id]);

  useEffect(() => {
    if (commentData?.reply?.length > 0) {
      setReply_reviews(commentData.reply);
    } else {
      setReply_reviews([]); // agar koi reply nahi hai, empty array set kar do
      setReply_reviews_limit(3); // agar koi reply nahi hai, empty array set kar do
    }
  }, [commentData, comment_id]);

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

  const ratingChanged = (newRating) => {
    console.log(newRating, "newRating");
    setRating(newRating);
  };

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      if (data?.flag) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === data?.review_id
              ? { ...comment, isFlag: data.flagStatus }
              : comment
          )
        );
        showSuccess(data?.message);
        return;
      }
      if (data?.reply) {
        setReply_review("");
        setRating(0);
        setReply_reviews(data?.reply_reviews);
        setCommentText("");

        return;
      }
      if (data?.status) {
        refetch();
        setCommentText("");
        setPostCmtLoading(false)
        showSuccess("Action submitted successfully");
      }
    },
    onErrorCallback: (errmsg) => {
      console.log(errmsg);
      showError(errmsg);
    },
  });

  const handlePostReview = () => {
    if (!token) {
      navigate("/register");
      return;
    }
    if (!commentText) {
      showError("Please enter a comment");
      return;
    }

    setPostCmtLoading(true);
    const reviewData = {
      property: property?._id,
      review: commentText,
      rating,
    };

    triggerMutation({
      endPoint: `/review/`,
      body: reviewData,
      method: "post",
    });

    console.log(reviewData);
  };

  const handleReply = () => {
    if (!reply_review) {
      showError("Please enter a reply");
      return;
    }

    const review_rep_Data = {
      property: property?._id,
      review_id: comment_id,
      reply_review,
    };

    triggerMutation({
      endPoint: `/review/reply-review`,
      body: review_rep_Data,
      method: "post",
    });
  };

  const handleFlag = (reviewId) => {
    if (!token) {
      navigate("/register");
      return;
    }

    triggerMutation({
      endPoint: `/review/flag-review`,
      body: {
        review_id: reviewId,
      },
      method: "post",
    });
    // Here you can also add logic to send the flag action to the server if needed
  };

  console.log(
    comments?.map((item) => item?.isFlag),
    "cdddddddomments"
  );

  return (
    <>
      <div className="reviews-container">
        {/* Reviews Header */}
        {data?.totalCount > 0 && (
          <div className="reviews-header">
            <h2 className="reviews-title">
              Reviews ({data?.totalCount?.toLocaleString()})
            </h2>
            <div className="sort-dropdown">
              <span>Newest</span>
              <span>▼</span>
            </div>
          </div>
        )}

        {/* Review Card */}
        {comments?.length > 0
          ? comments?.map((item, index) => (
              <div ref={sectionTwoRef} key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <img src={item?.user?.profile_img} alt="Sarah Mitchell" />
                    </div>
                    <div className="reviewer-details">
                      <div className="reviewer-name-row">
                        <h3 className="reviewer-name">{item?.user?.name}</h3>
                        {/* <span className="badge badge-top">Top Reviewer</span> */}
                        {/* <span className="badge badge-local">Local Guide</span> */}
                      </div>
                      <div className="review-meta">
                        <div className="stars">
                          {item?.rating == 0
                            ? "N/A"
                            : Array.from({ length: item?.rating }, (_, i) => (
                                <span key={i} className="star">
                                  ★
                                </span>
                              ))}
                        </div>
                        <span className="review-date">
                          {item?.createdAt?.split("T")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  {userData?._id !== item?.user?._id && (

                  <button
                    onClick={() => handleFlag(item?._id)}
                    className={`flag-button ${
                      item?.isFlag ? "activeFlag" : ""
                    }`}
                  >
                    ⚑
                  </button>
                  )}

                </div>

                {/* <h4 className="review-title">Best Properties in Town!</h4> */}

                <p className="review-text">{item?.review}</p>

                {/* <div className="review-image">
            <img src={photo} alt="Food" />
          </div> */}

                <div className="review-actions">
                  <button
                    className="action-button"
                    onClick={() => handleLike("helpful")}
                  >
                    <Like_Svg />
                    <span>Helpful ({item?.likesCount})</span>
                  </button>
                  <button
                    onClick={() =>
                      setComment_id(comment_id === item?._id ? null : item?._id)
                    }
                    className="action-button"
                  >
                    <White_Chat_Svg />
                    <span>Comment ({item?.reply_reviews?.length})</span>
                  </button>
                </div>
                {comment_id === item?._id && (
                  <>
                    <div className="reply-comment-div">
                      <input
                        type="text"
                        value={reply_review}
                        placeholder="Add a comment"
                        onChange={(e) => setReply_review(e.target.value)}
                      />
                      <button disabled={loading} onClick={handleReply}>
                        {loading ? "Loading..." : "Reply"}
                      </button>
                    </div>
                    {commentLoading ? (
                      <Skeleton
                        active
                        paragraph={{ rows: 0 }}
                        className="custom-skeleton"
                      />
                    ) : (
                      <div className="replies-wrapper">
                        {reply_reviews?.map((rev) => (
                          <div className="comment-card owner-response">
                            <div className="comment-header">
                              <div className="commenter-info">
                                <div className="commenter-details">
                                  {rev?.user?._id?.toString() ===
                                    property?.user?.toString() && (
                                    <div className="reviewer-name-row">
                                      <span className="badge badge-owner">
                                        Owner Response
                                      </span>
                                    </div>
                                  )}

                                  <span className="comment-date">
                                    {rev?.createdAt?.split("T")[0]}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="comment-text">{rev?.review}</p>
                          </div>
                        ))}
                        {commentData?.totalReplies > reply_reviews_limit && (
                          <div className="see-more-btn">
                            <button
                              onClick={() =>
                                setReply_reviews_limit(reply_reviews_limit + 3)
                              }
                            >
                              See More
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          : ""}

        {data?.totalCount > reviews_limit && (
          <div className="see-more-btn">
            <button onClick={() => setReviews_limit(reviews_limit + 3)}>
              See More
            </button>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section">
          <h3 className="comments-title">Comments</h3>
          <div style={{ marginBottom: "20px" }}>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#E66448"
            />
          </div>
          <div sclassName="comment-input-wrapper">
            <textarea
              className="comment-input"
              placeholder="Share your thoughts..."
              value={commentText}
              disabled={!token}
              onChange={(e) => setCommentText(e.target.value)}
            />
            {!token && (
              <p className="msg-to-login">
                ⚠️ Please <Link to="/register">sign in</Link> to post a comment.
              </p>
            )}

            <button disabled={postCmtLoading} onClick={handlePostReview} className="post-button">
              {postCmtLoading ? "Posting..." : "Post Comment"}
            </button>
          </div>
          {/* Owner Response
        
          User Comment
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
          </div> */}
        </div>
      </div>
    </>
  );
}
