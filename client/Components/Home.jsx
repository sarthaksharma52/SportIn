import React from 'react'
import Post from './Post'
import '../css/Home.css'

function Home() {

  const demoPostData = {
    userProfile: "https://randomuser.me/api/portraits/men/1.jpg",  // User profile image URL
    userName: "John Doe",  // Username
    userPostImg: "https://via.placeholder.com/600x300",  // Post image URL
    postTitle: "Exciting Day at the Beach!",  // Title of the post
    postContent: "Had an amazing time at the beach today! Perfect weather and fun activities with friends.",  // Content of the post
  };

  return (
    <div className='home'>
      <Post post={demoPostData}/>
    </div>
  )
}

export default Home
