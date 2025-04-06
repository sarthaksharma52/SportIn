import React from 'react'
import NewsFetch from './NewsFetch'

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Latest News</h1>
      <NewsFetch/>
    </div>
  )
}

export default Home
