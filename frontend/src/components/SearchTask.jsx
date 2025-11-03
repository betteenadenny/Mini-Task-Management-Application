import { useState, useEffect } from "react";

export default function SearchTask({ tasks, onSearchResult, onShowAll }) {
  const [query, setQuery] = useState("");
  const [status,setStatus] = useState("All");
  const [deadline,setDeadline] = useState('');

  useEffect(() => {
    let filtered = tasks;
    
    if(query.trim()){
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
      )
    }

    if(status !== 'All'){
      filtered = filtered.filter( task => 
        task.status === status
      );
    }

    if(deadline){
      const selectedDate = new Date(deadline);
      filtered = filtered.filter(task => {
        const taskDate = new Date(task.deadline);
        return taskDate <= selectedDate;
      })
    }
    
    onSearchResult(filtered);
},[query,status,deadline,tasks])

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search task..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="border px-3 py-2 rounded w-64"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="All">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Completed</option>
      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border px-3 py-2 rounded"
      />

      <button
        onClick={() => {
          setQuery("");
          setStatus('All');
          setDeadline('');
          onShowAll();
        }}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
}
