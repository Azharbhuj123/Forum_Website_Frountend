// components/ThreadedDiscussion.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiMessageCircle as MessageCircle, FiThumbsUp as ThumbsUp, FiMoreVertical as MoreVertical } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { baseurl } from '../../../BaseUrl';
import axios from 'axios';
import { showSuccess } from '../../Toaster';
import { fetchData } from '../../../queryFunctions/queryFunctions';
import { useQuery } from '@tanstack/react-query';
import MentionModal from '../../Modals/UserList';

const API_BASE_URL = baseurl;

const commentApi = {
  // Get all comments for a discussion
  getComments: async (discussionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/discussion/discussion/${discussionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create a new comment
  createComment: async (discussionId, message, mentions = []) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/discussion/${discussionId}/comment`,
        { discussionId, message, mentions },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reply to a comment
  replyToComment: async (commentId, message, mentions = []) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/discussion/${commentId}/reply`,
        { message, mentions },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Toggle like on a comment
  toggleLike: async (commentId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/discussion/post-like-child`,
        { reviewId: commentId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

const ThreadedDiscussion = ({ discussionId, userData }) => {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [expandedReplies, setExpandedReplies] = useState(new Set());
  const [newComment, setNewComment] = useState("");
const [showMention, setShowMention] = useState(false);
const [mentionQuery, setMentionQuery] = useState("");
const [cursorPos, setCursorPos] = useState(0);

const fetchUsers = async ({ queryKey }) => {
  const [_key, search] = queryKey;
  if (!search) return [];

  const res = await fetchData(`/auth/user-names?name=${search}`);
  return res.user;
};

const { data: users = [], isFetching } = useQuery({
  queryKey: ["mention-users", mentionQuery],
  queryFn: fetchUsers,
  enabled: showMention && mentionQuery.length >= 0,
  staleTime: 5 * 60 * 1000,
  keepPreviousData: true,
});



  const [loading, setLoading] = useState(true);
  const [likedComments, setLikedComments] = useState(new Set());
  
  // New state for optimistic updates
  const [optimisticComments, setOptimisticComments] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const commentsRef = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, [discussionId]);

  // Keep commentsRef in sync with comments
  useEffect(() => {
    commentsRef.current = comments;
  }, [comments]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await commentApi.getComments(discussionId);
      const nestedComments = res.nestedComments || [];
      setComments(nestedComments);
      setOptimisticComments(nestedComments); // Initialize optimistic comments
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
    setLoading(false);
  };

 const handleChange = (e) => {
  const value = e.target.value;
  const caret = e.target.selectionStart;

  setNewComment(value);
  setCursorPos(caret);

  const textBeforeCursor = value.slice(0, caret);
  const match = textBeforeCursor.match(/@(\w*)$/);

  if (match) {
    setShowMention(true);
    setMentionQuery(match[1]);
  } else {
    setShowMention(false);
    setMentionQuery("");
  }
};
const insertMention = (user) => {
  const textarea = textareaRef.current;

  const before = newComment
    .slice(0, cursorPos)
    .replace(/@(\w*)$/, `@${user.name} `);

  const after = newComment.slice(cursorPos);

  setNewComment(before + after);
  setShowMention(false);

  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(before.length, before.length);
  });
};



  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  const toggleReplies = (id) => {
    setExpandedReplies((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const handleReply = (comment) => {
    if (!userData) return navigate("/register");

    // Pre-fill with @username only if replying to a different user
    const initialText =
      comment.userId?._id !== userData?._id ? `@${comment.userId?.name} ` : "";

    setReplyingTo(comment._id);
    setReplyText(initialText);
  };

  const addOptimisticReply = (parentId, replyText) => {
    const newReply = {
      _id: `temp-${Date.now()}`,
      message: replyText,
      userId: {
        _id: userData._id,
        name: userData.name,
        profile_img: userData.profile_img
      },
      createdAt: new Date().toISOString(),
      likesCount: 0,
      replies: [],
      isOptimistic: true
    };

    const addReplyToComments = (commentList) => {
      return commentList.map(comment => {
        if (comment._id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComments(comment.replies)
          };
        }
        return comment;
      });
    };

    const updatedComments = addReplyToComments([...optimisticComments]);
    setOptimisticComments(updatedComments);
    setExpandedReplies((s) => new Set([...s, parentId]));
    
    return updatedComments;
  };

  const submitReply = async (parentId) => {
    if (!replyText.trim() || !userData) return;
    
    setIsUpdating(true);
    const previousComments = optimisticComments;
    
    try {
      // Optimistic update
      const optimisticComments = addOptimisticReply(parentId, replyText);
      
      // Clear reply state
      setReplyingTo(null);
      setReplyText("");
      
      // API call
      await commentApi.replyToComment(parentId, replyText);
      
      // Refresh comments to get actual data
      await fetchComments();
    } catch (error) {
      console.error('Error submitting reply:', error);
      // Revert optimistic update on error
      setOptimisticComments(previousComments);
    } finally {
      setIsUpdating(false);
    }
  };

  const addOptimisticComment = (commentText) => {
    const newComment = {
      _id: `temp-${Date.now()}`,
      message: commentText,
      userId: {
        _id: userData._id,
        name: userData.name,
        profile_img: userData.profile_img
      },
      createdAt: new Date().toISOString(),
      likesCount: 0,
      replies: [],
      isOptimistic: true
    };

    const updatedComments = [newComment, ...optimisticComments];
    setOptimisticComments(updatedComments);
    
    return updatedComments;
  };

  const submitComment = async () => {
    if (!newComment.trim() || !userData) return;
    
    setIsUpdating(true);
    const previousComments = optimisticComments;
    
    try {
      // Optimistic update
      addOptimisticComment(newComment);
      
      // Clear input
      setNewComment("");
      
      // API call
      await commentApi.createComment(discussionId, newComment);
      showSuccess("Comment submitted successfully");
      // Refresh comments to get actual data
      await fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Revert optimistic update on error
      setOptimisticComments(previousComments);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateOptimisticLike = (commentId) => {
    const updateLikesInComments = (commentList) => {
      return commentList.map(comment => {
        if (comment._id === commentId) {
          const isCurrentlyLiked = likedComments.has(commentId);
          const newLikesCount = isCurrentlyLiked 
            ? Math.max(0, (comment.likesCount || 0) - 1)
            : (comment.likesCount || 0) + 1;
          
          return {
            ...comment,
            likesCount: newLikesCount
          };
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateLikesInComments(comment.replies)
          };
        }
        return comment;
      });
    };

    const updatedComments = updateLikesInComments([...optimisticComments]);
    setOptimisticComments(updatedComments);
    setLikedComments((prev) => {
      const s = new Set(prev);
      s.has(commentId) ? s.delete(commentId) : s.add(commentId);
      return s;
    });
    
    return updatedComments;
  };

  const handleLike = async (commentId) => {
    if (!userData) return navigate("/register");
    
    setIsUpdating(true);
    const previousComments = optimisticComments;
    const previousLikes = likedComments;
    
    try {
      // Optimistic update
      updateOptimisticLike(commentId);
      
      // API call
      await commentApi.toggleLike(commentId);
      
      // Refresh comments to get actual data
      await fetchComments();
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      setOptimisticComments(previousComments);
      setLikedComments(previousLikes);
    } finally {
      setIsUpdating(false);
    }
  };

  const CommentItem = ({ comment, depth = 0 }) => {
    const hasReplies = comment.replies?.length > 0;
    const isOpen = expandedReplies.has(comment._id);
    const isLiked = likedComments.has(comment._id);
    
    // Limit visual depth to prevent overflow
    const visualDepth = Math.min(depth, 6);
    const showConnector = depth > 0;

    return (
      <div className="comment-wrapper">
        <div 
          className={`comment-item ${showConnector ? 'nested' : ''} ${comment.isOptimistic ? 'optimistic' : ''}`}
          style={{ paddingLeft: `${visualDepth * 28}px` }}
        >
          {showConnector && <div className="connector-line" />}
          
          <div className="comment-content">
            <img
              src={comment.userId?.profile_img || "https://forum-backend-production-47c5.up.railway.app/uploads/1763980553327-download.png"}
              alt={comment.userId?.name || "User"}
              className="avatar"
            />

            <div className="content">
              <div className="header">
                <strong>{comment.userId?.name || "Anonymous"}</strong>
                <span className="time">· {formatDate(comment.createdAt)}</span>
                {comment.isOptimistic && <span className="optimistic-badge">Posting...</span>}
              </div>

              <div className="text">{comment.message}</div>

              <div className="actions">
                <button 
                  className={`action-btn ${isLiked ? 'liked' : ''}`}
                  onClick={() => handleLike(comment._id)}
                  disabled={isUpdating || comment.isOptimistic}
                >
                  <ThumbsUp size={14} />
                  <span>{comment.likesCount || 0}</span>
                </button>
                <button 
                  className="action-btn"
                  onClick={() => handleReply(comment)}
                  disabled={isUpdating || comment.isOptimistic}
                >
                  <MessageCircle size={14} />
                  <span>Reply</span>
                </button>
                {hasReplies && (
                  <button 
                    className="action-btn toggle-btn"
                    onClick={() => toggleReplies(comment._id)}
                    disabled={isUpdating}
                  >
                    {isOpen ? '▼' : '▶'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                  </button>
                )}
              </div>

              {replyingTo === comment._id && (
                <div className="reply-box">
                  <img
                    src={userData?.profile_img || "https://forum-backend-production-47c5.up.railway.app/uploads/1763980553327-download.png"}
                    alt="You"
                    className="reply-avatar"
                  />
                  <div className="reply-input-wrapper">
                    <input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          submitReply(comment._id);
                        }
                      }}
                      disabled={isUpdating}
                    />
                    <div className="reply-actions">
                      <button 
                        className="btn-cancel"
                        onClick={() => setReplyingTo(null)}
                        disabled={isUpdating}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn-submit"
                        onClick={() => submitReply(comment._id)}
                        disabled={!replyText.trim() || isUpdating}
                      >
                        {isUpdating ? 'Posting...' : 'Reply'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {hasReplies && isOpen && (
          <div className="replies-container">
            {comment.replies.map((r) => (
              <CommentItem key={r._id} comment={r} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading && optimisticComments.length === 0) {
    return <p style={{ textAlign: 'center', padding: '20px' }}>Loading comments...</p>;
  }

  // Use optimisticComments for display, fallback to actual comments
  const displayComments = optimisticComments.length > 0 ? optimisticComments : comments;

  return (
    <div className="thread">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .thread {
          max-width: 900px;
          margin: auto;
          font-family: 'Poppins', system-ui, -apple-system, sans-serif;
        }

        .post-comment {
          background: #FFF;
          border-radius: 16px;
          border: 1px solid #EAEAEA;
          padding: 24px;
          margin-bottom: 20px;
        }

        .post-comment > p {
          margin: 0 0 16px 0;
          font-weight: 600;
          font-size: 16px;
          color: #333;
        }

        .user-comment {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .user-comment img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          flex-shrink: 0;
          object-fit: cover;
        }

        .user-comment textarea {
          flex: 1;
          border: 1px solid #EAEAEA;
          border-radius: 12px;
          padding: 12px 16px;
          font-family: 'Poppins', inherit;
          font-size: 14px;
          resize: vertical;
          min-height: 80px;
          outline: none;
          transition: border-color 0.2s;
        }

        .user-comment textarea:focus {
          border-color: #FF0C39;
        }

        .user-comment textarea:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .msg-to-login {
          font-size: 13px;
          color: #666;
          margin-bottom: 12px;
        }

        .msg-to-login a {
          color: #FF0C39;
          text-decoration: none;
          font-weight: 600;
        }

        .user-cmt-btn {
          display: flex;
          justify-content: flex-end;
        }

        .user-cmt-btn button {
          background: #FF0C39;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 24px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .user-cmt-btn button:hover:not(:disabled) {
          background: #166fe5;
        }

        .user-cmt-btn button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .all-boss {
          border-radius: 16px;
          border: 1px solid #EAEAEA;
          background: #FFF;
          padding: 24px;
          font-family: 'Poppins';
        }

        .comment-wrapper {
          position: relative;
        }

        .comment-item {
          position: relative;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
          transition: opacity 0.3s ease;
        }

        .comment-item.optimistic {
          opacity: 0.7;
        }

        .comment-item:last-child {
          border-bottom: none;
        }

        .connector-line {
          position: absolute;
          left: 14px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e4e6eb;
        }

        .comment-content {
          display: flex;
          gap: 12px;
          position: relative;
          background: white;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          flex-shrink: 0;
          object-fit: cover;
        }

        .content {
          flex: 1;
          min-width: 0;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .header strong {
          font-size: 14px;
          color: #050505;
          font-weight: 600;
        }

        .time {
          font-size: 12px;
          color: #65676b;
        }

        .optimistic-badge {
          font-size: 11px;
          color: #FF0C39;
          background: #ffe6ea;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
        }

        .text {
          font-size: 14px;
          line-height: 1.5;
          color: #050505;
          margin-bottom: 8px;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 6px;
          flex-wrap: wrap;
        }

        .action-btn {
          background: none;
          border: none;
          color: #65676b;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 6px;
          transition: background 0.2s;
          font-family: 'Poppins', inherit;
        }

        .action-btn:hover:not(:disabled) {
          background: #f0f2f5;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-btn.liked {
          color: #FF0C39;
        }

        .toggle-btn {
          color: #FF0C39;
          font-weight: 600;
        }

        .reply-box {
          margin-top: 12px;
          background: #f0f2f5;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          gap: 10px;
        }

        .reply-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          object-fit: cover;
        }

        .reply-input-wrapper {
          flex: 1;
        }

        .reply-box input {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 8px 16px;
          font-family: 'Poppins', inherit;
          font-size: 14px;
          outline: none;
          margin-bottom: 8px;
        }

        .reply-box input:focus {
          border-color: #FF0C39;
        }

        .reply-box input:disabled {
          background: #f5f5f5;
        }

        .reply-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          font-family: 'Poppins', inherit;
        }

        .btn-cancel, .btn-submit {
          border: none;
          border-radius: 6px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Poppins', inherit;
        }

        .btn-cancel {
          background: transparent;
          color: #65676b;
        }

        .btn-cancel:hover:not(:disabled) {
          background: #e4e6eb;
        }

        .btn-cancel:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-submit {
          background: #FF0C39;
          color: white;
        }

        .btn-submit:hover:not(:disabled) {
          background: #166fe5;
        }

        .btn-submit:disabled {
          background: #e4e6eb;
          color: #bcc0c4;
          cursor: not-allowed;
        }

        .replies-container {
          margin-top: 0;
        }

        @media (max-width: 640px) {
          .thread {
            padding: 0;
          }

          .post-comment, .all-boss {
            border-radius: 0;
            border-left: none;
            border-right: none;
          }

          .comment-item.nested {
            padding-left: 20px !important;
          }

          .connector-line {
            left: 10px;
          }

          .user-comment {
            flex-direction: column;
          }

          .reply-box {
            flex-direction: column;
          }
        }
      `}</style>

      
        <>
        <div className="post-comment">
          <p>Add your Comment</p>
          <div className="user-comment">
            <img
              src={
                userData?.profile_img ||
                "https://forum-backend-production-47c5.up.railway.app/uploads/1763980553327-download.png"
              }
              alt="Your avatar"
            />
            {/* {showMention && (
      <MentionModal
        users={filteredUsers}
        onSelect={insertMention}
      />
    )} */}
            <textarea
    value={newComment}
    placeholder="Share your thoughts..."
    onChange={handleChange}
    disabled={isUpdating}
  />
          </div>
          <div className="user-cmt-btn">
            <button 
              disabled={loading || !newComment.trim() || isUpdating} 
              onClick={submitComment}
            >
              {isUpdating ? "Posting..." : "Post Comment"}
            </button>
          </div>
          {
            !userData && (

           
          <p className="msg-to-login">
            ⚠️ Please <Link to="/register">sign in</Link> to post a comment.
          </p>
           )
          }
        </div>
        </>
       

      <div className="all-boss">
        {displayComments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          displayComments.map((c) => <CommentItem key={c._id} comment={c} />)
        )}
        {loading && optimisticComments.length > 0 && (
          <p style={{ textAlign: 'center', color: '#999', padding: '10px' }}>
            Updating...
          </p>
        )}
      </div>
    </div>
  );
};

export default ThreadedDiscussion;