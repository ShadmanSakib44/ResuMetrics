import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons'; 
import './Header.css';

const Header = ({ onClick }) => {
  return (
    <header className='Header'>
      <div className='ui-container'>
        <div className='Header_content'>
          <span className='Header_logo' style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>ResuMetrics</span>
          <button className='ui-button isLink' onClick={onClick} style={{ backgroundColor: '#007bff', color: '#fff', fontSize: '16px', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
            <FontAwesomeIcon icon={faPrint} style={{ marginRight: '10px' }} />
            Print
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onClick: PropTypes.func,
};

Header.defaultProps = {
  onClick: () => {},
};

export default Header;
