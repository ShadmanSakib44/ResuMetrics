// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
      <h1 className='w-full text-3xl font-bold text-white'>ResuMetrics</h1>
      <ul className={`md:flex ${nav ? 'block' : 'hidden'} text-white`}>
        <li className='p-4'>
          <Link to="/applicant/login" className='hover:underline'>Applicant</Link>
        </li>
        <li className='p-4'>
          <Link to="/organization" className='hover:underline'>Organization</Link>
        </li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
    </div>
  );
};

export default Navbar;
