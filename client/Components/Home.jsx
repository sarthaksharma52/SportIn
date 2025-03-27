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

  // sabse pehele data fetch kr mongodb url se (API use krke)
  // jo bhi username asyega usko localstorageya cookies me save krle
  // fir uske baad jo bhi tera rute h jisme tujhe vo name chahiye vaha pr localstorage se getItem krle

  return (
    <div className='home'>
      <Post post={demoPostData}/>
    </div>
  )
}

export default Home
