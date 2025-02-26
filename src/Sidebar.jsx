import React from 'react';

function Sidebar() {
  return (
    <div className='m-3 hover:bg-primary position-fixed d-flex flex-column justify-content-between' style={{ height: '100vh', width: '250px', padding: '20px' }}>
      <div className='d-flex flex-column gap-3'>
        <img className='logo-txt' src='src/assets/insta_text.png' alt='Instagram text Image' style={{ width: '120px' }} />
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-house-door' style={{ fontSize: '24px' }}></i> Home
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-search' style={{ fontSize: '24px' }}></i> Search
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-compass' style={{ fontSize: '24px' }}></i> Explore
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-file-play' style={{ fontSize: '24px' }}></i> Reels
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-chat-dots' style={{ fontSize: '24px' }}></i> Messages
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-heart' style={{ fontSize: '24px' }}></i> Notification
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-plus-square' style={{ fontSize: '24px' }}></i> Create
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-person-circle' style={{ fontSize: '24px' }}></i> Profile
        </div>
      </div>
      <div className='d-flex flex-column gap-3'>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-command' style={{ fontSize: '24px' }}></i> AI Studio
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-threads' style={{ fontSize: '24px' }}></i> Threads
        </div>
        <div className='d-flex align-items-center gap-3'>
          <i className='bi bi-list' style={{ fontSize: '24px' }}></i> More
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
