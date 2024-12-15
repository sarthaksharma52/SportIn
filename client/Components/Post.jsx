import React, { useState } from 'react';
import '../css/Post.css'

const Post = ({post}) => {
  const[like,SetLike] = useState(0);

  const likefn= () => {
    SetLike(like+1);
  }

  return (
    <>
      <div className="card cardFrame">
        <div className='userDetail'>
          <img src="post.userProfile" alt="user profile picture" />
          <h6>post.userName</h6>
        </div>
        <hr />
        <img src="post.userPostImg" className="card-img-top" alt="user uploded img" />
        <hr />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{like} like</li>
        </ul>
        <div className="card-body">
          <button onClick={likefn}>
            like
          </button>
          <button className="card-link">
            comment
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
