import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      <section className="blog-detail-header" data-aos="fade-down">
        <div className="container narrow">
          <div>
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
          </div>
        </div>
      </section>

      <section className="blog-detail-image-sec" data-aos="zoom-in">
        <div className="container">
          <div className="blog-detail-hero-image">
            <img src={blog.image} alt={blog.title} />
          </div>
        </div>
      </section>

      <section className="blog-detail-body" data-aos="fade-up">
        <div className="container narrow">
          <div 
            className="blog-content-wrapper"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          <div className="blog-detail-footer">
            <Link to="/blog" className="back-to-blog-btn">
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
