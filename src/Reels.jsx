import React, { useEffect, useState, useRef } from 'react';

function Reels() {
  const [reels, setReels] = useState([]);
  const [mutedReels, setMutedReels] = useState({});
  const [likedReels, setLikedReels] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [openMoreOptions, setOpenMoreOptions] = useState(null); // Tracks which menu is open
  const videoRefs = useRef({});

  useEffect(() => {
    fetch('http://localhost:4000/reels')
      .then((res) => res.json())
      .then((data) => setReels(data))
      .catch((err) => console.log(err));
  }, []);

  const toggleMute = (reelId) => {
    const videoRef = videoRefs.current[reelId];
    if (videoRef) {
      videoRef.muted = !videoRef.muted;
      setMutedReels((prev) => ({ ...prev, [reelId]: videoRef.muted }));
    }
  };

  const togglePlayPause = (reelId) => {
    const videoRef = videoRefs.current[reelId];
    if (videoRef) {
      videoRef.paused ? videoRef.play() : videoRef.pause();
    }
  };

  const handleLike = (reelId) => {
    setLikedReels((prev) => ({ ...prev, [reelId]: !prev[reelId] }));

    setReels((prevReels) =>
      prevReels.map((reel) =>
        reel.id === reelId
          ? { ...reel, likes_count: likedReels[reelId] ? reel.likes_count - 1 : reel.likes_count + 1 }
          : reel
      )
    );
  };

  const handleCommentChange = (e, reelId) => {
    setNewComment({ ...newComment, [reelId]: e.target.value });
  };

  const handleCommentSubmit = (reelId) => {
    if (!newComment[reelId]?.trim()) return;

    setComments({
      ...comments,
      [reelId]: [...(comments[reelId] || []), newComment[reelId]],
    });

    setNewComment({ ...newComment, [reelId]: '' });
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      {reels.length > 0 ? (
        reels.map((reel) => (
          <div
            className='card my-3 position-relative'
            key={reel.id}
            style={{
              width: '500px',
              borderRadius: '10px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              cursor: 'pointer',
              position:'relative'
            }}
          >


  {/* More Options Button */}
  <button
    className="position-absolute"
    style={{
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: 'none',
      borderRadius: '50%',
      width: '35px',
      height: '35px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer'
    }}
    onClick={() => setOpenMoreOptions(openMoreOptions === reel.id ? null : reel.id)}
  >
    <i className="bi bi-three-dots" style={{ color: 'white', fontSize: '18px' }}></i>
  </button>

            {/* More Options Menu */}
            {openMoreOptions === reel.id && (
              <div
                className="position-absolute"
                style={{
                  top: '50px',
                  right: '10px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  borderRadius: '8px',
                  width: '180px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  zIndex: '10',
                  padding: '10px',
                  fontSize: '14px'
                }}
              >
<ul className="list-unstyled m-0 p-0" 
    style={{
      position: 'absolute',
      top: '40px',
      right: '10px',
      background: '#222',
      borderRadius: '10px',
      width: '200px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 10
    }}
  >
  <li
    className="py-2 px-3"
    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', color: 'red' }}
    onClick={() => alert('Report clicked')}
  >
    Report
  </li>
  <li
    className="py-2 px-3"
    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
    onClick={() => alert('Go to Post clicked')}
  >
    Go to Post
  </li>
  <li
    className="py-2 px-3"
    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
    onClick={() => alert('Share clicked')}
  >
    Share to...
  </li>
  <li
    className="py-2 px-3"
    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
    onClick={() => alert('Copy Link clicked')}
  >
    Copy Link
  </li>
  <li
    className="py-2 px-3"
    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
    onClick={() => alert('Embed clicked')}
  >
    Embed
  </li>
  <li
    className="py-2 px-3"
    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}
    onClick={() => alert('About This Account clicked')}
  >
    About This Account
  </li>
  <li
    className="py-2 px-3 text-center"
    style={{ cursor: 'pointer', fontWeight: 'bold' }}
    onClick={() => setOpenMoreOptions(null)}
  >
    Cancel
  </li>
</ul>

              </div>
            )}
            {/* Reel Header */}
            <div className='card-header d-flex align-items-center p-2'>
              <img
                className='rounded-circle me-2'
                src={reel.user.profile_picture}
                alt='Profile Pic'
                style={{ width: '40px', height: '40px' }}
              />
              <h6 className='m-0'>{reel.user.username}</h6>
            </div>

            {/* Reel Video */}
            <div className='position-relative' onClick={() => togglePlayPause(reel.id)}>
              <video
                ref={(el) => (videoRefs.current[reel.id] = el)}
                className='w-100'
                src={reel.video}
                autoPlay
                loop
                muted={mutedReels[reel.id] ?? true}
                style={{ maxHeight: '600px', objectFit: 'cover' }}
              ></video>

              {/* Mute/Unmute Button */}
              <button
                className='position-absolute'
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute(reel.id);
                }}
                style={{
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <i
                  className={mutedReels[reel.id] ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill'}
                  style={{ color: 'white', fontSize: '20px' }}
                ></i>
              </button>
            </div>

            {/* Reel Actions */}
            <div className='card-body px-3 py-2'>
              <div className='d-flex gap-3 mb-2'>
                {/* Like Button */}
                <i
                  className={`bi ${likedReels[reel.id] ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
                  style={{ cursor: 'pointer', fontSize: '20px' }}
                  onClick={() => handleLike(reel.id)}
                ></i>

                {/* Comment Button */}
                <i className='bi bi-chat' style={{ cursor: 'pointer', fontSize: '20px' }}></i>

                {/* Share Button */}
                <i className='bi bi-send' style={{ cursor: 'pointer', fontSize: '20px' }}></i>
              </div>

              {/* Like Count */}
              <b>{reel.likes_count} likes</b>

              {/* Reel Caption */}
              <p className='m-0'>
                <b>{reel.user.username}</b> {reel.caption}
              </p>

              {/* Comments Section */}
              <div className='mt-2'>
                <p className='text-muted' style={{ fontSize: '14px', cursor: 'pointer' }}>
                  View all {comments[reel.id]?.length || 0} comments
                </p>

                {/* Show Latest 2 Comments */}
                {comments[reel.id]?.slice(-2).map((comment, index) => (
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
                    value={newComment[reel.id] || ''}
                    onChange={(e) => handleCommentChange(e, reel.id)}
                    style={{ flex: 1, borderRadius: '20px', fontSize: '14px' }}
                  />
                  <button
                    className='btn btn-sm text-primary'
                    onClick={() => handleCommentSubmit(reel.id)}
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
          <h5>Loading Reels...</h5>
        </div>
      )}
      
    </div>
  );
}

export default Reels;
