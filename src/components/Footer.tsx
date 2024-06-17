import React from 'react';
import './footer.css';
import { FooterProps } from './types';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC<FooterProps> = ({ githubUrl, email }) => {
  return (
    <footer className="footer pt-3">
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className='footer-title'>
            <p><strong>TradeHub</strong></p>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              className="btn btn-link text-reset mt-2"
            >
              <FaGithub size={30} className="hover-text-success" />
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              className="btn btn-link text-reset mt-2"
            >
              <FaEnvelope size={30} className="hover-text-success" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="mt-3">Contact us through the above channels</p>
          </div>
        </div>
        <div className='footer-bottom'>
          <p className='text-xs-center'>
            &copy;{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer> 
  );
};

export default Footer;
