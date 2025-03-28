import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateSelection = ({props}) => {
    const [selectedImage, setSelectedImage] = useState(null); // Track selected image
    const navigate = useNavigate(); // React Router's navigation function

    const handleImageClick = (index) => {
        setSelectedImage(index); // Set the selected image index
    };

    const handleSelectClick = () => {
        if (selectedImage === null) {
            alert('Please select a template first!');
            return;
        }

        // Navigate to the appropriate route based on the selected template
        navigate(`/create-resume/${selectedImage}`);
    };

    return (
        <div className='h-screen w-screen bg-[#0a0a0a] text-white'>
            <div className='w-full text-center pt-5'>
                <h1 className='text-[3vw] font-semibold'>{props || 'Select any one Template'}</h1>
            </div>
            <div className='w-full pt-10 flex gap-[3vw] px-5 cursor'>
                {/* Add white border when the image is selected */}
                <img
                    className={`w-[25%] ${selectedImage === 0 ? 'border-blue-500 border-[3px]' : ''}`}
                    src="/images/resume_page-0001.jpg"
                    alt="img"
                    onClick={() => handleImageClick(0)}
                />
                <img
                    className={`w-[25%] ${selectedImage === 1 ? 'border-blue-500 border-[3px]' : ''}`}
                    src="/images/resume-3_page-0001.jpg"
                    alt="img"
                    onClick={() => handleImageClick(1)}
                />
                <img
                    className={`w-[25%] ${selectedImage === 2 ? 'border-blue-500 border-[3px]' : ''}`}
                    src="/images/resume-2_page-0001.jpg"
                    alt="img"
                    onClick={() => handleImageClick(2)}
                />
                
                
            </div>
            <div className='w-full text-center pt-6'>
                <button
                    onClick={handleSelectClick}
                    className='text-black rounded-md font-semibold bg-white px-5 py-2'>
                    Select
                </button>
            </div>
        </div>
    );
};

export default TemplateSelection;
