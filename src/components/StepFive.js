import React, { useState } from 'react';
import { MdArrowBackIos } from "react-icons/md";
const initialDummyTasks = [
    "Website Design",
    "Branding Design",
    "UI/UX",
    "Style Guide",
    "Layout Design",
    "SEO Optimization",
    "Social Media Management",
    "Project Management"
];

const StepFive = ({ prevStep, nextStep }) => {
    const [taskInput, setTaskInput] = useState('');
    const [customTasks, setCustomTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [dummyTasks, setDummyTasks] = useState(initialDummyTasks);

    const handleAddTask = () => {
        if (taskInput.trim() === '') return;
        setCustomTasks((prevTasks) => [...prevTasks, taskInput]);
        setSelectedTasks((prevSelected) => new Set(prevSelected).add(taskInput));
        setTaskInput('');
    };

    const handleSelectTask = (task) => {
        setSelectedTasks((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(task)) {
                newSelected.delete(task);
            } else {
                newSelected.add(task);
            }
            return newSelected;
        });
    };

    const handleDeleteCustomTask = (taskToDelete) => {
        setCustomTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
        setSelectedTasks((prevSelected) => {
            const newSelected = new Set(prevSelected);
            newSelected.delete(taskToDelete);
            return newSelected;
        });
    };

    const handleDeletePredefinedTask = (taskToDelete) => {
        setDummyTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
        setSelectedTasks((prevSelected) => {
            const newSelected = new Set(prevSelected);
            newSelected.delete(taskToDelete);
            return newSelected;
        });
    };

    const handleSubmit = () => {
        const existingData = JSON.parse(localStorage.getItem('formData')) || {};
        const allSelectedTasks = [...selectedTasks, ...customTasks];
        localStorage.setItem('formData', JSON.stringify({ ...existingData, tasks: allSelectedTasks }));
        console.log("Submitted tasks:", allSelectedTasks);
        nextStep();
    };

    return (
        <div className="flex flex-col h-full justify-center px-4">
            <h1 className="text-xl font-semibold text-center mb-2">Tasks</h1>

            <div className="flex mb-4 w-full">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Add a new task"
                    className="border border-gray-300 rounded-l-md px-4 py-2 w-full"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white rounded-r-md px-4 py-2"
                >
                    Add
                </button>
            </div>

            <div className="flex flex-col gap-2 mb-4">
                {dummyTasks.map((task) => (
                    <div key={task} className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedTasks.has(task)}
                                onChange={() => handleSelectTask(task)}
                                className="mr-2"
                            />
                            <span className="text-gray-800">{task}</span>
                        </label>
                        <button
                            onClick={() => handleDeletePredefinedTask(task)}
                            className="text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2 mb-4">
                {customTasks.map((task, index) => (
                    <div key={index} className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedTasks.has(task)}
                                onChange={() => handleSelectTask(task)}
                                className="mr-2"
                            />
                            <span className="text-gray-800">{task}</span>
                        </label>
                        <button
                            onClick={() => handleDeleteCustomTask(task)}
                            className="text-red-500 hover:text-red-700"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

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

export default StepFive;
