import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ApplyModal from '../components/ApplyModal';
import './Syllabus.css';

import pythonImg from '../assets/fullstack_new.png';

const Syllabus = () => {
  const navigate = useNavigate();

  const cycles = [
    {
      title: "Phase 1: Foundation Phase",
      duration: "8 Weeks • Web Basics & Python",
      color: "bg-blue-400",
      items: [
        { name: "Intro to Intensive", status: "completed" },
        { name: "Build Your Own Static Website", tags: ["HTML", "CSS", "BOOTSTRAP"], status: "in-progress" },
        { name: "Build Your Own Responsive Website", tags: ["HTML", "CSS", "BOOTSTRAP"], status: "in-progress" },
        { name: "Programming Foundations", tags: ["PYTHON"], status: "in-progress" },
        { name: "Course Exams", status: "not-started" },
      ]
    },
    {
      title: "Phase 2: Specialization Phase",
      duration: "16 Weeks • Master Development",
      color: "bg-orange-400",
      items: [
        { name: "Programming Foundations", tags: ["PYTHON"], status: "in-progress" },
        { name: "Build Your Own Dynamic Web Application", tags: ["HTML", "CSS", "JAVASCRIPT"], status: "in-progress" },
        { name: "Introduction to Databases", status: "in-progress" },
        { name: "JavaScript Essentials", tags: ["JAVASCRIPT"], status: "in-progress" },
        { name: "Responsive Web Design using Flexbox", tags: ["FLEXBOX"], status: "completed" },
        { name: "Course Exams", status: "not-started" },
      ]
    },
    {
      title: "Phase 3: Capstone Phase",
      duration: "8 Weeks • Advanced React & Projects",
      color: "bg-green-500",
      items: [
        { name: "Developer Foundations", tags: ["GIT", "COMMANDLINE"], status: "completed" },
        { name: "Node JS", tags: ["NODE JS"], status: "in-progress" },
        { name: "Python Interview Kit", status: "in-progress" },
        { name: "React JS - Getting started", tags: ["REACT JS"], status: "in-progress" },
        { name: "Course Exams", status: "not-started" },
        { name: "Frontend Interview Kit", status: "in-progress" },
        { name: "React JS Mini Project", status: "not-started" },
      ]
    }
  ];

  const StatusIcon = ({ status }) => {
    if (status === "completed") {
      return (
        <div className="status-icon status-completed">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    if (status === "in-progress") {
      return (
        <div className="status-icon status-in-progress">
          <div className="loading-spinner"></div>
        </div>
      );
    }
    return (
      <div className="status-icon status-not-started"></div>
    );
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="syllabus-page">
      <div className="syllabus-container">
        <button 
          onClick={() => navigate('/')}
          className="back-button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'none', border: 'none', padding: '1rem 0' }}
        >
          <ArrowLeft size={16} /> Back to Courses
        </button>

        <div className="course-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            data-aos="fade-right"
          >
            <span style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(245, 158, 11, 0.08)', color: 'var(--accent-gold)', borderRadius: '99px', fontSize: '0.8125rem', fontWeight: '700', marginBottom: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.15)' }}>💻 Professional Track</span>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-light)', lineHeight: '1.1', marginBottom: '1.5rem' }}>Full Stack <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>Development</span></h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>Master frontend and backend development with modern technologies and real-world projects in our comprehensive 8-month internship.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>Start Your Application</button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            data-aos="fade-left"
            style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid var(--glass-border)' }}
          >
            <img src={pythonImg} alt="Full Stack" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </motion.div>
        </div>

        <div className="roadmap-section-syllabus">
          <h2 className="roadmap-header-syllabus" data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-light)' }}>Comprehensive <span className="gradient-text">Success Syllabus</span></h2>

          <div className="space-y-12">
            {cycles.map((cycle, i) => (
              <div 
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="cycle-card"
              >
                <div className="cycle-header">
                  <div className={`cycle-indicator ${cycle.color}`}></div>
                  <div className="cycle-info">
                    <h3>{cycle.title}</h3>
                    <span className="cycle-duration">{cycle.duration}</span>
                  </div>
                </div>

                <div className="item-list">
                  {cycle.items.map((item, j) => (
                    <div key={j} className="syllabus-item">
                      <div className="item-content">
                        <span className="item-name">{item.name}</span>
                        {item.tags && (
                          <div className="tag-container">
                            {item.tags.map(tag => (
                              <span key={tag} className="tag tag-blue">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <StatusIcon status={item.status} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner Section */}
        <section className="cta-banner-section" style={{ marginTop: '5rem' }} data-aos="zoom-in">
          <div className="cta-banner-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '4rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-light)' }}>Ready to Join the Internship?</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '30rem', margin: '0 auto 2.5rem' }}>Our limited slots fill up fast. Apply today to secure your position in our upcoming cohort.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>Apply Now</button>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} courseTitle="Full Stack Development" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Syllabus;
