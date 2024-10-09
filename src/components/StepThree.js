import { CiViewList } from 'react-icons/ci';
import { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdArrowBackIos } from "react-icons/md";
const StepThree = ({ nextStep, prevStep }) => {
  const [selectedView, setSelectedView] = useState('');
  const [errors, setErrors] = useState({});

  const handleSelect = (view) => {
    setSelectedView(view);
    setErrors((prev) => ({ ...prev, view: '' }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedView) {
      setErrors({ view: 'Please select a view.' });
      return;
    }

    const existingData = JSON.parse(localStorage.getItem('formData')) || {};
    localStorage.setItem('formData', JSON.stringify({ ...existingData, selectedView }));

    nextStep();
  };

  return (
    <div className="flex flex-col h-full justify-center">
      <h1 className="text-xl font-semibold text-center mb-2">Select a view</h1>
      <p className="text-sm text-center text-gray-400 font-semibold mb-6">
        You can also customize views in settings
      </p>

      <div className="flex justify-between items-center gap-2 sm:gap-4 mb-20">
   
        <div className="flex flex-col items-center w-full sm:w-36 md:w-44">
          <div
            className={`w-full h-40 flex items-center justify-center border-2 rounded-lg cursor-pointer ${selectedView === 'Logo' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => handleSelect('Logo')}
          >
            <CiViewList className="text-8xl text-gray-500" />

          </div>
          <p className="text-center text-gray-500 mt-2">List</p>
        </div>

        <div className="flex flex-col items-center w-full sm:w-36 md:w-44">
          <div
            className={`w-full h-40 flex items-center justify-center border-2 rounded-lg cursor-pointer ${selectedView === 'Board' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => handleSelect('Board')}
          >
            <LuLayoutDashboard className="text-8xl text-gray-500" />
          </div>
          <p className="text-center text-gray-500 mt-2">Board</p>
        </div>
      </div>

      {errors.view && <p className="text-red-500 text-sm text-center mt-2">{errors.view}</p>}

      <div className="flex items-center justify-between mt-6 relative">
      <button className="flex items-center text-gray-700 px-4 py-2 rounded" onClick={prevStep}>
            <MdArrowBackIos className="mr-2" />
            Back
          </button>

        <button
          className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepThree;
