import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '../data/courses';
import './CourseDetail.css';

const ApplyModal = ({ isOpen, onClose, courseTitle }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    number: '', 
    course: courseTitle || 'Select a course' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello! I am interested in the ${formData.course} internship course. %0A%0AName: ${formData.name}%0APhone: ${formData.number}`;
    const whatsappUrl = `https://wa.me/917993971574?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass-card w-full max-w-sm p-6 sm:p-8 bg-white"
        style={{ border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Join Our Program</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[13px] font-bold text-slate-500 mb-1.5 block">Full Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="text-[13px] font-bold text-slate-500 mb-1.5 block">Phone Number</label>
            <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all" placeholder="Enter your number" value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} />
          </div>
          <div>
            <label className="text-[13px] font-bold text-slate-500 mb-1.5 block">Interested Course</label>
            <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})}>
              <option disabled>Select a course</option>
              <option>Full stack</option>
              <option>GenAI & ML</option>
              <option>Digital Marketing</option>
              <option>Data Analyst</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full py-4 mt-2">
            Connect on WhatsApp
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const found = courses.find(c => c.id === id);
    if (found) {
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
        <motion.button 
          onClick={() => navigate('/')}
          className="back-link"
        >
          ← Back to Courses
        </motion.button>

        <div className="course-hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="track-label">{course.icon} Professional Track</span>
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
          >
            <img src={course.image} alt={course.title} className="course-hero-img" />
          </motion.div>
        </div>

        <div className="roadmap-section">
          <h2 className="roadmap-header">Comprehensive <span className="gradient-text">Success Syllabus</span></h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {course.roadmap.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="cycle-card"
                style={{ marginBottom: '1.5rem' }}
              >
                <div className="cycle-header" style={{ padding: '1.25rem 1.75rem' }}>
                  <div className={`cycle-indicator ${step.color}`} style={{ width: '4px', height: '40px', borderRadius: '10px' }}></div>
                  <div className="cycle-info">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>{step.phase}</h3>
                    <span className="cycle-duration" style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{step.duration}</span>
                  </div>
                </div>
                <div className="item-list" style={{ padding: '1.25rem 1.75rem' }}>
                  <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="cta-banner">
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
        <ApplyModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          courseTitle={course.title}
        />
      </AnimatePresence>
    </div>
  );
};

export default CourseDetail;
