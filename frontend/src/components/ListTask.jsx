import React, { useState } from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function ListTask({ tasks, onEdit, onDelete }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = (task, type) => {
    setSelectedTask(task)
    setModalType(type)
  }

  const closeModal = () => {
    setSelectedTask(null)
    setModalType(null)
  }

  const handleConfirm = async () => {
    if (modalType === "delete") {
      onDelete(selectedTask.id)
      closeModal()
    } else if (modalType === "edit") {
      await onEdit(selectedTask, setErrorMessage, closeModal)
    }
  }


  return (
    <>
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="border p-3 rounded shadow-sm bg-white relative">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(task, "edit")}
                    className="text-blue-500 hover:text-blue-600"
                    title="Edit Task"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openModal(task, "delete")}
                    className="text-red-500 hover:text-red-600"
                    title="Delete Task"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mt-1">{task.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span>
                  Status:{" "}
                  <span className="font-medium text-gray-800">{task.status}</span>
                </span>
                <span>
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet.</p>
      )}

      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {modalType === "delete" ? (
              <>
                <h2 className="text-lg font-semibold mb-3 text-center">Delete Task</h2>
                <p className="text-sm text-gray-600 mb-5 text-center">
                  Are you sure you want to delete the task <b>{selectedTask.title}</b>?
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
                  >
                    Yes, Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-3 text-center">Edit Task</h2>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  handleConfirm()
                }}
                  className="space-y-3"
                >
                  {errorMessage && (
                    <p className="text-sm text-red-600 text-center">{errorMessage}</p>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={selectedTask.title}
                      onChange={(e) =>
                        setSelectedTask({ ...selectedTask, title: e.target.value })
                      }
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={selectedTask.description}
                      onChange={(e) =>
                        setSelectedTask({ ...selectedTask, description: e.target.value })
                      }
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={selectedTask.status}
                      onChange={(e) =>
                        setSelectedTask({ ...selectedTask, status: e.target.value })
                      }
                      className="w-full border px-2 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Completed</option>
                    </select>
                  </div>
                  <input
                    type="date"
                    value={
                      selectedTask.deadline
                        ? new Date(selectedTask.deadline).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setSelectedTask({ ...selectedTask, deadline: e.target.value })
                    }
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </>
  )
}
