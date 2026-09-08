import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { courses } from '../data/courses';
import ApplyModal from './ApplyModal';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const found = courses.find(c => c.id === id);
    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCourse(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!course) return null;

  return (
    <div className="course-detail-page">
      <div className="container">
        <button 
          onClick={() => navigate('/')}
          className="back-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Back to Courses
        </button>

        <div className="course-hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            data-aos="fade-right"
          >
            <span className="track-label">💻 Professional Track</span>
            <h1 className="course-main-title">{course.title}</h1>
            <p className="course-main-desc">{course.description}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
              style={{ fontSize: '1.125rem' }}
            >
              Start Your Application
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="course-hero-image-wrapper"
            data-aos="fade-left"
          >
            <img src={course.image} alt={course.title} className="course-hero-img" />
          </motion.div>
        </div>

        <div className="roadmap-section">
          <h2 className="roadmap-header" data-aos="fade-up">Comprehensive <span className="gradient-text">Success Syllabus</span></h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {course.roadmap.map((step, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="cycle-card-detail"
                style={{ marginBottom: '1.5rem' }}
              >
                <div className="cycle-header-detail">
                  <div className={`cycle-indicator-detail ${step.color}`}></div>
                  <div className="cycle-info-detail">
                    <h3>{step.phase}</h3>
                    <span className="cycle-duration-detail">{step.duration}</span>
                  </div>
                </div>
                <div className="item-list-detail">
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-banner" data-aos="zoom-in">
          <h2 className="cta-banner-title">Ready to Join the Internship?</h2>
          <p className="cta-banner-desc">
            Our limited slots fill up fast. Apply today to secure your position in our upcoming cohort.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            Apply Now
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ApplyModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            courseTitle={course.title}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetail;
