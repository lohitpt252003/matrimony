import React from 'react';
import './index.css';
import './light.css';
import './dark.css';
import './mlight.css';
import './mdark.css';

const Button = ({ children, variant = 'primary', size = 'medium', disabled = false, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
