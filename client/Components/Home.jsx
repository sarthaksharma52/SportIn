import React from 'react'
import Post from './Post'
import '../css/Home.css'

function Home() {

  const demoPostData = {
    userProfile: "https://randomuser.me/api/portraits/men/1.jpg",
    userName: "John Doe",
    userPostImg: "https://via.placeholder.com/600x300",
    postTitle: "Exciting Day at the Beach!",
    postContent: "Had an amazing time at the beach today! Perfect weather and fun activities with friends.", 
  };

  return (
    <div className='home'>
      <Post post={demoPostData}/>
    </div>
  )
}

export default Home
