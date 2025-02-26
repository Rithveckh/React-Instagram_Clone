import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedPost, setSelectedPost] = useState(null); // Track selected post for More Options

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleCommentChange = (e, postId) => {
    setNewComment({ ...newComment, [postId]: e.target.value });
  };

  const handleCommentSubmit = (postId) => {
    if (!newComment[postId]?.trim()) return;

    setComments({
      ...comments,
      [postId]: [...(comments[postId] || []), newComment[postId]],
    });

    setNewComment({ ...newComment, [postId]: '' });
  };

  const handleLikeToggle = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes_count: post.likes_count + (likedPosts[postId] ? -1 : 1) }
          : post
      )
    );
  };

  const handleMoreOptions = (postId) => {
    setSelectedPost(postId);
  };

  const closeMoreOptions = () => {
    setSelectedPost(null);
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            className='card my-3 position-relative'
            key={post.id}
            style={{
              width: '500px',
              borderRadius: '10px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* More Options Button */}
            <button
              className="position-absolute"
              onClick={() => handleMoreOptions(post.id)}
              style={{
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <i className="bi bi-three-dots" style={{ color: 'white', fontSize: '18px' }}></i>
            </button>

            {/* Header */}
            <div className='card-header d-flex align-items-center p-2'>
              <img
                className='rounded-circle me-2'
                src={post.user.profile_picture}
                alt='Profile Pic'
                style={{ width: '40px', height: '40px' }}
              />
              <h6 className='m-0'>{post.user.username}</h6>
            </div>

            {/* Post Image */}
            <img
              className='w-100'
              src={post.image}
              alt='Post'
              style={{ maxHeight: '400px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => handleLikeToggle(post.id)}
            />

            {/* Post Actions */}
            <div className='card-body px-3 py-2'>
              <div className='d-flex gap-3 mb-2'>
                {/* Like Icon */}
                <i
                  className={`bi ${likedPosts[post.id] ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
                  style={{ cursor: 'pointer', fontSize: '20px' }}
                  onClick={() => handleLikeToggle(post.id)}
                ></i>

                {/* Comment Icon */}
                <i className='bi bi-chat' style={{ cursor: 'pointer', fontSize: '20px' }}></i>

                {/* Share Icon */}
                <i className='bi bi-send' style={{ cursor: 'pointer', fontSize: '20px' }}></i>
              </div>

              {/* Likes Count */}
              <b>{post.likes_count} likes</b>

              {/* Post Caption */}
              <p className='m-0'>
                <b>{post.user.username}</b> {post.caption}
              </p>

              {/* Comments Section */}
              <div className='mt-2'>
                <p className='text-muted' style={{ fontSize: '14px', cursor: 'pointer' }}>
                  View all {comments[post.id]?.length || 0} comments
                </p>

                {/* Display Last 2 Comments */}
                {comments[post.id]?.slice(-2).map((comment, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>
                    <b>Anonymous</b> {comment}
                  </p>
                ))}

                {/* Add Comment Input */}
                <div className='d-flex align-items-center mt-2'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Add a comment...'
                    value={newComment[post.id] || ''}
                    onChange={(e) => handleCommentChange(e, post.id)}
                    style={{ flex: 1, borderRadius: '20px', fontSize: '14px' }}
                  />
                  <button
                    className='btn btn-sm text-primary'
                    onClick={() => handleCommentSubmit(post.id)}
                    style={{ marginLeft: '5px', fontWeight: 'bold' }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center mt-5'>
          <h5>Loading Posts...</h5>
        </div>
      )}

      {/* More Options Modal */}
      {selectedPost && (
        <div
          className='position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center'
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999
          }}
          onClick={closeMoreOptions}
        >
          <div
            className='bg-dark text-white p-3 rounded'
            style={{ width: '300px', cursor: 'default' }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
          >
            <p className='text-danger text-center fw-bold' style={{ cursor: 'pointer' }}>
              Report
            </p>
            <p className='text-center' style={{ cursor: 'pointer' }}>
              Go to post
            </p>
            <p className='text-center' style={{ cursor: 'pointer' }}>
              Share to...
            </p>
            <p className='text-center' style={{ cursor: 'pointer' }}>
              Copy link
            </p>
            <p className='text-center' style={{ cursor: 'pointer' }}>
              Embed
            </p>
            <p className='text-center' style={{ cursor: 'pointer' }}>
              About this account
            </p>
            <p className='text-center' style={{ cursor: 'pointer' }} onClick={closeMoreOptions}>
              Cancel
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
