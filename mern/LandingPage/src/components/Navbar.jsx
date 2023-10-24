import React, { useState } from 'react';
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
          <a href='http://localhost:3000/applicant' className='hover:underline'>Applicant</a>
        </li>
        <li className='p-4'>
          <a href='http://localhost:3000/organization' className='hover:underline'>Organization</a>
        </li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
    </div>
  );
};

export default Navbar;
