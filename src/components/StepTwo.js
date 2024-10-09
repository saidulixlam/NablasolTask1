import { useState, useEffect } from 'react';
import { MdArrowBackIos } from "react-icons/md";
const Step2 = ({ nextStep, prevStep }) => {
  const [selected, setSelected] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [customRate, setCustomRate] = useState('');
  const [hours, setHours] = useState('');
  const [budgetResets, setBudgetResets] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || {};
    setSelected(storedData.projectType || '');
    setHourlyRate(storedData.hourlyRate || '');
    setCustomRate(storedData.customRate || '');
    setHours(storedData.hours || '');
    setBudgetResets(storedData.budgetResets || false);
    setEmailAlert(storedData.emailAlert || false);
  }, []);

  const handleSelect = (buttonType) => {
    setSelected(buttonType);
    setErrors((prev) => ({ ...prev, projectType: '' }));
  };

  const handleRateChange = (e) => {
    const rate = e.target.value;
    setHourlyRate(rate);
    setCustomRate('');
    setErrors((prev) => ({ ...prev, hourlyRate: '' }));
  };

  const handleCustomRateChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomRate(value);
      setHourlyRate('');
      setErrors((prev) => ({ ...prev, hourlyRate: '' }));
    }
  };

  const handleHours = (e) => {
    setHours(e.target.value);
    setErrors((prev) => ({ ...prev, hours: '' }));
  };

  const handleCheckboxChange = (field) => {
    if (field === 'budgetResets') {
      setBudgetResets((prev) => !prev);
    } else if (field === 'emailAlert') {
      setEmailAlert((prev) => !prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRate = customRate || hourlyRate;
    const newErrors = {};

    if (!selected) {
      newErrors.projectType = 'Please select a project type.';
    }
    if (!finalRate) {
      newErrors.hourlyRate = 'Please enter an hourly rate.';
    }
    if (!hours) {
      newErrors.hours = 'Please select hours per person.';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const existingData = JSON.parse(localStorage.getItem('formData')) || {};

    localStorage.setItem('formData', JSON.stringify({
      ...existingData,
      projectType: selected,
      hourlyRate: finalRate,
      hours,
      budgetResets,
      emailAlert,
    }));

    nextStep();
  };


  return (
    <div className="flex flex-col h-full justify-center">
      <h1 className="text-xl font-semibold text-center mb-6">Project type</h1>
      <p className="text-sm text-center text-gray-400 font-semibold mb-6">
        Don't panic - You can also customize this type in settings
      </p>

      <div className="flex justify-between items-center w-full mb-4">
        <button
          className={`py-2 px-4 w-full border rounded-l-lg border-gray-300 text-sm truncate ${selected === 'Time' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => handleSelect('Time')}
        >
          Time & Materials
        </button>

        <button
          className={`py-2 px-4 w-full rounded-sm border border-gray-300 text-sm truncate ${selected === 'Fixed' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => handleSelect('Fixed')}
        >
          Fixed Fee
        </button>

        <button
          className={`py-2 px-4 w-full rounded-r-md border border-gray-300 text-sm truncate ${selected === 'Non-Billable' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => handleSelect('Non-Billable')}
        >
          Non-Billable
        </button>
      </div>

      {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType}</p>}

      <div className="my-4">
        <h1 className="text-lg font-semibold my-1">Hourly</h1>
        <p className="text-sm text-gray-400 font-semibold mb-6">We need hourly rates to track your project's billable amount</p>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="mb-4">
            <select
              id="rate"
              value={hourlyRate}
              onChange={handleRateChange}
              className="w-full p-2 border rounded-md text-gray-500"
            >
              <option value="">Project hourly rate</option>
              <option value="500">₹500/h</option>
              <option value="800">₹800/h</option>
              <option value="1500">₹1500/h</option>
              <option value="2000">₹2000/h</option>
            </select>
            {errors.hourlyRate && <p className="text-red-500 text-sm">{errors.hourlyRate}</p>}
          </div>

          <div className="relative">
            <span className="absolute left-3 p-1 top-1 flex items-center pointer-events-none text-gray-500">₹</span>
            <input
              type="text"
              id="customRate"
              value={customRate}
              onChange={handleCustomRateChange}
              placeholder="Enter custom hourly rate"
              className="w-full p-2 pl-8 border rounded-md"
            />
          </div>
        </form>
      </div>

      <div>
        <h1 className="text-lg font-semibold my-1">Budget</h1>
        <p className="text-sm text-gray-400 font-semibold mb-6">We need hourly rates to track your project's billable amount</p>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="mb-4">
            <select
              id="hours"
              value={hours}
              onChange={handleHours}
              className="w-full p-2 border rounded-md text-gray-500"
            >
              <option value="">Hours per Person</option>
              <option value="5">5 hours</option>
              <option value="8">8 hours</option>
              <option value="12">12 hours</option>
              <option value="16">16 hours</option>
            </select>
            {errors.hours && <p className="text-red-500 text-sm">{errors.hours}</p>}
          </div>
        </form>
      </div>

      <div className="mt-4 text-gray-500">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={budgetResets}
            onChange={() => handleCheckboxChange('budgetResets')}
            className="mr-2"
          />
          Budget resets every month
        </label>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={emailAlert}
            onChange={() => handleCheckboxChange('emailAlert')}
            className="mr-2"
          />
          Send an email if project exceeds 80% of the budget
        </label>
      </div>

      <div className="flex items-center justify-between mt-6 relative">
        <button className="flex items-center text-gray-700 px-4 py-2 rounded" onClick={prevStep}>
          <MdArrowBackIos className="mr-2" /> {/* Margin-right to space the icon from the text */}
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

export default Step2;
