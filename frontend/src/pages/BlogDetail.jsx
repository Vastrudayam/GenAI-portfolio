import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="blog-not-found">
        <div className="container">
          <h1>Article Not Found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <section className="blog-detail-header">
        <div className="container narrow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="blog-detail-category">{blog.category}</div>
            <h1 className="blog-detail-title">{blog.title}</h1>
            <div className="blog-detail-meta">
              <div className="author-info">
                <div className="author-avatar">{blog.author.charAt(0)}</div>
                <span>By {blog.author}</span>
              </div>
              <span className="meta-divider">|</span>
              <span>{blog.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="blog-detail-image-sec">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="blog-detail-hero-image"
          >
            <img src={blog.image} alt={blog.title} />
          </motion.div>
        </div>
      </section>

      <section className="blog-detail-body">
        <div className="container narrow">
          <div 
            className="blog-content-wrapper"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          <div className="blog-detail-footer">
            <Link to="/blog" className="back-to-blog-btn">
              <span>←</span> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
