import React from 'react'
import Post from './Post'
import '../css/Home.css'
import PostList from './PostList';

function Home() {

  

  // sabse pehele data fetch kr mongodb url se (API use krke)
  // jo bhi username asyega usko localstorageya cookies me save krle
  // fir uske baad jo bhi tera rute h jisme tujhe vo name chahiye vaha pr localstorage se getItem krle

  return (
    <div className='home'>
      {/* <Post post={demoPostData}/> */}
      <PostList/>
    </div>
  )
}

export default Home
