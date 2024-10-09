import React, { useState } from 'react';
import { FaUsers, FaLock, FaUserShield } from 'react-icons/fa';
import { MdArrowBackIos } from "react-icons/md";
const StepFour = ({ prevStep, nextStep }) => {
    const [selectedPermission, setSelectedPermission] = useState('');
    const [errors, setErrors] = useState({});

    const handleSelect = (permission) => {
        setSelectedPermission(permission);
        setErrors((prev) => ({ ...prev, permission: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedPermission) {
            setErrors({ permission: 'Please select a permission type.' });
            return;
        }

        const existingData = JSON.parse(localStorage.getItem('formData')) || {};
        localStorage.setItem('formData', JSON.stringify({ ...existingData, permissionType: selectedPermission }));

        nextStep();
    };

    return (
        <div className="flex flex-col h-full justify-center">
            <h1 className="text-xl font-semibold text-center mb-2">Who can manage projects</h1>
            <p className="text-sm text-center text-gray-400 font-semibold mb-6">
                Don't panic - You can also customize these permissions in settings
            </p>

            <div className="flex flex-col items-center gap-2 sm:gap-4 mb-20">
                <div
                    className={`flex items-center w-full border-2 rounded-lg p-4 cursor-pointer ${selectedPermission === 'Everyone' ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleSelect('Everyone')}
                >
                    <FaUsers className="text-3xl text-gray-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Everyone</h2>
                        <p className="text-sm text-gray-500">All users can see it,but guests cannot access the project</p>
                    </div>
                </div>

                <div
                    className={`flex items-center w-full border-2 rounded-lg p-4 cursor-pointer ${selectedPermission === 'Only Admins' ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleSelect('Only Admins')}
                >
                    <FaLock className="text-3xl text-gray-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Only Admin's</h2>
                        <p className="text-sm text-gray-500">Only admins can manage everything.</p>
                    </div>
                </div>

                <div
                    className={`flex items-center w-full border-2 rounded-lg p-4 cursor-pointer ${selectedPermission === 'Only Specific People' ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleSelect('Only Specific People')}
                >
                    <FaUserShield className="text-3xl text-gray-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Only to Specific People</h2>
                        <p className="text-sm text-gray-500">Only specific people can able to see it</p>
                    </div>
                </div>
            </div>

            {errors.permission && <p className="text-red-500 text-sm text-center mt-2">{errors.permission}</p>}

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

export default StepFour;
