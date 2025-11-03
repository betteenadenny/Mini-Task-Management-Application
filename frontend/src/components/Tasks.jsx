import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ListTask from "./ListTask";
import CreateTask from "./CreateTask";
import Navbar from "./Navbar";
import SearchTask from "./SearchTask";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks,setFilteredTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const tasksPerPage = 3;
  const navigate = useNavigate();

  const loggedInuser = JSON.parse(localStorage.getItem("loggedInuser") || "{}");

  useEffect(() => {
    if (!loggedInuser || !loggedInuser.token) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${loggedInuser.token}`,
        },
      });
      setTasks(response.data.tasks || []);
      setFilteredTask(response.data.tasks || []);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("loggedInuser");
        navigate("/");
      }
    }
  };

  function removeUser() {
    localStorage.removeItem("loggedInuser");
    navigate('/')
  }

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(` http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${loggedInuser.token}` },
      })
      fetchTasks() 
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message)
    }
  }

  const handleEdit = async (updatedTask, setErrorMessage, closemodal) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${updatedTask.id}`,
        {
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
          deadline: updatedTask.deadline,
        },
        {
          headers: { Authorization: `Bearer ${loggedInuser.token}` },
        }
      )
      fetchTasks();
      closemodal();
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message)
      if (error.response) {
        const data = error.response.data
        if (data.message) {
          setErrorMessage(data.message)
        } else if (data.errors) {
          setErrorMessage(data.errors.join(" "))
        } else {
          setErrorMessage("Something went wrong. Please try again.")
        }
      } else {
        setErrorMessage("Unable to connect to the server.")
      }
    }
  }

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks  = filteredTasks.slice(startIndex,startIndex + tasksPerPage);

  const handleNext = () => {
    if(currentPage < totalPages) setCurrentPage(prev => prev + 1);
  }

  const handlePrev = () => {
    if(currentPage > 1) setCurrentPage(prev => prev - 1);
  }
  return (
    <>
      <Navbar name={loggedInuser.name} onSignOut={() => removeUser()} />
      <div className="p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add Task
          </button>
        </div>

        <SearchTask
          tasks={tasks}
          onSearchResult={results => setFilteredTask(results)}
          onShowAll={() => setFilteredTask(tasks)}
        />

        <ul className="mt-4 space-y-3">
          <ListTask 
            tasks={currentTasks} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </ul>

        {filteredTasks.length > tasksPerPage && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Prev
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {isModalOpen && (
          <CreateTask
            onClose={() => setIsModalOpen(false)}
            onTaskCreated={() => {
              setIsModalOpen(false);
              fetchTasks();
            }}
          />
        )}
      </div>
    </>
  );
}
