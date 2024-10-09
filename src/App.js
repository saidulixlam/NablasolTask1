import React, { useState, useEffect } from 'react';
import Step1 from './components/StepOne';
import Step2 from './components/StepTwo'; 
import StepThree from './components/StepThree';
import { AiOutlineClose } from 'react-icons/ai'; 
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';
import StepSix from './components/StepSix';
import SuccessModal from './components/SuccessModal'; // Import your SuccessModal component
import ProjectDetails from './components/ProjectDetails'; // Import the Project Details component

const App = () => {
  const savedStep = parseInt(localStorage.getItem('currentStep')) || 1;
  const [currentStep, setCurrentStep] = useState(savedStep);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep === 6) {
      const formData = JSON.parse(localStorage.getItem('formData')) || {};
      console.log(formData);
      
      const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
      const newProject = { id: Date.now(), ...formData };
      const updatedProjects = [...storedProjects, newProject];

      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      localStorage.removeItem('formData');
      
      setIsModalOpen(true); 
    } else {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleViewProject = () => {
    setShowProjectDetails(true); 
    setIsModalOpen(false);
  };

  const handleBackToSteps = () => {
    setShowProjectDetails(false); 
    setCurrentStep(1); 
  };

  const renderStep = () => {
    if (showProjectDetails) {
      return <ProjectDetails onBack={handleBackToSteps} />; 
    }

    switch (currentStep) {
      case 1:
        return <Step1 nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepFour nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <StepFive nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <StepSix nextStep={nextStep} prevStep={prevStep} />;
      default:
        return <Step1 nextStep={nextStep} prevStep={prevStep} />;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="relative bg-white p-4 sm:w-full max-w-lg rounded-lg shadow-lg m-4 md:mx-auto">
          <button
            onClick={() => console.log("Close button clicked")}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose size={20} />
          </button>
          
          <div className="w-full flex-1 bg-white rounded-md p-4">
            {renderStep()} 
          </div>
          {!showProjectDetails && (
            <div className="w-full flex justify-center my-4">
              {[...Array(6)].map((_, index) => (
                <span
                  key={index}
                  className={`h-2 rounded-full mx-1 transition-all duration-300 ${currentStep === index + 1 ? 'bg-blue-500 w-4' : 'bg-gray-500 w-2'}`}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Success Modal */}
        <SuccessModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onViewProject={handleViewProject} 
        />
      </div>
    </>
  );
};

export default App;
