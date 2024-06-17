import React from 'react';
import './footer.css';
import { FooterProps } from './types';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC<FooterProps> = ({ githubUrl, email }) => {
  return (
    <footer className="footer">
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link text-reset"
            >
              <FaGithub size={30} className="hover-text-success" />
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link text-reset"
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
      </div>
    </footer>
  );
};

export default Footer;
