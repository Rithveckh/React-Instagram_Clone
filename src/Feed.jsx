import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import Reels from './Reels'

function Feed() {
  return (
    <div>
        <div><Stories/></div>
        <div><Posts/></div>
        <div><Reels/></div>
    </div>
  )
}

export default Feed