import React, { useEffect, useState } from "react";
import dpOr from "../../../assets/Images/dp-or.png";
import {
  Reply_Svg,
  Share_svg,
  Thumb_Svg,
  View_svg,
  Share_svg2,
} from "../../Svg_components/Svgs";
import { showError } from "../../Toaster";
import useActionMutation from "../../../queryFunctions/useActionMutation";
import useStore from "../../../stores/store";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../queryFunctions/queryFunctions";
import { Link, useNavigate } from "react-router-dom";
import ThreadedDiscussion from "../Business_Components/ThreadedDiscussion";

export default function SectionOne({ data, refetch }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [my_comment, setMyComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [repLoading, setRepLoading] = useState(false);
  const [discussion_data, setDiscussion_data] = useState(
    data?.discussion || null
  );
  const navigate = useNavigate();
  const { login_required } = useStore();
  const comments = [
    {
      name: "Alex Johnson",
      date: "2024-11-05 2:30 PM",
      comment:
        "Oh you HAVE to try La Pequeña Casa on 5th Street! It's this tiny Mexican spot run by a family. Their mole is absolutely incredible, and the prices are super reasonable. They have a small patio in the back that's perfect for warm evenings.",
      likes: 34,
      replies: 3,
    },
    {
      name: "Alex Johnson",
      date: "2024-11-05 2:30 PM",
      comment:
        "Oh you HAVE to try La Pequeña Casa on 5th Street! It's this tiny Mexican spot run by a family. Their mole is absolutely incredible, and the prices are super reasonable. They have a small patio in the back that's perfect for warm evenings.",
      likes: 34,
      replies: 3,
    },
    {
      name: "Alex Johnson",
      date: "2024-11-05 2:30 PM",
      comment:
        "Oh you HAVE to try La Pequeña Casa on 5th Street! It's this tiny Mexican spot run by a family. Their mole is absolutely incredible, and the prices are super reasonable. They have a small patio in the back that's perfect for warm evenings.",
      likes: 34,
      replies: 3,
    },
    {
      name: "Alex Johnson",
      date: "2024-11-05 2:30 PM",
      comment:
        "Oh you HAVE to try La Pequeña Casa on 5th Street! It's this tiny Mexican spot run by a family. Their mole is absolutely incredible, and the prices are super reasonable. They have a small patio in the back that's perfect for warm evenings.",
      likes: 34,
      replies: 3,
    },
  ];

  const handleReplyClick = (commentId) => {
    console.log(commentId);
    console.log(activeReplyId);

    if (activeReplyId === commentId) {
      setActiveReplyId(null); // toggle off
    } else {
      setActiveReplyId(commentId);
    }
  };

  useEffect(() => {
    setDiscussion_data(data?.discussion);
  }, [data?.discussion]);

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      if (data?.parent_like) {
        refetch();
        return;
      }
      if (data?.child_like) {
        refetch();
        return;
      }
      if (data?.reply_sent) {
        setDiscussion_data(data?.discussion);
        setRepLoading(false);
        setReplyText("");
        return
      }
      refetch();
    },
    onErrorCallback: (errmsg) => {
      console.log(errmsg);
      setRepLoading(false);

      showError(errmsg);
    },
  });

  const handlePostComment = () => {
    if (!my_comment) {
      showError("Please enter a comment");
      return;
    }

    if (!userData) {
      navigate("/register");
      return;
    }
    const reviewData = {
      message: my_comment,
    };

    triggerMutation({
      endPoint: `/discussion/${discussion_data?._id}/comment`,
      body: reviewData,
      method: "post",
    });
  };

  const handleReplySubmit = (commentId) => {
    if (!userData) {
      navigate("/register");
      return;
    }
    if (!replyText) {
      showError("Please enter a comment");
      return;
    }

    setRepLoading(true);
    const reviewData = {
      message: replyText,
    };
    triggerMutation({
      endPoint: `/discussion/${commentId}/reply`,
      body: reviewData,
      method: "post",
    });

    // TODO: call API to save reply
  };

  const handleLike = (key) => {
    if (!userData) {
      navigate("/register");
      return;
    }
    triggerMutation({
      endPoint: `/discussion/post-like-child`,
      body: { reviewId: key },
      method: "post",
    });
  };

  const handleLikeParent = (key) => {
    if (!userData) {
      navigate("/register");
      return;
    }
    triggerMutation({
      endPoint: `/discussion/post-like`,
      body: { reviewId: key },
      method: "post",
    });
  };
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: discussion_data?.title,
          text: discussion_data?.description,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      showError("Sharing is not supported in this browser.");
    }
  };
  return (
    <div>
      <button className="back-button" onClick={() => window.history.back()}>
        <span className="back-arrow">‹</span> Back to Discussions
      </button>

      <div className="main-discussion">
        <p className="category">{discussion_data?.category}</p>
        <h3>{discussion_data?.title}</h3>

        <div className="user-data-prof">
          <img src={discussion_data?.user?.profile_img} alt="" />

          <div className="user-data">
            <p>{discussion_data?.user?.name}</p>
            <p>
              {discussion_data?.createdAt?.split("T")[0]} • <View_svg />{" "}
              {discussion_data?.viewsCount?.toLocaleString()} views
            </p>
          </div>
        </div>

        <div className="dis-para">{discussion_data?.description}</div>
        {/* <div className="dis-para-2">
          <p>What I'm looking for:</p>
          <ul>
            <li>- Authentic, local cuisine (any type!)</li>
            <li>- Not overly expensive (ideally $$ or less)</li>
            <li>- Great atmosphere - I love cozy, intimate spaces</li>
            <li>- Bonus points if they have outdoor seating</li>
          </ul>
        </div>

        <div className="dis-para-2">
          <p>
            I'm particularly interested in ethnic restaurants - Mexican, Thai,
            Vietnamese, Mediterranean, anything really. I love trying new
            flavors and supporting small local businesses.
          </p>
        </div>
        <div className="dis-para-2 last">
          <p>
            Has anyone found any amazing spots that deserve more attention?
            Would love to hear your recommendations and what dishes you'd
            suggest trying!
          </p>
        </div> */}

        <div className="dis-meta-div">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleLikeParent(discussion_data?._id)}
          >
            <Thumb_Svg
              className={
                discussion_data?.likedBy?.includes(userData?._id) ? "liked" : ""
              }
            />{" "}
            {discussion_data?.likesCount?.toLocaleString()} Upvotes
          </span>

          <span>
            <Reply_Svg /> {discussion_data?.comments?.length} Comments
          </span>

          <span style={{cursor:"pointer"}} onClick={handleNativeShare}>
            <Share_svg2 />
            Share
          </span>
        </div>
      </div>

    

      <div className="comment-show">
        {/* {discussion_data?.nestedComments?.length > 0 && (
          <>
            <p className="cmt-count">{data?.totalCount} Comments</p>

            <div className="comment-show-box">
              {discussion_data?.nestedComments?.map((cmt, index) => {
                const is_like_by = cmt?.likedBy?.includes(userData?._id);

                return (
                  <div
                    key={cmt._id}
                    className="commenter-div"
                    style={{
                      borderBottom:
                        index < discussion_data.nestedComments.length - 1
                          ? "1px solid #EAEAEA"
                          : "1px solid #EAEAEA",
                    }}
                  >
                    <img
                      src={cmt.userId?.profile_img || dpOr}
                      alt={cmt.userId?.name || "User"}
                      className="commenter-avatar"
                    />

                    <div className="commenter-data">
                      <div className="commenter-head">
                        <p className="commenter-fullname">{cmt.userId?.name}</p>
                        <p className="commenter-where">•</p>
                        <p className="comment-where">
                          {new Date(cmt.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <p className="user-comment-show">{cmt.message}</p>

                      <div className="meta-cmt-detail">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleLike(cmt._id)}
                        >
                          <Thumb_Svg className={is_like_by ? "liked" : ""} />{" "}
                          {cmt.likesCount || 0}
                        </div>

                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleReplyClick(cmt._id)}
                        >
                          <Reply_Svg /> ({cmt.replies?.length}) Reply
                        </div>
                      </div>

                      {activeReplyId === cmt._id && (
                        <>
                          {cmt.replies?.length > 0 && (
                            <div
                              className="replies-container"
                              style={{ marginLeft: "40px", marginTop: "8px" }}
                            >
                              {cmt.replies.map((rep) => (
                                <div
                                  key={rep._id}
                                  className="commenter-div"
                                  style={{
                                    borderBottom: "1px solid #EAEAEA",
                                    padding: "6px 0",
                                  }}
                                >
                                  <img
                                    src={rep.userId?.profile_img || dpOr}
                                    alt={rep.userId?.name || "User"}
                                    className="commenter-avatar"
                                  />

                                  <div className="commenter-data">
                                    <div className="commenter-head">
                                      <p className="commenter-fullname">
                                        {rep.userId?.name}
                                      </p>
                                      <p className="commenter-where">•</p>
                                      <p className="comment-where">
                                        {new Date(
                                          rep.createdAt
                                        ).toLocaleString()}
                                      </p>
                                    </div>

                                    <p className="user-comment-show">
                                      {rep.message}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div
                            className="reply-comment-div"
                            style={{ marginTop: "8px" }}
                          >
                            <input
                              type="text"
                              value={replyText}
                              placeholder="Write your reply..."
                              onChange={(e) => setReplyText(e.target.value)}
                            />

                            <button
                              disabled={repLoading}
                              onClick={() => handleReplySubmit(cmt._id)}
                            >
                              {repLoading ? "Loading..." : "Reply"}
                            </button>
                          </div>

                          {!userData && (
                            <p className="msg-to-login">
                              Please <Link to="/register">sign in</Link> to post
                              a comment.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )} */}

         <ThreadedDiscussion discussionId={discussion_data?._id} userData={userData} />
      </div>
    </div>
  );
}
