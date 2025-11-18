import React from "react";
import dpOr from "../../../assets/Images/dp-or.png";
import Share_svg2, {
  Reply_Svg,
  Share_svg,
  Thumb_Svg,
  View_svg,
} from "../../Svg_components/Svgs";

export default function SectionOne() {
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
  return (
    <div>
      <button className="back-button" onClick={() => window.history.back()}>
        <span className="back-arrow">‹</span> Back to Discussions
      </button>

      <div className="main-discussion">
        <p className="category">Food & Dining</p>
        <h3>Best hidden gem restaurants in Downtown?</h3>

        <div className="user-data-prof">
          <img src={dpOr} alt="" />

          <div className="user-data">
            <p>Maruc Chen</p>
            <p>
              2024-11-05 • <View_svg /> 1,234 views
            </p>
          </div>
        </div>

        <div className="dis-para">
          I've been living in the downtown area for about 6 months now, and
          while I've tried some of the popular spots that everyone talks about,
          I'm really looking for those hidden gems that locals know about but
          tourists haven't discovered yet.
        </div>
        <div className="dis-para-2">
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
        </div>

        <div className="dis-meta-div">
          <span>
            <Thumb_Svg /> 256 Upvotes
          </span>

          <span>
            <Reply_Svg /> 47 Comments
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
          <img src={dpOr} alt="" />
          <textarea placeholder="Share your thoughts..." />
        </div>
        <div className="user-cmt-btn">
          <button>Post Comment</button>
        </div>
      </div>

      <div className="comment-show">
        <p className="cmt-count">47 Comments</p>
        <div className="comment-show-box">
          {comments?.map((cmt, index) => (
            <div
              className="commenter-div"
              style={{
                borderBottom:
                  index < comments?.length - 1 ? "1px solid #EAEAEA" : "none",
              }}
              key={index}
            >
              <img src={dpOr} alt="" />
              <div className="commenter-data">
                <div className="commenter-head">
                  <p className="commenter-fullname">{cmt.name}</p>

                  <p className="commenter-where">•</p>
                  <p className="comment-where">{cmt.date}</p>
                </div>
                <p className="user-comment-show">{cmt.comment}</p>

                <div className="meta-cmt-detail">
                  <div>
                    <Thumb_Svg /> {cmt.likes}
                  </div>{" "}
                  <div>
                    <Reply_Svg /> Reply
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
