
import './Logo.css';

const Logo = ({ size = 'sm' }) => {
  return (
    <div className={`nextgen-wordmark logo-${size}`}>
      <div className="nextgen-n-wrap">
        <span className="nextgen-n">N</span>
        <div className="nextgen-pulse-wrap">
          <div className="nextgen-pulse-ring"></div>
          <div className="nextgen-pulse-ring"></div>
          <div className="nextgen-pulse-ring"></div>
          <div className="nextgen-pulse-core"></div>
        </div>
      </div>
      <span className="nextgen-ext">ext</span>
      <span className="nextgen-gen">Gen</span>
    </div>
  );
};

export default Logo;
