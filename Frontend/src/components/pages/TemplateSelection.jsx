import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateSelection = ({ props }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const handleSelectClick = () => {
        if (selectedImage === null) {
            alert('Please select a template first!');
            return;
        }
        navigate(`/create-resume/${selectedImage}`);
    };

    return (
        <div className='h-screen w-screen bg-[#0a0a0a] text-white flex flex-col justify-between items-center p-6'>
            {/* Title */}
            <h1 className='text-[2vw] font-semibold text-center'>{props || 'Select a Template'}</h1>

            {/* Image Selection - Using Flex to Fit in One Row */}
            <div className='flex justify-center gap-4 w-full'>
                {["resume_page-0001.jpg", "resume-3_page-0001.jpg", "resume-2_page-0001.jpg"].map((src, index) => (
                    <img
                        key={index}
                        className={`w-[30%] md:w-[25%] rounded-lg shadow-lg cursor-pointer transition-all duration-300
                            ${selectedImage === index ? 'border-blue-500 border-4 scale-105' : 'border-gray-600 border-2'}
                            hover:scale-105 hover:border-blue-400`}
                        src={`/images/${src}`}
                        alt={`Template ${index + 1}`}
                        onClick={() => handleImageClick(index)}
                    />
                ))}
            </div>

            {/* Select Button */}
            <button
                onClick={handleSelectClick}
                className='bg-white text-black text-lg font-semibold px-6 py-3 rounded-md shadow-lg transition-all duration-300
                    hover:bg-blue-500 hover:text-white hover:scale-105'>
                Select
            </button>
        </div>
    );
};

export default TemplateSelection;
