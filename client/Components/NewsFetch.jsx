import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../css/NewsFetch.css'; // create this CSS file for styling

const NewsFetch = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.thenewsapi.com/v1/news/top?locale=in&language=en&page=${page}&api_token=3VwruLBEJ7Kp0QOohCfzKRNZMLtALED6snaIABOA`
      );
      const data = await res.json();
      if (data && data.data) {
        setArticles(prev => [...prev, ...data.data]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const lastArticleRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <div
          className="news-card"
          key={article.uuid}
          ref={index === articles.length - 1 ? lastArticleRef : null}
        >
          <h3>{article.title}</h3>
          <p>{article.description?.slice(0, 120)}...</p>
          <a className="read-more-btn" href={article.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default NewsFetch;
