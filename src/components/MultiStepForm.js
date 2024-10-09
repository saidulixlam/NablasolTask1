import React, { useState } from 'react';
import Step1 from './StepOne';
import Step2 from './StepTwo';
// import Step3 from './Step3';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    fromDate: '',
    toDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (input) => (e) => {
    console.log('Input:', input);
    console.log('Event:', e);
    setFormData({ ...formData, [input]: e.target.value });
  };
  

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.projectName) newErrors.projectName = "Project Name is required";
    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.fromDate) newErrors.fromDate = "From Date is required";
    if (!formData.toDate) newErrors.toDate = "To Date is required";
    return newErrors;
  };

  const nextStep = () => {
    let validationErrors = {};
    if (step === 1) {
      validationErrors = validateStep1();
    } else if (step === 2) {
      validationErrors = validateStep2();
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {step === 1 && (
        <Step1
          handleChange={handleChange}
          nextStep={nextStep}
          formData={formData}
          errors={errors}
        />
      )}
      {step === 2 && (
        <Step2
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          errors={errors}
        />
      )}
      {/* {step === 3 && (
        <Step3
          prevStep={prevStep}
          formData={formData}
        />
      )} */}
      <div className="flex justify-between mt-6">
        {step > 1 && <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>}
        {step < 3 && <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>}
      </div>
    </div>
  );
};

export default MultiStepForm;
