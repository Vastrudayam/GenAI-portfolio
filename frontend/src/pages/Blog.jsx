import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="blog-main-title"
          >
            Insights & <span className="text-primary">Innovation.</span>
          </motion.h1>
          <p className="blog-hero-desc">Explore the latest trends in technology, design, and digital growth from our industry experts.</p>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="container">
          <div className="blog-grid">
            {blogs.map((blog, i) => (
              <motion.div 
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="blog-card"
              >
                <Link to={`/blog/${blog.id}`} className="blog-card-link">
                  <div className="blog-image-wrapper">
                    <img src={blog.image} alt={blog.title} className="blog-card-image" />
                    <span className="blog-category-tag">{blog.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span>{blog.date}</span>
                      <span className="meta-dot">•</span>
                      <span>{blog.author}</span>
                    </div>
                    <h2 className="blog-card-title">{blog.title}</h2>
                    <p className="blog-card-excerpt">{blog.excerpt}</p>
                    <span className="blog-read-more">Read Article <span>→</span></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
