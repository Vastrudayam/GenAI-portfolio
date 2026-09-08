import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ApplyModal = ({ isOpen, onClose, courseTitle = "" }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    number: '', 
    course: courseTitle || 'Select a course' 
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Update course when courseTitle prop changes
  useEffect(() => {
    if (courseTitle) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({ ...prev, course: courseTitle }));
    }
  }, [courseTitle]);

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
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100]"
      onClick={onClose}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 6, 8, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        padding: '12px'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        style={{ 
          backgroundColor: '#161822', 
          borderRadius: '20px', 
          border: '1px solid rgba(230, 192, 64, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(230, 192, 64, 0.05)', 
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          margin: 'auto',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '24px 18px',
          boxSizing: 'border-box'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            border: 'none', 
            background: 'rgba(255,255,255,0.05)', 
            fontSize: '1.25rem', 
            cursor: 'pointer', 
            color: '#e6c040',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(230, 192, 64, 0.1)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
        >&times;</button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>Join Our Program</h3>
          <p style={{ fontSize: '0.8125rem', color: '#9ba3af', marginTop: '0.4rem' }}>Secure your internship spot today</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#e6c040', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
            <input 
              required 
              type="text" 
              style={{ 
                width: '100%', 
                padding: '0.875rem 1.25rem', 
                borderRadius: '30px', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                backgroundColor: '#0d0e12',
                color: '#f8fafc',
                outline: 'none', 
                fontSize: '1rem',
                transition: 'all 0.3s'
              }} 
              placeholder="Enter your name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              onFocus={(e) => e.target.style.borderColor = '#e6c040'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#e6c040', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
            <input 
              required 
              type="tel" 
              style={{ 
                width: '100%', 
                padding: '0.875rem 1.25rem', 
                borderRadius: '30px', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                backgroundColor: '#0d0e12',
                color: '#f8fafc',
                outline: 'none', 
                fontSize: '1rem',
                transition: 'all 0.3s'
              }} 
              placeholder="Enter your number" 
              value={formData.number} 
              onChange={(e) => setFormData({...formData, number: e.target.value})} 
              onFocus={(e) => e.target.style.borderColor = '#e6c040'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#e6c040', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interested Course</label>
            <div style={{ position: 'relative' }}>
              <select 
                required 
                style={{ 
                  width: '100%', 
                  padding: '0.875rem 1.25rem', 
                  borderRadius: '30px', 
                  border: '1px solid rgba(255, 255, 255, 0.08)', 
                  backgroundColor: '#0d0e12',
                  color: '#f8fafc',
                  outline: 'none', 
                  fontSize: '1rem',
                  appearance: 'none',
                  cursor: 'pointer'
                }} 
                value={formData.course} 
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              >
                <option disabled value="">Select a course</option>
                <option value="Full stack">Full stack</option>
                <option value="GenAI & ML">GenAI & ML</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Data Analyst">Data Analyst</option>
              </select>
              <div style={{ 
                position: 'absolute', 
                right: '1.25rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                pointerEvents: 'none',
                color: '#e6c040',
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid currentColor'
              }} />
            </div>
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '30px', 
              fontWeight: '700', 
              marginTop: '0.5rem',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Connect on WhatsApp
          </button>
          <p style={{ fontSize: '11px', color: '#9ba3af', textAlign: 'center', marginTop: '8px', marginBottom: '0' }}>
            Submits directly via WhatsApp to <strong>+91 79939 71574</strong>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ApplyModal;
