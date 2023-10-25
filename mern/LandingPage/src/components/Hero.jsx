import React from 'react';
import Typed from 'react-typed';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#989898] font-bold p-2'>
          POWERING YOUR RESUME PROCESS
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Elevate Resumes with ResuMetrics.
        </h1>
        <div className='flex justify-center items-center'>
          <div>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>
            Smart solutions for
          </p>

          </div>
          <div>
          <Typed
          className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2'
            strings={['Resume Shortlisting', 'Resume Building']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />


          </div>
         
         
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Streamline your resume management to find the best candidates and create outstanding resumes effortlessly.</p>
        <a href="http://localhost:3002/" className="block w-[200px] mx-auto my-6">
    <button className='bg-[#989898] w-full rounded-md font-medium py-3 text-black'>
      Build Your Resume Now
    </button>
</a>

      </div>
    </div>
  );
};

export default Hero;
