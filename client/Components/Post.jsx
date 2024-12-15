import React from 'react';

const Post = () => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
        </ul>
        <div className="card-body">
          <button><a href="#" className="card-link">
            like
          </a></button>
          <button><a href="#" className="card-link">
            comment
          </a></button>
        </div>
      </div>
    </div>
  );
};

export default Post;
