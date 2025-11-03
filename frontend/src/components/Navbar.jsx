export default function Navbar({ name , onSignOut }) {
    return (
      <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-3">  
              <h1 className="text-lg font-semibold tracking-wide">Task Manager</h1>
          </div>
          <div className="flex items-center space-x-4">
              <span className="text-sm">Hi, {name}</span>
              <button
                onClick={onSignOut}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-1 rounded-md transition"
              >
                Sign out
              </button>
          </div>
      </nav>
  )
}
