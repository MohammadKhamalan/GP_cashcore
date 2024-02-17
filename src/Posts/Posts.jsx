import React, { useState, useEffect } from 'react';
import { makeRequest } from '../axios';
import './Posts.scss';
import productPhotoPaths from '../productConfig';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { motion } from 'framer-motion';

function Posts({ employeeId }) {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postPhoto, setPostPhoto] = useState(null);
  const [displayedComments, setDisplayedComments] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await makeRequest.get('/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await makeRequest.delete(`/post/${postId}`);
      const updatedResponse = await makeRequest.get('/post');
      setPosts(updatedResponse.data);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPostPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('employee_id', employeeId);
    formData.append('post_content', postContent);
    formData.append('post_photo', postPhoto);

    try {
      const response = await makeRequest.post('/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const updatedResponse = await makeRequest.get('/post');
        setPosts(updatedResponse.data);
        setShowForm(false);
        setPostContent('');
        setPostPhoto(null);
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please try again.');
    }
  };

  const showAddPostForm = () => {
    setShowForm(true);
  };

  const hideAddPostForm = () => {
    setShowForm(false);
  };

  const toggleComments = async (postId) => {
    if (!displayedComments[postId]) {
      try {
        const response = await makeRequest.get(`comment/post/${postId}`);
        setComments({ ...comments, [postId]: response.data });
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    setDisplayedComments((prevDisplayedComments) => ({
      ...prevDisplayedComments,
      [postId]: !prevDisplayedComments[postId],
    }));
  };

  return (
    <motion.div
      className="posts-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <motion.textarea
            placeholder="Write your post..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          />
          <motion.input
            type="file"
            onChange={handleFileChange}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
          </motion.button>
        </div>
      </form>
      <div className="posts-list">
        {posts.map((post) => {
          const postDate = new Date(post.post_date);
          const currentTime = new Date();

          const timeDifference = currentTime - postDate;
          const secondsDifference = Math.floor(timeDifference / 1000);
          const minutesDifference = Math.floor(secondsDifference / 60);
          const hoursDifference = Math.floor(minutesDifference / 60);
          const daysDifference = Math.floor(hoursDifference / 24);

          let formattedTimeDifference;
          if (daysDifference > 0) {
            formattedTimeDifference = `${daysDifference} day(s) ago`;
          } else if (hoursDifference > 0) {
            formattedTimeDifference = `${hoursDifference} hour(s) ago`;
          } else if (minutesDifference > 0) {
            formattedTimeDifference = `${minutesDifference} minute(s) ago`;
          } else {
            formattedTimeDifference = `${secondsDifference} second(s) ago`;
          }

          return (
            <div key={post.post_id} className="post">
              <div className="post-details">
                <img src="/logo1.png" alt="" className="cashcore" />
                <p>CachCore Bank</p>
                <p className="date">{formattedTimeDifference}</p>
              </div>
              <div className="content">
                <h2>{post.post_content}</h2>
                {post.post_photo && (
                  <img
                    src={productPhotoPaths[post.post_photo]}
                    alt={`Post ${post.post_id}`}
                  />
                )}
              </div>
              <div className="option">
                <p className="likes">
                  <FavoriteBorderIcon /> {post.likes_count}
                </p>
                <div
                  className="comment-icon-container"
                  onClick={() => {
                    toggleComments(post.post_id);
                  }}
                >
                  <CommentIcon /> {post.comment_count}
                </div>

                {/* Comment section */}
                {displayedComments[post.post_id] &&
                  comments[post.post_id] &&
                  comments[post.post_id].length > 0 && (
                    <div className="comments-list">
                      {comments[post.post_id].map((comment) => {
                        const commentDate = new Date(comment.comment_date);
                        const currentTime = new Date();

                        const timeDifference =
                          currentTime - commentDate;
                        const secondsDifference = Math.floor(
                          timeDifference / 1000
                        );
                        const minutesDifference = Math.floor(
                          secondsDifference / 60
                        );
                        const hoursDifference = Math.floor(
                          minutesDifference / 60
                        );
                        const daysDifference = Math.floor(
                          hoursDifference / 24
                        );

                        let formattedTimeDifference;
                        if (daysDifference > 0) {
                          formattedTimeDifference = `${daysDifference} day(s) ago`;
                        } else if (hoursDifference > 0) {
                          formattedTimeDifference = `${hoursDifference} hour(s) ago`;
                        } else if (minutesDifference > 0) {
                          formattedTimeDifference = `${minutesDifference} minute(s) ago`;
                        } else {
                          formattedTimeDifference = `${secondsDifference} second(s) ago`;
                        }

                        return (
                          <div
                            key={comment.comment_id}
                            className="comment"
                          >
                            <p className="comment-user">
                              {comment.user_name}
                            </p>
                            <p className="comment-content">
                              {comment.comment_content}
                            </p>
                            <p className="comment-date">
                              {formattedTimeDifference}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                {displayedComments[post.post_id] &&
                  (!comments[post.post_id] ||
                    comments[post.post_id].length === 0) && (
                    <div className="comments-list">
                      <p className="no-comments">
                        No comments available.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Posts;
