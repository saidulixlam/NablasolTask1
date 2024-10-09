import { useState, useEffect } from 'react';
import { MdArrowBackIos } from "react-icons/md";

const Step1 = ({ nextStep, prevStep }) => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState('');
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    fromDate: '',
    toDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  const handleAddClient = () => {
    if (newClient.trim()) {
      const updatedClients = [...clients, newClient];
      setClients(updatedClients);
      localStorage.setItem('clients', JSON.stringify(updatedClients));

      // Update formData with newly added properties
      setFormData({ ...formData, clientName: newClient });
      localStorage.setItem('formData', JSON.stringify(formData));
      setNewClient('');
      setIsAddingNewClient(false);
    }
  };

  const calculateMinToDate = () => {
    if (formData.fromDate) {
      const fromDate = new Date(formData.fromDate);
      fromDate.setDate(fromDate.getDate() + 1);
      return fromDate.toISOString().split("T")[0];
    }
    return "";
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const newErrors = {};

    if (!formData.projectName) {
      newErrors.projectName = 'Please enter a project name.';
    }
    if (!formData.clientName) {
      newErrors.clientName = 'Please select a client.';
    }
    if (!formData.fromDate) {
      newErrors.fromDate = 'Select a start date.';
    }
    if (!formData.toDate) {
      newErrors.toDate = 'Select an end date.';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    localStorage.setItem('formData', JSON.stringify(formData));

    nextStep();
  };

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  return (
    <div className="flex flex-col h-full justify-center">
      <h1 className="text-xl font-semibold text-center mb-6">Create a Project</h1>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Project Name</label>
          <input
            type="text"
            value={formData.projectName}
            onChange={handleChange('projectName')}
            className={`border-2 rounded-md p-2 w-full ${errors.projectName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter project name"
          />
          {errors.projectName && (
            <span className="text-red-500 mt-1 text-sm" style={{ display: 'block' }}>
              {errors.projectName}
            </span>
          )}
        </div>

        <div className="flex flex-col w-full">
          <label className="block text-gray-700 mb-2 font-semibold">Client</label>

          <div className="flex items-center gap-2 w-full">
            <select
              value={formData.clientName}
              onChange={handleChange('clientName')}
              className={`border-2 rounded-md w-1/2 ${errors.clientName ? 'border-red-500' : 'border-gray-300'} h-10 text-gray-500 focus:outline-none focus:border-blue-600`}
            >
              <option value="" disabled hidden>Select a client</option>
              <option value="Birla">Birla</option>
              {clients.map((client, index) => (
                <option key={index} value={client}>{client}</option>
              ))}
            </select>

            <span className="mx-1">Or</span>

            <button
              type="button"
              onClick={() => setIsAddingNewClient(!isAddingNewClient)}
              className="bg-transparent text-dark border border-gray-300 p-2 lg:p-2 rounded h-10 text-sm md:text-base hover:text-white hover:bg-gray-600 whitespace-nowrap min-w-[132px]"
            >
              {isAddingNewClient ? 'Cancel' : '+ New Client'}
            </button>

          </div>

          {isAddingNewClient && (
            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              placeholder="New Client Name"
              className="border-2 rounded-md p-2 w-full border-gray-300 focus:outline-none focus:border-blue-600 mt-2"
            />
          )}

          {isAddingNewClient && (
            <button
              type="button"
              onClick={handleAddClient}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Client
            </button>
          )}

          {errors.clientName && (
            <span className="text-red-500 mt-1 text-sm" style={{ display: 'block' }}>
              {errors.clientName}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="block text-gray-700 mb-2 font-bold">From Date</label>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={formData.fromDate || '2024-01-01'}
              onChange={handleChange('fromDate')}
              className="border-2 rounded-md p-2 w-1/2 border-gray-300 focus:outline-none focus:border-blue-600"
            />

            <input
              type="date"
              value={formData.toDate || '2024-01-01'}
              onChange={handleChange('toDate')}
              min={calculateMinToDate()}
              className="border-2 rounded-md p-2 w-1/2 border-gray-300 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div className="relative ">
            {errors.fromDate && (
              <span className="absolute left-0 text-red-500 text-sm">
                {errors.fromDate}
              </span>
            )}
            {errors.toDate && (
              <span className="absolute right-0 text-red-500 text-sm">
                {errors.toDate}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Notes</label>
          <textarea
            value={formData.notes}
            onChange={handleChange('notes')}
            className="border-2 rounded-md p-2 w-full border-gray-300 focus:outline-none focus:border-blue-600"
            rows="4"
            placeholder="Enter any additional notes"
          />
        </div>

        <div className="flex items-center justify-between mt-6 relative">
          <button className="flex items-center text-gray-700 px-4 py-2 rounded" onClick={prevStep}>
            <MdArrowBackIos className="mr-2" />
            Back
          </button>

          <button
            type="submit"
            className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
