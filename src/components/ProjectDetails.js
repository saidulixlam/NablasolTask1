import React from 'react';

const ProjectDetails = ({ onBack }) => {
  // Retrieve the latest project data from local storage
  const projectData = JSON.parse(localStorage.getItem('projects')) || [];
  const latestProject = projectData[projectData.length - 1]; // Get the latest project

  // Handle back button click
  const handleBack = () => {
    localStorage.setItem('currentStep', 1); // Reset the current step to 1
    onBack(); // Call the parent function to handle back navigation
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white min-h-screen">
      {latestProject ? (
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
          <h2 className="text-xl text-center bg-violet-300 border p-2 border-violet-700 rounded-md font-semibold mb-3">Project Details</h2>
          <p><strong>Project Name:</strong> {latestProject.projectName}</p>
          <p><strong>Client Name:</strong> {latestProject.clientName}</p>
          <p><strong>From Date:</strong> {latestProject.fromDate}</p>
          <p><strong>To Date:</strong> {latestProject.toDate}</p>
          <p><strong>Notes:</strong> {latestProject.notes}</p>
          <p><strong>Project Type:</strong> {latestProject.projectType}</p>
          <p><strong>Hourly Rate:</strong> ₹{latestProject.hourlyRate}</p>
          <p><strong>Hours:</strong> {latestProject.hours}</p>
          <p><strong>Budget Resets:</strong> {latestProject.budgetResets ? 'Yes' : 'No'}</p>
          <p><strong>Email Alert:</strong> {latestProject.emailAlert ? 'Yes' : 'No'}</p>
          <p><strong>Selected View:</strong> {latestProject.selectedView}</p>
          <p><strong>Permission Type:</strong> {latestProject.permissionType}</p>
          <p><strong>Tasks:</strong></p>
          <ul className="list-disc list-inside mb-3">
            {latestProject.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <p><strong>Team Members:</strong></p>
          <ul className="list-disc list-inside mb-3">
            {latestProject.teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>

          {/* Back button */}
          <button
            onClick={handleBack}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Back
          </button>
        </div>
      ) : (
        <p className="text-gray-700">No project details available.</p>
      )}
    </div>
  );
};

export default ProjectDetails;
