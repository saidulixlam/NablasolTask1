import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose, onViewProject }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 transform transition-transform duration-300 scale-105">
        <div className="flex items-center mb-4">
          <FaCheckCircle className="text-green-500 w-10 h-10 animate-bounce" />
          <h2 className="text-xl font-semibold ml-2">Success!</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Your project has been created successfully.
        </p>
        <button
          onClick={onViewProject}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          View Project
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 underline hover:text-gray-700 px-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
