import Image from 'next/image'


import React from 'react'
import { assets } from '../../assets/assets'

function About() {
  return (
    // <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
    //    <h4 className='text-center mb-2 text-lg  font-ovo'>Introduction</h4>
    //    <h2 className='text-center  text-5xl font-ovo'>About me</h2>

    //    <div className='flex flex-full flex-col lg:flex-row items-center gap-20'>
    //     <div>
    //      <Image src={assets.two_person} alt='' className='w-full  height={250}   rounded-3xl'/>
    //     </div>

    //     <div className='flex-1 font-ovo mb-10 max-w-2xl'>
    //       <p>"As a MERN stack developer, 
    //         I specialize in building full-stack web applications using MongoDB,
    //          Express.js, React.js, 
    //         and Node.js to deliver dynamic and scalable solutions.</p>

            

    //         <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
    //           {infoList.map(({icon, iconDark, title, description}, index)=>(
    //             <li className='border-[0.5px] border-gray-400 rounded-xl
    //              p-3 cursor-pointer hover:bg-lightHover hover:-translate-y-1
    //               duration-500 hover:shadow-custom'
    //                key={index}>
    //               <Image src={icon} alt='title' className='w-7 mt-3'/>
    //               <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
    //               <p className='text-gray-600 text-sm'>{description}</p>
    //             </li>

    //           ))}
    //         </ul>

    //         <h4 className='my-6 text-gray-700 font-ovo'>Tools I Use</h4>

    //         <ul className='flex items-center gap-3 sm:gap-5'>
    //           {toolsData.map((tool, index)=>(
    //             <li key={index} className='flex items-center justify-center
    //              w-12 sm:14 aspect-square border
    //               border-gray-400 rounded-lg cursor-pointer
    //                hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-custom '>
    //               <Image src={tool} alt='tool' className='w-6 sm:w-7'/>
    //             </li>
    //           ))}
    //         </ul>

            

    //     </div>
    //    </div>

    // </div>
  
    //LEFT SIAD ABOUT
    <div id="About" className="w-11/12 max-w-7xl mx-auto px-4 py-10">
      <h4 className='text-center mb-2 text-lg  font-ovo text-blue-600'>Introduction</h4>
     <h2 className='text-center  text-5xl font-ovo'>About me</h2>
  <div className="flex flex-col md:flex-row items-center gap-10">
    
    {/* Left: Image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <Image 
        src={assets.present_cv} 
        alt="Dashboard" 
        className="w-[300px] md:w-[400px] h-auto rounded-md shadow-xl"
      />
    </div>

    {/* Right: Text */}
    <div className="w-full md:w-1/2 text-center md:text-left">
    <h4 className='font-ovo text-blue-600'>feature 1</h4>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text ">
        Looking for a Senior-Level Job?
      </h1>
     
      <h2 className="text-2xl md:text-4xl font-bold  bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
       Board and CEO services
      </h2>
      <p className="mt-4 text-gray-900">
      Discover exclusive job opportunities on 
      our curated job board. Leveraging advanced AI technology, we match you with the right opportunities, ensuring that senior-level professionals have access to 
      high-impact roles across various industries.
      </p>
       <button className="mt-6 font-ovo text-1xl text-white  px-3 py-2 rounded bg-gradient-to-r from-purple-500 to-purple-400">
       Read ME 
      </button>
    </div>


    

  </div>

 {/* right said */}

  <div className="w-11/12 max-w-7xl mx-auto px-4 py-10 mt-10">
  <div className="flex flex-col-reverse md:flex-row items-center gap-8">
    
    {/* Left: Text */}
    <div className="w-full md:w-1/2 text-center md:text-left mt-8">
    <h4 className='font-ovo text-blue-600'>feature 2</h4>
      <h1 className="text-2xl md:text-4xl font-bold  bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
       Senior Management Placement
      </h1>
      <h4 className=" text-2xl md:text-4xl font-bold mt-2">
        Effortlessly Hire Top Talent
      </h4>
      <p className="mt-4 text-gray-900">
        Create a powerful, job-winning CV in minutes tailored for senior-level roles and designed to land high-paying opportunities faster.
        Use our free AI Resume Writer & LinkedIn Optimization Tool to turbocharge your career!
      </p>
      
    </div>

    {/* Right: Image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <Image 
        src={assets.two_men} 
        alt="Dashboard" 
        className="w-[300px] md:w-[400px] h-auto rounded-md shadow-xl"
      />
    </div>
</div>
  </div>

<div className="w-11/12 max-w-7xl mx-auto px-4 py-10">
  <div className="flex flex-col md:flex-row items-center gap-8">
    
    {/* Left: Image */}
    <div className="w-full md:w-1/2 flex justify-center">
      <Image 
        src={assets.Dishboard_img} 
        alt="Dashboard" 
        className="w-[300px] md:w-[400px] h-auto rounded-md shadow-xl"
      />
    </div>

    {/* Right: Text */}
    <div className="w-full md:w-1/2 text-center md:text-left">
    <h4 className='font-ovo text-blue-600'>feature 3</h4>
      
      <h2 className=" text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
        This is the CareerCraft.AI Dishboard!
      </h2>
      <p className="mt-4 text-gray-600">
        Create a powerful, job-winning CV in minutes – tailored for senior-level roles and designed to land high-paying opportunities faster.
        Use our free AI Resume Writer & LinkedIn Optimization Tool to turbocharge your career!
      </p>
     
    </div>

  </div>
</div>







</div>


 

  )
}

export default About