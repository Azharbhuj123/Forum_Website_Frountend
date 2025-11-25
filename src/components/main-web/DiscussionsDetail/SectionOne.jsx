import React, { useState } from "react";
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

export default function SectionOne({ data, refetch }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [my_comment, setMyComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [repLoading, setRepLoading] = useState(false);

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

  const discussion_data = data?.discussion;

  const { triggerMutation, loading } = useActionMutation({
    onSuccessCallback: (data) => {
      if (data?.reply_sent) {
        setRepLoading(false);
        setReplyText("");
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
      showError(login_required);
      return;
    }
    setRepLoading(true);
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
    console.log("Reply submitted for comment:", commentId, replyText);

    if (!replyText) {
      showError("Please enter a comment");
      return;
    }

    if (!userData) {
      showError(login_required);
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
          <span>
            <Thumb_Svg /> {discussion_data?.likesCount?.toLocaleString()}{" "}
            Upvotes
          </span>

          <span>
            <Reply_Svg /> {discussion_data?.comments?.length} Comments
          </span>

          <span>
            <Share_svg2 />
            Share
          </span>
        </div>
      </div>

      <div className="post-comment">
        <p>Add your Comment</p>

        <div className="user-comment">
          <img src={userData?.profile_img} alt="" />
          <textarea
            placeholder="Share your thoughts..."
            onChange={(e) => setMyComment(e.target.value)}
          />
        </div>
        <div className="user-cmt-btn">
          <button disabled={loading} onClick={handlePostComment}>
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>

      <div className="comment-show">
        <p className="cmt-count">{data?.totalCount} Comments</p>
        <div className="comment-show-box">
          {discussion_data?.nestedComments?.map((cmt, index) => (
            <div
              className="commenter-div"
              style={{
                borderBottom:
                  index < discussion_data.nestedComments.length - 1
                    ? "1px solid #EAEAEA"
                    : "1px solid #EAEAEA",
              }}
              key={cmt._id}
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
                  <div>
                    <Thumb_Svg /> {cmt.parent_likes}
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleReplyClick(cmt._id)}
                  >
                    <Reply_Svg /> ({cmt.replies?.length}) Reply
                  </div>
                </div>

                {/* Show Replies and Reply Input if active */}
                {activeReplyId === cmt._id && (
                  <>
                    {/* Replies */}
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
                                  {new Date(rep.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <p className="user-comment-show">{rep.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input */}
                    <div
                      className="reply-comment-div"
                      style={{ marginTop: "8px" }}
                    >
                      <input
                        type="text"
                        value={replyText}
                        placeholder="Write your reply..."
                        onChange={(e) => setReplyText(e.target.value)}
                        style={{
                          width: "70%",
                          padding: "6px 8px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          marginRight: "6px",
                        }}
                      />
                      <button
                        disabled={repLoading}
                        onClick={() => handleReplySubmit(cmt._id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "none",
                          backgroundColor: "#FF7A00",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {repLoading ? "Loading..." : "Reply"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
