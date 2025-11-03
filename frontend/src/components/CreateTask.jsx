import { useState } from "react";
import axios from "axios";

export default function CreateTask({ onClose, onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("pending");
    const [errormessage, setErrorMessage] = useState("");

    const loggedInuser = JSON.parse(localStorage.getItem("loggedInuser") || "{}");

    const handleSubmit = async (e) => {
        e.preventDefault()    
        try {
            const newTask = {
                title: title.trim(), 
                description: description.trim(), 
                deadline, 
                status
            }
            await axios.post("http://localhost:5000/api/tasks",newTask,{
                headers: {
                    Authorization: `Bearer ${loggedInuser.token}`,
                },
            });
            onTaskCreated();
        
        } catch (error) {
        if (error.response) {
            const data = error.response.data;
            if (data.message) {
            setErrorMessage(data.message);
            } else if (data.errors) {
            setErrorMessage(data.errors.join(' '));
            } else {
            setErrorMessage('Something went wrong. Please try again.');
            }
        } else {
            setErrorMessage('Unable to connect to the server.');
        }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
            ✖
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Add New Task</h2>

            {errormessage && (
            <div className="mb-3 text-sm text-green-700 bg-green-100 p-2 rounded">
                {errormessage}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                placeholder="Task title"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full border p-2 rounded"
            />
            <textarea
                placeholder="Task description"
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full border p-2 rounded"
            />
            <input
                type="date"
                required
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className="w-full border p-2 rounded"
            />
            <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
            </select>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
            >
                Add Task
            </button>
            </form>
        </div>
        </div>
    );
}
