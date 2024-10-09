import React, { useState } from 'react';
import { MdArrowBackIos } from "react-icons/md";
const initialDummyMembers = [
  "Bruce Wayne",
  "Clent Cark",
  "Tony Stark",
  "Galadriel",
  "Eren Yeager",
  "Thorfinn",
  "Isagi Yoichi",
];

const StepSix = ({ prevStep, nextStep }) => {
  const [memberInput, setMemberInput] = useState('');
  const [customMembers, setCustomMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set()); 
  const [dummyMembers, setDummyMembers] = useState(initialDummyMembers); 

  const handleAddMember = () => {
    if (memberInput.trim() === '') return;
    setCustomMembers((prevMembers) => [...prevMembers, memberInput]);
    setSelectedMembers((prevSelected) => new Set(prevSelected).add(memberInput));
    setMemberInput(''); 
  };

  const handleSelectMember = (member) => {
    setSelectedMembers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(member)) {
        newSelected.delete(member);
      } else {
        newSelected.add(member); 
      }
      return newSelected;
    });
  };

  const handleDeleteCustomMember = (memberToDelete) => {
    setCustomMembers((prevMembers) => prevMembers.filter((member) => member !== memberToDelete));
    setSelectedMembers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(memberToDelete);
      return newSelected;
    });
  };

  const handleDeletePredefinedMember = (memberToDelete) => {
    setDummyMembers((prevMembers) => prevMembers.filter((member) => member !== memberToDelete));
    setSelectedMembers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(memberToDelete);
      return newSelected;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || {};
    const allSelectedMembers = [...selectedMembers, ...customMembers];
    localStorage.setItem('formData', JSON.stringify({ ...existingData, teamMembers: allSelectedMembers }));
    console.log("Submitted team members:", allSelectedMembers);
    nextStep();
  };

  return (
    <div className="flex flex-col h-full justify-center px-4">
      <h1 className="text-xl font-semibold text-center mb-5">Team</h1>
      <p className="text-sm text-gray-700 font-semibold mb-2">Invite or Add a team member</p>
      <div className="flex mb-4 w-full">
        <input
          type="text"
          value={memberInput}
          onChange={(e) => setMemberInput(e.target.value)}
          placeholder="Add a new team member"
          className="border border-gray-300 rounded-l-md px-4 py-2 w-full"
        />
        <button
          onClick={handleAddMember}
          className="bg-blue-500 text-white rounded-r-md px-4 py-2"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {dummyMembers.map((member) => (
          <div key={member} className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedMembers.has(member)}
                onChange={() => handleSelectMember(member)}
                className="mr-2"
              />
              <span className="text-gray-800">{member}</span>
            </label>
            <button
              onClick={() => handleDeletePredefinedMember(member)}
              className="text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {customMembers.map((member, index) => (
          <div key={index} className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedMembers.has(member)}
                onChange={() => handleSelectMember(member)}
                className="mr-2"
              />
              <span className="text-gray-800">{member}</span>
            </label>
            <button
              onClick={() => handleDeleteCustomMember(member)}
              className="text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 relative">
      <button className="flex items-center text-gray-700 px-4 py-2 rounded" onClick={prevStep}>
            <MdArrowBackIos className="mr-1" />
            Back
          </button>

        <button
          className="absolute text-sm left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-2 rounded"
          type="submit"
          onClick={handleSubmit}
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default StepSix;
